import { checkUserCountry } from "https://wawidgetstorage.blob.core.windows.net/widget-assets/geoLocation.js";
import { isVisibleTime } from "https://wawidgetstorage.blob.core.windows.net/widget-assets/widgetScheduler.js";
import { applyStyles } from "https://wawidgetstorage.blob.core.windows.net/widget-assets/styles.js";
import {
  configureWidget,
  initWidget,
} from "https://wawidgetstorage.blob.core.windows.net/widget-assets/widgetRenderer.js";
import { detectLocale } from "https://wawidgetstorage.blob.core.windows.net/widget-assets/detectLocale.js";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export async function createWhatsappChatWidget(
  options = {
    enabled: false,
    autoShow: true,
    locale: "en",
    businessSettings: {
      translations: {},
      phoneNumber: "33634674038",
      allowedCountries: ["FR", "AZ"],
      timeZone: "Europe/Paris",
      offDayStart: "Fri",
      offTimeStart: "17:00",
      offDayEnd: "Mon",
      offTimeEnd: "09:00",
    },
    displaySettings: {
      backgroundColor: "#25D366",
      showToast: false,
      translations: {},
      showCTA: false,
      verticalMargin: 24,
      horizontalMargin: 24,
      position: "right",
    },
  },
) {
  if (options.enabled === false) return;

  // CHECK COUNTRY RESTRICTIONS
  if (options.businessSettings.allowedCountries) {
    const whitelistCountry = await checkUserCountry(options);
    if (!whitelistCountry) return; // Stop widget execution if not allowed
  }

  // CHECK TIME VISIBILITY:
  if (!isVisibleTime(options.businessSettings)) return;

  // APPLY LOCALE
  options.locale = detectLocale(options);

  // APPLY CSS
  await applyStyles(options);

  let isWidgetInitialized = false;

  const renderWidget = async (isMobile) => {
    if (!isWidgetInitialized) {
      await initWidget(options, window.innerWidth <= 768);
      isWidgetInitialized = true;
    } else {
      options.locale = detectLocale(options);
      configureWidget(options, isMobile);
    }
  };

  // Initial render
  const isMobile = window.innerWidth <= 768;
  await renderWidget(isMobile);

  // RESIZE EVENT LISTENER
  const handleResize = debounce(() => {
    const newIsMobile = window.innerWidth <= 768;
    renderWidget(newIsMobile);
  }, 200);
  window.addEventListener("resize", handleResize);

  // UNIVERSAL LOCALE CHANGE DETECTION
  const handleLocaleChange = () => {
    const newLocale = detectLocale(options);
    if (newLocale !== options.locale) {
      options.locale = newLocale;
      renderWidget(window.innerWidth <= 768);
    }
  };

  // Universal framework detection setup
  const setupUniversalDetection = () => {
    let currentUrl = window.location.href;
    let currentHtmlLang = document.documentElement.lang;

    const checkForChanges = () => {
      const newUrl = window.location.href;
      const newHtmlLang = document.documentElement.lang;

      if (newUrl !== currentUrl || newHtmlLang !== currentHtmlLang) {
        currentUrl = newUrl;
        currentHtmlLang = newHtmlLang;
        handleLocaleChange();
      }
    };

    // 1. Browser navigation events
    window.addEventListener("popstate", checkForChanges);
    window.addEventListener("hashchange", checkForChanges);

    // 2. History API interception (React Router, Vue Router, etc.)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      originalPushState.apply(this, arguments);
      setTimeout(checkForChanges, 0);
    };

    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      setTimeout(checkForChanges, 0);
    };

    // 3. DOM mutations for lang attribute changes
    const langObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "lang" ||
            mutation.attributeName === "data-locale" ||
            mutation.attributeName === "data-language")
        ) {
          setTimeout(checkForChanges, 0);
        }
      });
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "data-locale", "data-language"],
    });

    // 4. Storage events (some frameworks use localStorage/sessionStorage)
    const storageHandler = (e) => {
      if (
        e.key &&
        (e.key.includes("locale") ||
          e.key.includes("language") ||
          e.key.includes("lang") ||
          e.key.includes("i18n"))
      ) {
        setTimeout(checkForChanges, 100);
      }
    };
    window.addEventListener("storage", storageHandler);

    // 5. Intercept common storage methods
    const originalSetItem = localStorage.setItem;
    const originalSessionSetItem = sessionStorage.setItem;

    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (
        key.includes("locale") ||
        key.includes("language") ||
        key.includes("lang") ||
        key.includes("i18n")
      ) {
        setTimeout(checkForChanges, 100);
      }
    };

    sessionStorage.setItem = function (key, value) {
      originalSessionSetItem.apply(this, arguments);
      if (
        key.includes("locale") ||
        key.includes("language") ||
        key.includes("lang") ||
        key.includes("i18n")
      ) {
        setTimeout(checkForChanges, 100);
      }
    };

    // 6. Framework-specific event listeners
    const frameworkEvents = [
      "routeChangeComplete", // Next.js
      "page:change", // Nuxt 2
      "app:mounted", // Nuxt 3
      "route:change", // Generic
      "navigation:end", // Generic
      "localeChange", // Custom
      "i18n:locale-changed", // Common i18n libraries
      "languagechange", // Browser API
    ];

    const frameworkHandlers = [];
    frameworkEvents.forEach((event) => {
      const handler = () => setTimeout(checkForChanges, 100);
      window.addEventListener(event, handler);
      frameworkHandlers.push({ event, handler });
    });

    // 7. Periodic fallback check (lightweight)
    const fallbackInterval = setInterval(checkForChanges, 3000);

    // 8. Custom event for manual triggering
    window.addEventListener("widget:locale-update", checkForChanges);

    // Cleanup function
    return () => {
      window.removeEventListener("popstate", checkForChanges);
      window.removeEventListener("hashchange", checkForChanges);
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener("widget:locale-update", checkForChanges);

      langObserver.disconnect();
      clearInterval(fallbackInterval);

      // Restore original methods
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      localStorage.setItem = originalSetItem;
      sessionStorage.setItem = originalSessionSetItem;

      // Remove framework event listeners
      frameworkHandlers.forEach(({ event, handler }) => {
        window.removeEventListener(event, handler);
      });
    };
  };

  window.addEventListener("resize", handleResize);
  const universalDetection = setupUniversalDetection();

  // Cleanup function
  return () => {
    window.removeEventListener("resize", handleResize);
    universalDetection();
  };
  // LOCALE CHANGE DETECTION
}

// Make the function available globally
window.createWhatsappChatWidget = createWhatsappChatWidget;
