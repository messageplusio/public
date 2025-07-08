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

  // LOCALE CHANGE DETECTION
  const handleLocaleChange = () => {
    const newLocale = detectLocale(options);
    if (newLocale !== options.locale) {
      options.locale = newLocale;
      renderWidget(window.innerWidth <= 768);
    }
  };

  window.addEventListener("popstate", handleLocaleChange);
  window.addEventListener("localeChange", handleLocaleChange);

  return () => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("popstate", handleLocaleChange);
    window.removeEventListener("localeChange", handleLocaleChange);
  };
}

// Make the function available globally
window.createWhatsappChatWidget = createWhatsappChatWidget;
