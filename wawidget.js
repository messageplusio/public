async function getUserCountry() {
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
      if (typeof country === 'string' && /^[A-Z]{2}$/.test(country.trim())) {
        return country.trim();
      }
    } catch (error) {
      console.error(`Failed to fetch from ${api.url}:`, error);
    }
  }

  return null; // Return null if all APIs fail
}

async function CreateWhatsappChatWidget(
  option = {
    brandSetting: {
      autoShow: true,
      backgroundColor: '#0a6114',
      borderRadius: '25',
      brandImg: 'https://messageplus.io/_nuxt/img/m+.a50bf51.jpeg',
      brandImgData: null,
      brandName: 'Message Plus',
      brandSubTitle: '',
      ctaText: 'Cliquez ici',
      welcomeText: 'Hey',
      messageText: 'Hey',
      phoneNumber: '33634674038',
      qrUrl: '',
      showButton: true,
      allowedCountries: ['France'],
      timeZone: 'Europe/Paris',
      offDayStart: 'Fri',
      offTimeStart: '17:00',
      offDayEnd: 'Mon',
      offTimeEnd: '09:00',
    },
    chatButtonSetting: {
      backgroundColor: '#00E785',
      borderRadius: '25',
      ctaText: 'Cliquez ici',
      desktopText: 'Discuter avec nos centres d’admission directement sur WhatsApp en scannant ce QR code :',
      mobileText: 'Discutez avec nos centres d’admissions directement sur WhatsApp en cliquant sur ce bouton :',
      ctaIconMP: true,
      marginLeft: '0',
      marginRight: '20',
      marginBottom: '20',
      marginTop: '20',
      position: 'right',
    },
    enabled: false,
  }
) {
  if (option.enabled == false) {
    return;
  }

function isVisibleTime(brandSetting) {
  const { timeZone = 'Europe/Paris' } = brandSetting;
  const offDayStart = brandSetting.offDayStart;
  const offTimeStart = brandSetting.offTimeStart;
  const offDayEnd = brandSetting.offDayEnd;
  const offTimeEnd = brandSetting.offTimeEnd;

  // Get current date and time in the specified timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const now = new Date();
  const parts = formatter.formatToParts(now);

  const currentDay = parts.find(part => part.type === 'weekday').value;
  const currentHour = parts.find(part => part.type === 'hour').value;
  const currentMinute = parts.find(part => part.type === 'minute').value;

  const currentTime = `${currentHour}:${currentMinute}`;

  // 🛑 Only check offDays if ALL offDay/offTime values exist
  if (offDayStart && offTimeStart && offDayEnd && offTimeEnd) {
    // Turn off during weekends (Sat, Sun)
    if (currentDay === 'Sat' || currentDay === 'Sun') {
      return false;
    }

    // Turn off after offTimeStart on offDayStart
    if (currentDay === offDayStart) {
      const [offHour, offMinute] = offTimeStart.split(':');
      if (parseInt(currentHour) > parseInt(offHour) ||
        (parseInt(currentHour) === parseInt(offHour) && parseInt(currentMinute) >= parseInt(offMinute))) {
        return false;
      }
    }

    // Turn off before offTimeEnd on offDayEnd
    if (currentDay === offDayEnd) {
      const [onHour, onMinute] = offTimeEnd.split(':');
      if (parseInt(currentHour) < parseInt(onHour) ||
        (parseInt(currentHour) === parseInt(onHour) && parseInt(currentMinute) < parseInt(onMinute))) {
        return false;
      }
    }
  }

  // Otherwise, widget is visible
  return true;
}

  // Check if widget should be shown based on day and time
  if (!isVisibleTime(option.brandSetting)) {
    return; // Don't show widget if within off period
  }
  
async function checkUserCountry(option) {
    if (option.brandSetting.allowedCountries) {
      const userCountry = await getUserCountry();
      if (!userCountry) {
        return false; // Stop if all APIs fail
      }
      if (!option.brandSetting.allowedCountries.includes(userCountry)) {
        return false; // Stop if country is not allowed
      }
    }
    return true; // Allowed to continue
  }

  const isAllowed = await checkUserCountry(option);
  if (!isAllowed) return; // Stop widget execution if not allowed

	
  if (!option.chatButtonSetting.position) {
    option.chatButtonSetting.position = 'right';
    option.chatButtonSetting.marginBottom = '20';
    option.chatButtonSetting.marginTop = '20';
    option.chatButtonSetting.marginLeft = '0';
    option.chatButtonSetting.marginRight = '20';
  }
  var css = document.createElement('STYLE');
  var defaultSvg = option.chatButtonSetting.ctaIconMP
    ? `<svg id="wa-widget-svg" width="28" height="26" viewBox="0 0 28 26" fill="none" style="pointer-events: none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_152_73)">
              <path d="M8.12905 20.1329H16.3847L21.3186 25.0623V20.1329H23.4264C25.9412 20.1329 27.9979 18.0762 27.9979 15.5615V9.06899C27.9979 6.55426 25.9412 4.49756 23.4264 4.49756H8.12905C5.61432 4.49756 3.55762 6.55426 3.55762 9.06899V15.5615C3.55762 18.0762 5.61432 20.1329 8.12905 20.1329Z" fill="white"/>
              <path d="M18.6548 23.6548L13.3496 18.3541H5.46081C2.45025 18.3541 0 15.9038 0 12.8933V6.39856C0 3.38799 2.45025 0.937744 5.46081 0.937744H20.7582C23.7688 0.937744 26.219 3.38799 26.219 6.39856V12.8911C26.219 15.9016 23.7688 18.3519 20.7582 18.3519H18.6504V16.5731H20.7582C22.7882 16.5731 24.4402 14.9211 24.4402 12.8911V6.39856C24.4402 4.36854 22.7882 2.71651 20.7582 2.71651H5.46081C3.43079 2.71651 1.77877 4.36854 1.77877 6.39856V12.8911C1.77877 14.9211 3.43079 16.5731 5.46081 16.5731H14.0856L18.6704 21.1534L18.6548 23.6526V23.6548Z" fill="#1D1D1B"/>
          </g>
          <defs>
              <clipPath id="clip0_152_73">
                  <rect width="28" height="24.1245" fill="white" transform="translate(0 0.937744)"/>
              </clipPath>
          </defs>
      </svg>`
    : `<svg id="wa-widget-svg" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none">
          <g clip-path="url(#clip0_1029_374)">
              <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M23.7881 4.06584C21.1709 1.44525 17.69 0.00132957 13.9811 0C6.33875 0 0.118997 6.21909 0.116338 13.8635C0.115008 16.3072 0.75387 18.6925 1.96711 20.7946L0 27.9796L7.34989 26.0517C9.37482 27.1566 11.655 27.7383 13.9752 27.739H13.9811C21.6222 27.739 27.8427 21.5192 27.8453 13.8748C27.8466 10.17 26.406 6.6871 23.7881 4.06651V4.06584ZM13.9811 25.3975H13.9765C11.909 25.3969 9.88075 24.8411 8.1111 23.7914L7.69027 23.5415L3.3286 24.6856L4.49264 20.4329L4.21874 19.9968C3.06533 18.162 2.45572 16.0413 2.45705 13.8642C2.45971 7.51078 7.6291 2.34138 13.9858 2.34138C17.0638 2.34271 19.957 3.54266 22.1328 5.72117C24.3086 7.89902 25.5059 10.7949 25.5046 13.8735C25.5019 20.2275 20.3326 25.3969 13.9811 25.3969V25.3975ZM20.3019 16.7673C19.9556 16.5938 18.2524 15.7561 17.9346 15.6405C17.6169 15.5248 17.3862 15.467 17.1555 15.814C16.9248 16.161 16.2607 16.9415 16.0586 17.1721C15.8565 17.4035 15.6544 17.4321 15.308 17.2585C14.9617 17.085 13.8455 16.7194 12.522 15.5394C11.4922 14.6206 10.7968 13.4866 10.5948 13.1395C10.3926 12.7925 10.5735 12.605 10.7463 12.4329C10.9018 12.2773 11.0926 12.028 11.2661 11.8259C11.4397 11.6238 11.4969 11.4789 11.6125 11.2482C11.7282 11.0168 11.6704 10.8148 11.584 10.6412C11.4975 10.4677 10.8048 8.76253 10.5156 8.06918C10.2344 7.39377 9.94858 7.48551 9.7365 7.47421C9.53439 7.46424 9.30373 7.46225 9.07239 7.46225C8.84104 7.46225 8.46605 7.54867 8.14831 7.89569C7.83056 8.24267 6.93573 9.08097 6.93573 10.7855C6.93573 12.49 8.17693 14.1381 8.35042 14.3694C8.52391 14.6008 10.7935 18.0995 14.2683 19.6006C15.0947 19.9576 15.7402 20.171 16.2434 20.3306C17.0731 20.5945 17.8283 20.5573 18.4252 20.4682C19.0907 20.3685 20.4748 19.6299 20.7633 18.8208C21.0518 18.0117 21.0518 17.3177 20.9654 17.1734C20.879 17.0292 20.6477 16.9421 20.3013 16.7686L20.3019 16.7673Z"
                  fill="white" />
          </g>
          <defs>
              <clipPath id="clip0_1029_374">
                  <rect width="27.8453" height="28" fill="white" />
              </clipPath>
          </defs>
      </svg>`;

  initWidget();
  function initWidget() {
    const isMobile = window.innerWidth <= 768;
    if (option.brandSetting.messageText) {
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '{{page_link}}',
        encodeURIComponent(window.location.href)
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '__page_link__',
        encodeURIComponent(window.location.href)
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '{{page_title}}',
        window.document.title
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '__page_title__',
        window.document.title
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll('\n', '%0A');
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div id="whatsapp-chat-widget">
                <div class="wa-widget-send-button">
                    ${defaultSvg}
                    <svg id="wa-widget-opened-svg" width="23" height="13" viewBox="0 0 23 13" fill="none" style="pointer-events: none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.20001 1.7334L11.6154 11.1488L21.0308 1.7334" stroke="#363636" stroke-width="2" stroke-linecap="square"/>
                    </svg>
                </div>
            </div>`
    );
    document.querySelector('#whatsapp-chat-widget')?.insertAdjacentHTML(
      'beforeend',
      `
           
           <div class='wa-chat-bubble'>
               <div class="wa-chat-bubble-text">
                     ${option.brandSetting.ctaText}
                </div>
            </div>
            `
    );
    document.querySelector('#whatsapp-chat-widget')?.insertAdjacentHTML(
      'beforeend',
      `
 
      <div class='wa-chat-box'>
     
                 <div style="padding: 5px" class='wa-chat-box-content-chat-welcome'>
                  ${!isMobile ? option.chatButtonSetting.desktopText : option.chatButtonSetting.mobileText}
                 </div>
 						<div style="display: flex; justify-content: center;">
            
                 ${!isMobile ? `
    						<img src=${option.brandSetting.qrUrl} width="128" height="128" padding=4px>
</img>` : ''}
		</div>
    ${option.brandSetting.bottomText ? `
    						<div class="wa-chat-box-content-chat-welcome" style="text-align: center; margin-bottom: 10px;">
        ${option.brandSetting.bottomText}
      </div>
      ` : ''}
                            ${(isMobile || option.brandSetting.showButton) ? `

<div style="display: flex; justify-content: center;">
                 <a
                    role="button"
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=${option.brandSetting.phoneNumber.replace(
        /\+/g,
        ''
      )}&text=${option.brandSetting.messageText ? option.brandSetting.messageText : ''
      }"
                    title="WhatsApp" class="wa-chat-box-content-send-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block">
                            <path
                                d="M20.4115 3.48832C18.3715 1.44747 15.6592 0.217606 12.7798 0.0277473C9.90046 -0.162111 7.0502 0.700979 4.75984 2.4563C2.46948 4.21162 0.895133 6.73951 0.329958 9.56926C-0.235217 12.399 0.247308 15.3377 1.68768 17.8382L0 24.0006L6.30648 22.347C8.05076 23.2969 10.0052 23.7946 11.9914 23.7947H11.9964C14.3489 23.7945 16.6486 23.0969 18.6047 21.7899C20.5609 20.483 22.0856 18.6255 22.9862 16.4522C23.8869 14.2788 24.123 11.8873 23.6647 9.57981C23.2064 7.27233 22.0743 5.15252 20.4115 3.48832ZM11.9964 21.7862H11.9926C10.2218 21.7863 8.48364 21.3103 6.96 20.4081L6.5988 20.194L2.856 21.1751L3.85512 17.5271L3.61968 17.1532C2.45438 15.2963 1.93921 13.1048 2.15515 10.9232C2.37109 8.74163 3.3059 6.69365 4.81262 5.10125C6.31934 3.50884 8.31253 2.4623 10.4789 2.12614C12.6452 1.78999 14.8618 2.18328 16.7802 3.2442C18.6987 4.30511 20.2102 5.97349 21.0771 7.98705C21.944 10.0006 22.1172 12.2452 21.5694 14.3679C21.0216 16.4906 19.784 18.3711 18.051 19.7138C16.318 21.0564 14.1879 21.7851 11.9957 21.7852L11.9964 21.7862Z"
                                fill="#E0E0E0" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9.05653 6.84318C8.83645 6.35382 8.60461 6.34398 8.39533 6.33558C8.22397 6.32814 8.02789 6.32862 7.83229 6.32862C7.68338 6.33255 7.5369 6.36725 7.40205 6.43052C7.26719 6.4938 7.14689 6.58429 7.04869 6.6963C6.71644 7.01089 6.45337 7.39126 6.27627 7.81315C6.09917 8.23505 6.01191 8.68921 6.02005 9.1467C6.02005 10.5925 7.07317 11.9895 7.22005 12.1856C7.36693 12.3817 9.25285 15.4431 12.2394 16.6208C14.7215 17.5995 15.2267 17.4049 15.7655 17.3559C16.3043 17.3069 17.5038 16.6453 17.7489 15.9591C17.9939 15.2729 17.9937 14.6849 17.9202 14.5621C17.8468 14.4392 17.6509 14.3662 17.3569 14.2191C17.0629 14.072 15.6186 13.3611 15.3491 13.2632C15.0796 13.1653 14.8837 13.1163 14.6879 13.4105C14.4921 13.7048 13.9293 14.366 13.7577 14.5625C13.5861 14.7591 13.4147 14.7833 13.1209 14.6365C12.2547 14.2911 11.4552 13.7977 10.7581 13.1782C10.1157 12.5845 9.56482 11.8988 9.12349 11.1435C8.95213 10.8497 9.10501 10.6904 9.25261 10.5435C9.38461 10.412 9.54637 10.2005 9.69349 10.0289C9.81408 9.88041 9.91291 9.71548 9.98701 9.5391C10.0261 9.45807 10.0444 9.36855 10.0403 9.27866C10.0361 9.18877 10.0095 9.10134 9.96301 9.0243C9.88885 8.87718 9.31765 7.42422 9.05653 6.84318Z"
                                fill="white" />
                            <path
                                d="M20.314 3.44995C18.2979 1.43114 15.6165 0.214135 12.7696 0.0256927C9.92272 -0.16275 7.10439 0.690221 4.83975 2.42568C2.57511 4.16114 1.01862 6.66071 0.46029 9.45869C-0.0980434 12.2567 0.37986 15.1622 1.80496 17.6339L0.136719 23.7268L6.37072 22.0922C8.09496 23.0312 10.027 23.5232 11.9903 23.5233H11.9954C14.3211 23.5235 16.5946 22.834 18.5285 21.5422C20.4624 20.2503 21.9699 18.414 22.8603 16.2655C23.7506 14.117 23.984 11.7527 23.5307 9.47156C23.0775 7.19043 21.9581 5.09491 20.314 3.44995ZM11.9954 21.5378H11.9927C10.2423 21.5379 8.52396 21.0674 7.01776 20.1755L6.66064 19.9639L2.96032 20.9337L3.94792 17.327L3.71536 16.9574C2.56347 15.1217 2.05427 12.9553 2.2678 10.7987C2.48133 8.64215 3.40549 6.61767 4.89499 5.04356C6.3845 3.46944 8.35488 2.43495 10.4964 2.1027C12.6379 1.77046 14.8291 2.15931 16.7255 3.20812C18.622 4.25693 20.1161 5.90623 20.973 7.89674C21.83 9.88725 22.0011 12.1061 21.4596 14.2045C20.918 16.3029 19.6945 18.1618 17.9813 19.489C16.2682 20.8162 14.1625 21.5365 11.9954 21.5366V21.5378Z"
                                fill="white" />
                        </svg>
			<span class="wa-chat-box-content-send-btn-text">${option.chatButtonSetting.ctaText}</span>
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: auto; display: block;">
                          <path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                  </a>
              </div>` : ''}

                <div class='wa-chat-box-poweredby'>
                    Powered by <a href="https://messageplus.io" class="wa-chat-box-poweredby-link" target="_blank">Message Plus</a>
                </div>
                          

            </div>
            `
    );
    if (option.brandSetting.autoShow) {
      document.querySelector('.wa-chat-box').classList.add('wa-chat-box-visible');
      document.querySelector('#wa-widget-svg').style.display = 'none';
      document.querySelector('#wa-widget-opened-svg').style.display = 'block';
      document.querySelector('.wa-chat-bubble').style.display = 'none';
      document
        .querySelector('.wa-widget-send-button')
        .classList.add('wa-widget-send-button-clicked');
    } else {
      document.querySelector('.wa-chat-box').classList.remove('wa-chat-box-visible');
      document.querySelector('#wa-widget-svg').style.display = 'block';
      document.querySelector('#wa-widget-opened-svg').style.display = 'none';
      document.querySelector('.wa-chat-bubble').style.cssText = '';
    }
    document.querySelector('#whatsapp-chat-widget').addEventListener('click', function (event) {
      console.log('event', event);
      if (
        event.target.classList.contains('wa-widget-send-button') &&
        event.target.classList.contains('wa-widget-send-button-clicked')
      ) {
        document.querySelector('.wa-chat-box').classList.remove('wa-chat-box-visible');
        document.querySelector('#wa-widget-svg').style.display = 'block';
        document.querySelector('#wa-widget-opened-svg').style.display = 'none';
        document.querySelector('.wa-chat-bubble').style.cssText = '';
        document.querySelector('.wa-widget-send-button').className = 'wa-widget-send-button';
      } else if (
        (event.target.classList.contains('wa-widget-send-button') &&
          !event.target.classList.contains('wa-widget-send-button-clicked')) ||
        event.target.classList.contains('wa-chat-bubble-text')
      ) {
        document.querySelector('.wa-chat-box').classList.add('wa-chat-box-visible');
        document.querySelector('#wa-widget-svg').style.display = 'none';
        document.querySelector('#wa-widget-opened-svg').style.display = 'block';
        document.querySelector('.wa-chat-bubble').style.display = 'none';
        document
          .querySelector('.wa-widget-send-button')
          .classList.add('wa-widget-send-button-clicked');
      }
      if (event.target.classList.contains('wa-chat-bubble-close-button')) {
        document.querySelector('.wa-chat-bubble').classList.add('wa-chat-bubble-closed');
      }
    });
    window.onload = function () {
      setTimeout(function () {
        document.querySelector('.wa-chat-box').classList.add('wa-chat-box-transition');
      }, 100);
    };

  }

  var styles = `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400&display=swap');
          @font-face {
            font-family: 'Sofia Pro';
            src: url('https://cdn.jsdelivr.net/gh/messageplusio/public@6c2b38ec34219c20f2ea5d20dda6784e3f896376/fonts/Sofia Pro Semi Bold Az.otf') format('opentype');
            font-weight: 600;
            font-style: normal;
        }
        @font-face {
            font-family: 'Sofia Pro';
            src: url('https://cdn.jsdelivr.net/gh/messageplusio/public@6c2b38ec34219c20f2ea5d20dda6784e3f896376/fonts/Sofia Pro Semi Medium.otf') format('opentype');
            font-weight: 500;
            font-style: normal;
        }
         @font-face {
            font-family: 'Sofia Pro';
            src: url('https://cdn.jsdelivr.net/gh/messageplusio/public@6c2b38ec34219c20f2ea5d20dda6784e3f896376/fonts/Sofia Pro Semi Regular.otf') format('opentype');
            font-weight: 400;
            font-style: normal;
        }
        @font-face {
            font-family: 'Sofia Pro';
            src: url('https://cdn.jsdelivr.net/gh/messageplusio/public@6c2b38ec34219c20f2ea5d20dda6784e3f896376/fonts/Sofia Pro Light.otf') format('opentype');
            font-weight: 300;
            font-style: normal;
        }
          #whatsapp-chat-widget{
              display: ${option.enabled ? 'block' : 'none'}
          }
          .wa-chat-box-content-send-btn-text{
              font-family: 'Sofia Pro', sans-serif !important;
              font-weight: 600;
              font-size: 16px;
              line-height: 20px;
              color: #f7f2ec !important;
          }
          .wa-chat-box-content-send-btn{
              background-color: #25D366 !important;
	      border-radius: 100px;
              text-decoration: none;
              cursor: pointer;
              position: relative;
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 16px 20px;
	      max-width: 256px;

              border-width: initial;b
              border-style: none;
              border-color: initial;
              border-image: initial;
              overflow: hidden;
              opacity: 1 !important;
          }
          .wa-chat-box-content-chat-welcome{        
              font-family: 'Sofia Pro', sans-serif !important;
              font-weight: 400;
              font-size: 16px;
              line-height: 150%;
              color: #000000;
              text-align: center;
              max-width: 480px;
              margin-top: 16px;
              margin-left: 12px;
              margin-right: 12px;
          }
          .wa-chat-box-brand{
              width: 52px;
              height: 52px;
              border: 1px solid #363636;
              box-shadow: 0px 2px 240px rgba(0, 0, 0, 0.04);
              border-radius: 100px;
              background-color: ${option.chatButtonSetting.backgroundColor};
          }
          .wa-chat-box{
              background-color: white;
              z-index: 16000160 !important;
              margin-bottom: 108px;
              margin-bottom: 72px;
              min-width: 320px;
              max-width: 640px;
              position: fixed !important;
              bottom: ${option.chatButtonSetting.marginBottom}px !important;
              ${option.chatButtonSetting.position == 'left'
      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
    };
              border-radius: 32px;
              border: 1px solid ;
              box-shadow: 1px 1px 1px 1px;
              padding: 2px;
              min-height: 240px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 12px;

              pointer-events: none;
              opacity: 0;
              scale: 0;
              transform-origin: ${option.chatButtonSetting.position == 'left' ? 'left' : 'right'
    } bottom;
              
          }
          .wa-chat-box-visible{
              pointer-events: auto;
              opacity: 1;
              scale: 1;
          }
          .wa-chat-box-transition {
              transition: scale 150ms ease-in, opacity 250ms ease-in;
          }
          .wa-widget-send-button {
              margin: 0 0 ${option.chatButtonSetting.marginBottom}px 0 !important;      
              position: fixed !important;
              z-index: 16000160 !important;
              bottom: 0 !important;
              text-align: center !important;
              height: 52px;
              min-width: 52px;
              border: ${option.chatButtonSetting.ctaIconMP ? '1px' : '0'} solid #363636;
              border-radius: 100px;
              visibility: visible;
              transition: none !important;
              background-color: ${option.chatButtonSetting.backgroundColor};
              box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.4);
              ${option.chatButtonSetting.position == 'left'
      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
    };
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          .wa-widget-send-button-clicked {
            border: 1px solid #363636;
          }
          .wa-chat-box-poweredby{
              margin-left: auto;
              margin-right: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 3px;
              font-family: 'Sofia Pro', sans-serif !important;
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              color: #999999;
              margin-bottom: 12px;
          }
          .wa-chat-box-poweredby-link{
          		font-family: 'Sofia Pro', sans-serif !important;
              font-weight: 600;
              color: #666666 !important;
              text-decoration: none !important;
          }
          .wa-chat-box-poweredby-link::hover{
              color: #666666 !important;
              text-decoration: none !important;
          }
  
          .wa-chat-bubble{
              display: ${option.chatButtonSetting.ctaText ? 'flex' : 'none'};
              align-items: center;
              gap: 8px;
              z-index: 16000160 !important;
              position: fixed !important;
              margin-bottom: 63px;
	      min-width:64px;
	      top: ${option.chatButtonSetting.marginTop}px;
              bottom: ${option.chatButtonSetting.marginBottom}px !important;
              ${option.chatButtonSetting.position == 'left'
      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
    };
          }
          .wa-chat-bubble-closed{
            display: none;
          }
          .wa-chat-bubble-close-button{
              height: 20px;
              min-width: 20px;
              background: #000000;
              border-radius: 24px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              order: ${option.chatButtonSetting.position == 'left' ? '0' : '1'};
          }
          .wa-chat-bubble-text{
             font-family: 'Sofia Pro', sans-serif !important;
             background: #f7f2ec;
             border: 1px solid #363636;
             box-shadow: 1px 1px 1px 1px;
             border-radius: 24px;
             padding: 8px 16px;
  
             font-weight: 600;
             font-size: 14px;
             line-height: 150%;
             color: #202020;
             cursor: pointer;
          }
          .wa-chat-box::before {
             content: '';
             position: absolute;
             top: 100%;
             ${option.chatButtonSetting.position == 'left' ? 'left' : 'right'}: 29px;
             width: 0;
             height: 0;
             border-width: 0 0px 30px 30px;
             border-color: transparent transparent transparent transparent;
             border-style: solid;
             transform: rotate(${option.chatButtonSetting.position == 'left' ? '180' : '270'}deg);
             z-index: 1;
          }
          .wa-chat-box::after {
             content: '';
             position: absolute;
             top: 100%;
             ${option.chatButtonSetting.position == 'left' ? 'left' : 'right'}: 27px;
             width: 0;
             height: 0;
             border-width: 0px 0px 34px 34px;
             border-color: transparent transparent transparent transparent;
             border-style: solid;
             border-radius: 2px;
             filter: drop-shadow(${option.chatButtonSetting.position == 'left' ? '-5px -2px 0px' : '-2px 5px 0px'
    } ${option.chatButtonSetting.backgroundColor});
             transform: rotate(${option.chatButtonSetting.position == 'left' ? '180' : '270'}deg);
          }
  
          @media only screen and (max-width: 600px) {
              .wa-chat-box
              {
                  width: auto;
                  position: fixed !important;
                  right: 20px!important;
                  left: 20px!important;
              }
          }
      `;

  var styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.getElementsByTagName('head')[0].appendChild(styleSheet);
}
