export const applyStyles = async (option) => {
    try {
        const cssResponse = await fetch('./styles.css', { cache: 'no-store' });
        const cssText = await cssResponse.text();

        const cssVariables = getCSSVariables(option);

        const styleSheet = document.createElement('style');
        styleSheet.innerText = cssVariables + cssText;
        document.head.appendChild(styleSheet);
    } catch (error) {
        console.error('Error loading CSS:', error);
    }
};

const getCSSVariables = (option) => {
    const backgroundColor = option.displaySettings.backgroundColor || '#25D366'

    return `:root {
        --widget-display: ${option.enabled ? 'block' : 'none'};
        --margin-left: ${option.displaySettings.position === 'left' ? option.displaySettings.horizontalMargin + 'px' : 'auto'};
        --margin-right: ${option.displaySettings.position === 'right' ? option.displaySettings.horizontalMargin + 'px' : 'auto'};
        --margin-bottom: ${option.displaySettings.verticalMargin + 'px'};
        --button-bg-color: ${backgroundColor};
    }`;
};
