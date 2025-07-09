export const detectLocale = (options) => {
  let locale = "en";

  // 3 possible locales
  // I. example.com/ru
  // II. ru.example.com
  // III. example.com?lang=ru
  // IV. fallback to browser

  // I.
  const pathMatch = window.location.pathname.match(/\/([a-z]{2})(\/|$)/);
  if (pathMatch) {
    locale = pathMatch[1];
  }

  // II.
  const subDomainMatch = window.location.hostname.match(/^([a-z]{2})\./);
  if (subDomainMatch) {
    locale = subDomainMatch[1];
  }

  // III.
  const urlParams = new URLSearchParams(window.location.search);
  const langParams = urlParams.get("lang");
  if (langParams) {
    locale = langParams;
  }

  // IV
  if (
    options.displaySettings.translations &&
    !options.displaySettings.translations[locale]
  ) {
    const browserLang = navigator.language.split("-")[0];
    locale = options.displaySettings.translations[browserLang]
      ? browserLang
      : "en";
  }

  return locale;
};
