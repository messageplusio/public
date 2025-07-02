import { checkUserCountry } from 'https://wawidgetstorage.blob.core.windows.net/widget-assets/geoLocation.js';
import { isVisibleTime } from 'https://wawidgetstorage.blob.core.windows.net/widget-assets/widgetScheduler.js';
import { applyStyles } from 'https://wawidgetstorage.blob.core.windows.net/widget-assets/styles.js';
import { initWidget } from 'https://wawidgetstorage.blob.core.windows.net/widget-assets/widgetRenderer.js';
import { detectLocale } from 'https://wawidgetstorage.blob.core.windows.net/widget-assets/detectLocale.js';

export async function createWhatsappChatWidget(
  options = {
    enabled: false,
    autoShow: true,
    locale: 'en',
    businessSettings: {
      translations: {},
      phoneNumber: '33634674038',
      allowedCountries: ['FR', 'AZ'],
      timeZone: 'Europe/Paris',
      offDayStart: 'Fri',
      offTimeStart: '17:00',
      offDayEnd: 'Mon',
      offTimeEnd: '09:00',
    },
    displaySettings: {
      backgroundColor: '#25D366',
      showToast: false,
      translations: {},
      showCTA: false,
      verticalMargin: 24,
      horizontalMargin: 24,
      position: 'right'
    }
  }
) {
  if (options.enabled === false) return

  // CHECK COUNTRY RESTRICTIONS
  if (options.businessSettings.allowedCountries) {
    const whitelistCountry = await checkUserCountry(options);
    if (!whitelistCountry) return; // Stop widget execution if not allowed
  }

  // CHECK TIME VISIBILITY:
  // check if widget should be shown based on day and time
  // don't show widget if within off period
  if (!isVisibleTime(options.businessSettings)) return;

  // APPLY LOCALE
  const detectedLocale = detectLocale(options)
  options.locale = detectedLocale

  // APPLY CSS
  await applyStyles(options)

  // INITIALIZE
  await initWidget(options, window.innerWidth <= 768)
}

// Make the function available globally
window.createWhatsappChatWidget = createWhatsappChatWidget;
