const isValidCountry = (country) => {
  const isString = typeof country === 'string' || country instanceof String

  if (isString) {
    const regex = /^[A-Z]{2}$/
    const trimmedCountry = country.trim()
    return regex.test(trimmedCountry)
  }
}
const getUserCountry = async () => {
  // store country in local storage to ignore subsequent requests
  const cachedCountry = localStorage.getItem("userCountry")
  if (cachedCountry && isValidCountry(cachedCountry)) {
    return cachedCountry
  }

  // todo: remove hardcoded api keys?
  const apis = [
    {
      url: 'https://ipinfo.io/json',
      extractCountry: (data) => data.country, // ISO country code
    },
    {
      url: 'https://api.db-ip.com/v2/free/self',
      extractCountry: (data) => data.countryCode, // ISO country code
    },
    {
      url: 'https://api.ipdata.co?api-key=235b98e4c31bbb72145e1d6494d27ae0bedfc9f4a21725faddc3473f',
      extractCountry: (data) => data.country_code, // ISO country code
    },
    {
      url: 'https://ipapi.co/json/',
      extractCountry: (data) => data.country, // ISO country code
    },
    {
      url: 'https://ipwho.is/',
      extractCountry: (data) => data.country_code, // ISO country code
    },
    {
      url: 'http://ip-api.com/json/',
      extractCountry: (data) => data.countryCode, // ISO country code
    },
    {
      url: 'https://api.ipgeolocation.io/ipgeo?apiKey=f9cac5dc8dbd49f4ab71e5b6dd44a0c5',
      extractCountry: (data) => data.country_code2, // ISO country code
    }
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api.url);
      if (!response.ok) continue; // Skip to the next API if the request fails
      const data = await response.json();
      const country = api.extractCountry(data);
      if (isValidCountry(country)) {
        localStorage.setItem('userCountry', country.trim())
        return country.trim()
      }
    } catch (error) {
      console.error(`Failed to fetch from ${api.url}:`, error);
    }
  }

  return null; // Return null if all APIs fail
}
export const checkUserCountry = async (option) => {
  const userCountry = await getUserCountry();
  if (!userCountry) return false;

  const lowerUserCountry = userCountry.toLowerCase();
  const lowerAllowedCountries = option.businessSettings.allowedCountries.map(country => country.toLowerCase());

  return lowerAllowedCountries.includes(lowerUserCountry);
}