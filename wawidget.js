import { checkUserCountry } from 'https://cdn.jsdelivr.net/gh/messageplusio/public/geoLocation.js';
import { isVisibleTime } from 'https://cdn.jsdelivr.net/gh/messageplusio/public/widgetScheduler.js';
import { applyStyles } from 'https://cdn.jsdelivr.net/gh/messageplusio/public/styles.js';
import { initWidget } from 'https://cdn.jsdelivr.net/gh/messageplusio/public/widgetRenderer.js';

export async function createWhatsappChatWidget(
  options = {
    enabled: false,
    autoShow: true,
    businessSettings: {
      messageText: 'Hey',
      phoneNumber: '33634674038',
      allowedCountries: ['FR', 'AZ'],
      timeZone: 'Europe/Paris',
      offDayStart: 'Fri',
      offTimeStart: '17:00',
      offDayEnd: 'Mon',
      offTimeEnd: '09:00',
      qrURL: 'https://cdn.jsdelivr.net/gh/messageplusio/public/Ben%20Personal.png'
    },
    displaySettings: {
      backgroundColor: '#25D366',
      showToast: false,
      toastTitle: 'Click and chat with us now!',
      title: 'Book our Whatsapp Demo now!',
      desktopSubtitle: 'Chat with us directly on WhatsApp by Scanning the QR code',
      mobileSubtitle: 'Chat with us directly on WhatsApp by Scanning the QR code',
      ctaTitle: 'Start messaging!',
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

  // APPLY CSS
  await applyStyles(options)

  // INITIALIZE
  await initWidget(options, window.innerWidth <= 768)
}


// Make the function available globally
window.createWhatsappChatWidget = createWhatsappChatWidget;