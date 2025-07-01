export const initWidget = async (options, isMobile) => {
  // message text replace alls
  processMessageText(options)

  const htmlResponse = await fetch('https://cdn.jsdelivr.net/gh/messageplusio/public/widget.html', { cache: 'no-store' });
  const htmlText = await htmlResponse.text();

  document.body.insertAdjacentHTML('beforeend', htmlText);
  configureWidget(options, isMobile);
  addEventListeners();
}

const processMessageText = (options) => {
  if (options.businessSettings.messageText) {
    options.businessSettings.messageText = options.businessSettings.messageText
      .replaceAll('{{page_link}}', encodeURIComponent(window.location.href))
      .replaceAll('__page_link__', encodeURIComponent(window.location.href))
      .replaceAll('{{page_title}}', window.document.title)
      .replaceAll('__page_title__', window.document.title)
      .replaceAll('\n', '%0A');
  }
};

const configureWidget = (options, isMobile) => {
  if (options.autoShow) {
    toggleChatBox(true);
  }

  setWidgetTexts(options, isMobile)
  setQRCode(options, isMobile)
};

const setWidgetTexts = (options, isMobile) => {
  const toastElement = document.getElementById('wa-widget-toast');
  const toastTextElement = document.getElementById('wa-widget-toast-title')
  const titleElement = document.getElementById("widget-title");
  const subtitleElement = document.getElementById("widget-subtitle");
  const buttonElement = document.getElementById("widget-cta-title");
  const buttonTextElement = document.getElementById("widget-cta-text");

  if (toastElement && toastTextElement) {
    if (!options.displaySettings.showToast) {
      toastElement.remove()
      return
    }

    toastTextElement.textContent = options.displaySettings.translations[options.locale].toastTitle
  }

  if (titleElement) titleElement.textContent = options.displaySettings.translations[options.locale].title
  if (subtitleElement) subtitleElement.textContent = isMobile ? options.displaySettings.translations[options.locale].mobileSubtitle : options.displaySettings.translations[options.locale].desktopSubtitle

  if (buttonElement && buttonTextElement) {
    if (options.displaySettings.showCTA === false && !isMobile) {
      buttonElement.remove()
      return
    }

    const phoneNumber = options.businessSettings.phoneNumber.replace(/\+/g, '');
    const messageText = options.businessSettings.translations[options.locale].message || '';
    buttonElement.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${messageText}`;
    buttonTextElement.textContent = options.displaySettings.translations[options.locale].ctaTitle
  }
}

const setQRCode = (options, isMobile) => {
  const qrCodeDiv = document.getElementById('wa-qr-code')
  const qrCodeImg = document.getElementById('wa-qr-code-img')

  if (options.businessSettings.translations[options.locale].qrURL && !isMobile) {
    if (qrCodeDiv && qrCodeImg) {
      qrCodeImg.src = options.businessSettings.translations[options.locale].qrURL;
    }
  } else {
    if (qrCodeDiv) {
      qrCodeDiv.remove()
    }
  }
}

const toggleChatBox = (autoOpen) => {
  const elements = {
    toast: document.getElementById('wa-widget-toast'),
    chatBox: document.getElementById('wa-chat-box'),
    openedSvg: document.querySelector('#wa-widget-opened-svg'),
    bubble: document.querySelector('.wa-chat-bubble'),
    sendButton: document.querySelector('.wa-widget-send-button')
  };

  if (!elements.chatBox) return;

  const isVisible = elements.chatBox.classList.contains('wa-chat-box-visible');
  const shouldOpen = autoOpen || !isVisible;

  elements.toast.classList.toggle('wa-widget-toast-hidden', shouldOpen)
  elements.chatBox.classList.toggle('wa-chat-box-visible', shouldOpen);
  elements.openedSvg.style.display = shouldOpen ? 'block' : 'none';
  elements.bubble.style.cssText = shouldOpen ? 'display: none;' : '';
  elements.sendButton.className = `wa-widget-send-button${shouldOpen ? ' wa-widget-send-button-clicked' : ''}`;
};

const addEventListeners = () => {
  const widget = document.getElementById('whatsapp-chat-widget');
  if (!widget) return;

  widget.addEventListener('click', function(event) {
    if (event.target.closest('.wa-widget-send-button')) {
      toggleChatBox();
    }
  });
};
