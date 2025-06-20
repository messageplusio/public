export const initWidget = async (options, isMobile) => {
    // message text replace alls
    processMessageText(options)

    const htmlResponse = await fetch('./widget.html', { cache: 'no-store' });
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
};

const setWidgetTexts = (options, isMobile) => {
    const titleElement = document.getElementById("widget-title");
    const subtitleElement = document.getElementById("widget-subtitle");
    const buttonElement = document.getElementById("widget-cta-title");
    const buttonTextElement = document.getElementById("widget-cta-text");

    if (titleElement) titleElement.textContent = options.displaySettings.title;
    if (subtitleElement) subtitleElement.textContent = isMobile ? options.displaySettings.mobileSubtitle : options.displaySettings.desktopSubtitle;

    if (buttonElement && buttonTextElement) {
        const phoneNumber = options.businessSettings.phoneNumber.replace(/\+/g, '');
        const messageText = options.businessSettings.messageText || '';
        buttonElement.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${messageText}`;
        buttonTextElement.textContent = options.displaySettings.ctaTitle;
    }
}

const toggleChatBox = (autoOpen) => {
    const elements = {
        chatBox: document.getElementById('wa-chat-box'),
        mpSvg: document.querySelector('#wa-widget-mp-svg'),
        openedSvg: document.querySelector('#wa-widget-opened-svg'),
        bubble: document.querySelector('.wa-chat-bubble'),
        sendButton: document.querySelector('.wa-widget-send-button')
    };

    if (!elements.chatBox) return;

    const isVisible = elements.chatBox.classList.contains('wa-chat-box-visible');
    const shouldOpen = autoOpen || !isVisible;

    elements.chatBox.classList.toggle('wa-chat-box-visible', shouldOpen);
    elements.mpSvg.style.display = shouldOpen ? 'none' : 'block';
    elements.openedSvg.style.display = shouldOpen ? 'block' : 'none';
    elements.bubble.style.cssText = shouldOpen ? 'display: none;' : '';
    elements.sendButton.className = `wa-widget-send-button${shouldOpen ? ' wa-widget-send-button-clicked' : ''}`;
};

const addEventListeners = () => {
    const widget = document.getElementById('whatsapp-chat-widget');
    if (!widget) return;

    widget.addEventListener('click', function (event) {
       if (event.target.closest('.wa-widget-send-button')) {
           toggleChatBox();
       }
    });
};
