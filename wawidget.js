window.widget = {
    init: _mp_createWidget,
};

function removeWidgetIfAny(_mp_options) {
    if (!!document.getElementById(`_mp_${_mp_options._mp_randomID}_modal`)) {
        document.getElementById(`_mp_${n._mp_randomID}_modal`).remove();
    }
    if (!!document.getElementById(`${_mp_options._mp_randomID}_modal`)) {
        document.getElementById(`${_mp_options._mp_randomID}_modal`).remove();
    }
    if (!!document.querySelector(`._mp_widget_div`)) {
        document.querySelector(`._mp_widget_div`).remove();
    }
    if (!!document.querySelector(`.greetingModal`)) {
        document.querySelector(`.greetingModal`).remove();
    }
}

function _mp_createWidget(_mp_options) {
    removeWidgetIfAny(_mp_options);
    _mp_missingElements(_mp_options);
    if (screen.width <= 820) {
        _mp_getMobileView(_mp_options);
    }

    var _mp_styles = document.createElement("style");
    _mp_styles.innerText = `
  ._mp_channel_btn {
    cursor: pointer;
    margin-right: 4px !important;
    color: ${_mp_options._mp_greeting_message_color};
    z-index: 999999;
  }
  #_mp_greeting_message_box_info p {
    color: ${_mp_options._mp_greeting_message_color}
  } 
  ._mp_channel_btn:hover {
    animation: shake 0.3s;
    animation-iteration-count: 1;
  }
  ._mp_hide_btn {
    display:none;
  }
  @keyframes shake {
    0% {transform: rotate(-15deg);}
    25% {transform: rotate(30deg);}
    50% {transform: rotate(-30deg);}
    75% {transform: rotate(15deg);}
    100% {transform: rotate(0deg);}
  }
  ._mp_whatsappDialogWrapper {
    align-items: center !important;
    background-color: rgb(0 0 0 / 50%) !important;
    bottom: 0 !important;
    display: flex !important;
    height: 100% !important;
    justify-content: center !important;
    left: 0 !important;
    position: fixed !important;
    right: 0 !important;
    top: 0 !important;
    width: 100% !important;
    z-index: 10002 !important;
  }
  ._mp_whatsappDialogContent {
    align-items: center !important;
    background: #ffffff;
    box-sizing: content-box !important;
    display: flex !important;
    flex-direction: column !important;
    height: 400px !important;
    justify-content: space-evenly !important;
    padding: 32px !important;
    width: 400px !important;
  }
  ._mp_whatsappDialogContent > span {
    margin-bottom: 24px !important;
    font-family: Mulish, sans-serif !important;
    color: #000000 !important;
    font-size: 18px !important;
    line-height: 1.2 !important;
    text-align: center !important;
  }

  ._mp_whatsappQR > img {
    height: 200px !important;
    width: 200px !important;
  }

  ._mp_whatsappDialogButton { 
    align-items: center !important;
    background: #4caf50 !important;
    border-radius: 30px !important;
    box-sizing: content-box !important;
    color: #ffffff !important;
    display: flex !important;
    height: 32px !important;
    margin-top: 32px !important;
    padding: 5px 16px !important;
    text-decoration: none !important;
    width: 180px !important;
  }
  ._mp_whatsappDialogButtonText {
    padding: 0px 10px;
    font-family: Mulish, sans-serif !important;
  }
  `;
    document.head.appendChild(_mp_styles);

    var _mp_font = document.createElement("link");
    _mp_font.setAttribute(
        "href",
        "https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&display=swap"
    );

    _mp_options._mp_modal_open = false;

    switch (_mp_options._mp_display_btn) {
        case "mobile":
            var _mp_maxWidth = 1000;
            var _mp_minWidth = 0;
            break;
        case "desktop":
            var _mp_maxWidth = Infinity;
            var _mp_minWidth = 1000;
            break;
        case "everywhere":
            var _mp_maxWidth = Infinity;
            var _mp_minWidth = 0;
            break;
        default:
            var _mp_maxWidth = 1000;
            break;
    }

    if (screen.width <= _mp_maxWidth && screen.width >= _mp_minWidth) {
        _mp_getButtonSize(_mp_options);
        _mp_getButtonSizeMobile(_mp_options);

        const order = _mp_options._mp_order.split(",");

        if (order.length > 1) {
            window.orderMulti = true;
        } else {
            window.orderMulti = false;
        }


        if (window.innerWidth <= 820) {

            var d = document.createElement("div");
            d.id = `_mp_${_mp_options._mp_randomID}_modal`; // replace with id var
            d.style = `${_mp_zero_v_placement}: 4vw; ${_mp_options._mp_pos_val}: 5vw; opacity: 1; transition: opacity 0.5s ease 0s; box-sizing: border-box; direction: ltr; position: fixed !important; z-index: 16000160 !important; width: ${_mp_mobile_btn_viewport};`;
            d.classList = "_mp_widget_div";

        } else {


            var d = document.createElement("div");
            d.id = `_mp_${_mp_options._mp_randomID}_modal`; // replace with id var
            d.style = `${_mp_zero_v_placement}: ${_mp_options._mp_v_pos}; ${_mp_options._mp_pos_val}: ${_mp_options._mp_h_pos}; opacity: 1; transition: opacity 0.5s ease 0s; box-sizing: border-box; direction: ltr; position: fixed !important; z-index: 16000160 !important; width: ${_mp_widgetSize};`;
            d.classList = "_mp_widget_div";

        }

        if (order.length > 1) {
            // div element
            var openList = false;

            if (window.innerWidth <= 820) {
                var i = _mp_widgetSvg(_mp_mobile_btn_svg, _mp_options);
                i.style =
                    "display: block; margin-left: auto; margin-right: auto; cursor: pointer";
                // compiled button
                var buttonDiv = document.createElement("div");
                buttonDiv.id = "_mp_btnDiv";
                buttonDiv.style =
                    "display:flex; align-items: center; width:" +
                    + _mp_mobile_btn_viewport
                "; height:" +
                    _mp_mobile_btn_viewport +
                    "; background-color:" +
                    n._mp_btn_color +
                    "; border-radius: 50%; position: relative !important;";
                buttonDiv.appendChild(i);

            } else {

                var i = _mp_widgetSvg(_mp_widgetSvgSize, _mp_options);
                i.style =
                    "display: block; margin-left: auto; margin-right: auto; cursor: pointer";
                // compiled button
                var buttonDiv = document.createElement("div");
                buttonDiv.id = "_mp_btnDiv";
                buttonDiv.style =
                    "display:flex; align-items: center; width:" +
                    _mp_widgetSize +
                    "; height:" +
                    _mp_widgetSize +
                    "; background-color:" +
                    n._mp_btn_color +
                    "; border-radius: 50%; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; position: relative !important;";
                buttonDiv.appendChild(i);

            }

            // button functionality
            if (screen.width <= 820) {
                d.addEventListener("touchstart", (e) => {
                    if (_mp_options._mp_modal_open == false) {
                        _mp_expandButton(d, order, buttonDiv, _mp_options);
                        document.querySelector("._mp_close").style = "display:none";
                        document.querySelector("._mp_open").style = "display:block";
                        _mp_options._mp_modal_open = true;
                    } else if (_mp_options._mp_modal_open == true) {
                        if (_mp_options._mp_greeting == "yes") {
                            _mp_collapseButton(d, _mp_options, buttonDiv);
                        } else {
                            _mp_widget_close_button_list(d);
                        }
                        document.querySelector("._mp_close").style = "display:none";
                        document.querySelector("._mp_open").style = "display:block";
                        _mp_options._mp_modal_open = false;
                    }
                });
            } else {
                d.addEventListener("mouseenter", (e) => {
                    e.stopPropagation();
                    if (_mp_options._mp_modal_open == false) {
                        _mp_expandButton(d, order, buttonDiv, _mp_options);
                        if (!!document.querySelector("._mp_whatsappDialogWrapper")) {
                            document.querySelector("._mp_whatsappDialogWrapper").remove();
                        }
                        document.querySelector("._mp_close").style = "display:block";
                        document.querySelector("._mp_open").style = "display:none";
                        _mp_options._mp_modal_open = true;
                    }
                    d.addEventListener("click", (e) => {
                        e.stopPropagation();
                        if (_mp_options._mp_modal_open == true) {
                            if (_mp_options._mp_greeting == "yes") {
                                _mp_collapseButton(d, _mp_options, buttonDiv);
                            } else {
                                _mp_widget_close_button_list(d);
                            }

                            document.querySelector("._mp_close").style = "display:none";
                            document.querySelector("._mp_open").style = "display:block";
                            openList = false;
                            _mp_options._mp_modal_open = false;
                        }
                        d.addEventListener("click", (e) => {
                            e.stopPropagation();
                            if (_mp_options._mp_modal_open == false) {
                                _mp_expandButton(d, order, buttonDiv, _mp_options);
                                document.querySelector("._mp_close").style = "display:block";
                                document.querySelector("._mp_open").style = "display:none";
                                _mp_options._mp_modal_open = true;
                            }
                        });
                    });
                });
            }
            d.appendChild(buttonDiv);
            if (_mp_options._mp_greeting == "yes" && screen.width > 820) {
                greetingTimeout = setTimeout(
                    _mp_createGreetingModal(_mp_options, buttonDiv),
                    5000
                );
                _mp_options._mp_modal_open = true;
            }
        } else {
            var openList = false;
            if (window.innerWidth <= 820) {
                var buttonDiv = document.createElement("div");
                buttonDiv.id = "_mp_btnDiv";
                buttonDiv.style =
                    "display:flex; align-items: center; width:" +
                    _mp_mobile_btn_viewport +
                    "; height:" +
                    _mp_mobile_btn_viewport +
                    "; border-radius: 50%; position: relative !important;";
                d.appendChild(buttonDiv);
            } else {
                var buttonDiv = document.createElement("div");
                buttonDiv.id = "_mp_btnDiv";
                buttonDiv.style =
                    "display:flex; align-items: center; width:" +
                    _mp_widgetSize +
                    "; height:" +
                    _mp_widgetSize +
                    "; border-radius: 50%; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; position: relative !important;";
                d.appendChild(buttonDiv);

            }
            if (_mp_options._mp_greeting == "yes" && screen.width > 820) {
                greetingTimeout = setTimeout(
                    _mp_createGreetingModal(_mp_options, buttonDiv),
                    5000
                );
                _mp_options._mp_modal_open = true;
            }
            if (_mp_options._mp_greeting == "yes") {
                _mp_createButtons(buttonDiv, order, _mp_options);
            } else {
                _mp_createButtons(buttonDiv, order, _mp_options);
            }
            d.addEventListener("mouseenter", (e) => {
                e.stopPropagation();
                if (!!document.querySelector("._mp_whatsappDialogWrapper")) {
                    document.querySelector("._mp_whatsappDialogWrapper").remove();
                }
                if (_mp_options._mp_modal_open == false) {
                    _mp_expandButton(d, order, buttonDiv, _mp_options);
                    // document.querySelector(".close").style = "display:block";
                    // document.querySelector(".open").style = "display:none";
                    openList = true;
                    _mp_options._mp_modal_open = false;
                }
            });
            d.addEventListener("click", () => {
                _mp_collapseButton(d, _mp_options, buttonDiv);
                _mp_options._mp_modal_open = false;
            });
        }

        window.addEventListener("scroll", (e) => {
            e.stopPropagation();
            if (_mp_options._mp_modal_open == true) {
                if (_mp_options._mp_greeting == "yes") {
                    _mp_collapseButton(d, _mp_options, buttonDiv);
                } else {
                    _mp_widget_close_button_list(d);
                }

                document.querySelector("._mp_close").style = "display:none";
                document.querySelector("._mp_open").style = "display:block";
                openList = false;
                _mp_options._mp_modal_open = false;
            }
        });

        d.appendChild(_mp_font);
        document.body.appendChild(d);
    }
}

function _mp_expandButton(d, order, buttonDiv, options) {
    if (options._mp_greeting == "yes") {
        if (!!!document.getElementById(`${options._mp_randomID}_modal`)) {
            _mp_createGreetingModal(options, d);
        }
        // document.querySelector("._mp_whatsappDialogWrapper").remove();
    } else {
        if (order.length > 1) {
            var buttonList = document.createElement("div");
            buttonList.style = "display: flex; flex-direction:column;";
            buttonList.classList = "_mp_buttonList";
            _mp_createButtons(buttonList, order, options);
            d.insertBefore(buttonList, buttonDiv);
        }
    }
}

// collapses the button list
function _mp_collapseButton(d, options, buttonDiv) {
    if (!!document.getElementById(`${options._mp_randomID}_modal`)) {
        _mp_click_outside(options);
        !!document.getElementById(`${options._mp_randomID}_modal`)
            ? _mp_click_outside(options)
            : null;
    } else {
        if (options._mp_order.split(",").length > 1) {
            _mp_widget_close_button(d);
        }
        _mp_click_outside(options);
        !!document.getElementById(`${options._mp_randomID}_modal`)
            ? _mp_click_outside(options)
            : null;
    }
    !!document.querySelector("._mp_close")
        ? (document.querySelector("._mp_close").style = "display:none")
        : null;
    !!document.querySelector("._mp_open")
        ? (document.querySelector("._mp_open").style = "display:block")
        : null;
    options._mp_modal_open = false;
}

// checks which buttons exist in list and creates as per order
function _mp_createButtons(bl, order, options) {
    order.forEach(() => _mp_whatsappButton(bl, options))
}

function _mp_createGreetingModal(options, d) {
    var closeBtnDiv = document.createElement("div");
    var closeBtn = document.createElement("div");
    var testDiv = document.createElement("div");
    closeBtnDiv.style =
        "width: auto; margin-top: 10px; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; background: #fff;";
    closeBtn.style = "";
    closeBtn.innerHTML =
        "<p class='closeBtnX' style='font-family: Sans-Serif; cursor: pointer; font-size: 11px; padding-top: 0.5px; padding-bottom: 0.5px; padding-left: 3px; padding-right: 3px; margin-bottom: 0px;'>X</p>";
    testDiv.style =
        "display:flex; justify-content:flex-end; height:10px; align-items:center; margin-bottom:10px; background-color:#fff;";

    var _mp_greeting_message_box = document.createElement("div");
    _mp_greeting_message_box.id = "_mp_greeting_message_box";
    var _mp_greeting_message_box_info = document.createElement("div");
    _mp_greeting_message_box_info.id = "_mp_greeting_message_box_info";
    var _mp_greeting_message_modal = _mp_greetingMessageModal(options);
    _mp_greeting_message_modal.style = "display: flex";
    _mp_greeting_message_box.id = `${options._mp_randomID}_modal`;
    _mp_greeting_message_box.classList.add("greetingModal");
    document.getElementsByClassName("greetingModal").style =
        "width: 250px !important; height:122px;";
    if (options._mp_company_logo && options._mp_greeting_message == undefined) {
        var _mp_logo = document.createElement("img");
        _mp_logo.setAttribute("src", options._mp_company_logo);
        _mp_logo.style =
            "width: 48px; height: 48px; max-width:48px; margin-right: 10px; border-radius: 6px;";
        _mp_greeting_message_box.style = `position: absolute; bottom: ${options._mp_horizontal_position};
      ${options._mp_pos_val} 
      : ${options._mp_vertical_position}; margin:5px; background:#fff; opacity:100%; z-index:9999; padding: 10px; border: 1px solid #d4d4d4; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; overflow: hidden; border-radius: 7px;width:auto !important`;
        _mp_greeting_message_box_info.style =
            "height: auto; bottom:50%; right: 100%; padding: 5px;";
        _mp_greeting_message_box_info.innerHTML =
            "<p style='text-decoration:none; font-size:14px !important; font-family: Mulish, sans-serif !important; width: 100%; min-width:150px; border: 1px #d4d4d4 solid; display: inline-block; text-align: left; margin-bottom: 1rem; border-radius: 6px; padding: 10px; overflow-wrap: normal; text-overflow: ellipsis;'>Your Greeting Message Goes Here!</p>";
        _mp_greeting_message_box_info.style =
            "font-family: Mulish, sans-serif !important;";
        _mp_greeting_message_modal.appendChild(_mp_logo);
        if (options._mp_order.split(",").length > 1) {
            var channelList = createGreetingMessageChannels(options);
            channelList.style = "display: flex; width: auto;";
            _mp_greeting_message_box_info.appendChild(channelList);
        }
        // new stuff
        testDiv.appendChild(closeBtn);
        closeBtnDiv.appendChild(testDiv);
        closeBtnDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            _mp_close_modal(closeBtnDiv, options);
            options._mp_modal_open = false;
        });
        _mp_greeting_message_box.addEventListener("click", (e) => {
            if (
                options._mp_order == "whatsapp" &&
                e.path[0].classList.value !== "closeBtnX"
            ) {
                document.getElementById("_mp_whatsappBtn").click();
            }
        });
        _mp_greeting_message_box.appendChild(testDiv);
        _mp_greeting_message_modal.appendChild(_mp_greeting_message_box_info);
        _mp_greeting_message_box.appendChild(_mp_greeting_message_modal);
        d.appendChild(_mp_greeting_message_box);
    } else if (
        options._mp_greeting_message &&
        options._mp_company_logo == undefined
    ) {
        _mp_greeting_message_box.style = `position: absolute; bottom:${options._mp_horizontal_position};
    ${options._mp_pos_val} 
    : ${options._mp_vertical_position}; margin:5px; background:#fff; opacity:100%; z-index:9999; padding: 10px; border: 1px solid #d4d4d4; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; overflow: hidden; border-radius: 7px;width:auto !important`;
        _mp_greeting_message_box_info.style =
            "height: auto; bottom:50%; right: 100%; padding: 5px;";
        _mp_greeting_message_box_info.innerHTML =
            "<p style='text-decoration:none; font-size:14px !important; font-family: Mulish, sans-serif !important; width: 100%; min-width:150px; border: 1px #d4d4d4 solid; display: inline-block; text-align: left; margin-bottom: 1rem; border-radius: 6px; padding: 10px; overflow-wrap: normal; text-overflow: ellipsis;'>" +
            options._mp_greeting_message +
            "</p>";
        _mp_greeting_message_box_info.style =
            "font-family: Mulish, sans-serif !important;";
        if (options._mp_order.split(",").length > 1) {
            var channelList = createGreetingMessageChannels(options);
            channelList.style = "display: flex; width: auto;";
            _mp_greeting_message_box_info.appendChild(channelList);
        }
        testDiv.appendChild(closeBtn);
        closeBtnDiv.appendChild(testDiv);
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            _mp_close_modal(closeBtnDiv, options);
            options._mp_modal_open = false;
        });
        _mp_greeting_message_box.addEventListener("click", (e) => {
            if (
                options._mp_order == "whatsapp" &&
                e.path[0].classList.value !== "closeBtnX"
            ) {
                document.getElementById("_mp_whatsappBtn").click();
            }
        });
        _mp_greeting_message_box.appendChild(testDiv);
        _mp_greeting_message_modal.appendChild(_mp_greeting_message_box_info);
        _mp_greeting_message_box.appendChild(_mp_greeting_message_modal);
        d.appendChild(_mp_greeting_message_box);
    } else {
        var _mp_logo = document.createElement("img");
        _mp_logo.setAttribute("src", options._mp_company_logo);
        _mp_logo.style =
            "width: 48px; height: 48px; max-width:48px; margin-right: 10px; border-radius: 6px;";
        _mp_greeting_message_box.style = `position: absolute; bottom:${options._mp_horizontal_position};
    ${options._mp_pos_val} 
    : ${options._mp_vertical_position}; margin:5px; background:#fff; opacity:100%; z-index:9999; padding: 10px; border: 1px solid #d4d4d4; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; overflow: hidden; border-radius: 7px; width:auto !important`;
        _mp_greeting_message_box_info.style =
            "height: auto; bottom:50%; right: 100%; padding: 5px;";
        _mp_greeting_message_box_info.innerHTML =
            "<p style='text-decoration:none; font-size:14px !important; font-family: Mulish, sans-serif !important; width: 100%; min-width:150px; border: 1px #d4d4d4 solid; display: inline-block; text-align: left; margin-bottom: 1rem; border-radius: 6px; padding: 10px; overflow-wrap: normal; text-overflow: ellipsis;'>" +
            options._mp_greeting_message +
            "</p>";
        _mp_greeting_message_box_info.style =
            "font-family: Mulish, sans-serif !important;";
        _mp_greeting_message_modal.appendChild(_mp_logo);
        if (options._mp_order.split(",").length > 1) {
            var channelList = createGreetingMessageChannels(options);
            channelList.style = "display: flex; width: auto;";
            _mp_greeting_message_box_info.appendChild(channelList);
        }
        testDiv.appendChild(closeBtn);
        closeBtnDiv.appendChild(testDiv);
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            _mp_close_modal(closeBtnDiv, options);
            options._mp_modal_open = false;
        });
        _mp_greeting_message_box.addEventListener("click", (e) => {
            if (
                options._mp_order == "whatsapp" &&
                e.path[0].classList.value !== "closeBtnX"
            ) {
                document.getElementById("_mp_whatsappBtn").click();
            }
        });
        _mp_greeting_message_box.appendChild(testDiv);
        _mp_greeting_message_modal.appendChild(_mp_greeting_message_box_info);
        _mp_greeting_message_box.appendChild(_mp_greeting_message_modal);
        d.appendChild(_mp_greeting_message_box);
    }
}


// whatsapp button
function _mp_whatsappButton(bl, options) {
    var _mp_button_color = "#4DC247";
    var _mp_background_button_color = "#fff";
    _mp_getButtonSize(options);
    _mp_getButtonSizeMobile(options);

    if (window.innerWidth <= 820) {

        var _mp_whatsappBtn = _mp_createAppButton(
            _mp_background_button_color,
            _mp_mobile_btn_viewport
        );
        var WAMDialog_flag = false;
        _mp_whatsappBtn.id = "_mp_whatsappBtn";
        _mp_whatsappBtn.classList = "_mp_channel_btn";
        var _mp_whatsappSvgPath =
            "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z";
        var svg = _mp_createSVG(
            _mp_whatsappSvgPath,
            _mp_mobile_btn_viewport,
            _mp_button_color
        );
        _mp_whatsappBtn.appendChild(svg);


    } else {


        var _mp_whatsappBtn = _mp_createAppButton(
            _mp_background_button_color,
            _mp_widgetSize
        );
        _mp_whatsappBtn.id = "_mp_whatsappBtn";
        _mp_whatsappBtn.classList = "_mp_channel_btn";
        var _mp_whatsappSvgPath =
            "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z";
        var svg = _mp_createSVG(
            _mp_whatsappSvgPath,
            _mp_widgetSize,
            _mp_button_color
        );
        _mp_whatsappBtn.appendChild(svg);

    }

    var _mp_whatsappNumber = options._mp_whatsapp.replace("+", "");
    if (options._mp_w_app_filled) {
        var _mp_whatsappMessage = options._mp_w_app_filled.replace(" ", "%20");
    } else {
        var _mp_whatsappMessage = "";
    }
    var _mp_whatsappLink =
        "https://wa.me/" + _mp_whatsappNumber + "?text=" + _mp_whatsappMessage;
    if (screen.width > 820) {
        _mp_whatsappBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            _mp_collapseButton(document.querySelector("._mp_buttonList"), options);
            var _mp_whatsappDialogWrapper = document.createElement("div");
            _mp_whatsappDialogWrapper.classList = "_mp_whatsappDialogWrapper";
            var _mp_whatsappDialogContent = document.createElement("div");
            _mp_whatsappDialogContent.classList = "_mp_whatsappDialogContent";
            var _mp_whatsappDialogText = document.createElement("span");
            _mp_whatsappDialogText.classList = "_mp_whatsappDialogText";
            _mp_whatsappDialogText.innerText = `Scannez maintenant le code QR avec votre téléphone pour discuter via Whatsapp :`
            var _mp_whatsappQR = document.createElement("div");
            _mp_whatsappQR.classList = "_mp_whatsappQR";
            if (options._mp_w_app_qrcodeurl) {
                _mp_whatsappQR.innerHTML = `<img src='https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${options._mp_w_app_qrcodeurl}&chld=H|1' height='200px' style='padding:10px'>`;
                _mp_whatsappDialogText.innerText =
                    "Scannez le code QR:";
            } else {
                _mp_whatsappQR.innerHTML = `<img src='https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${_mp_whatsappLink}&chld=H|1' height='200px' style='padding:10px'>`;
            }
            var _mp_whatsappDialogButton = document.createElement("a");
            _mp_whatsappDialogButton.classList = "_mp_whatsappDialogButton";
            _mp_whatsappDialogButton.setAttribute("href", _mp_whatsappLink);
            _mp_whatsappDialogButton.setAttribute("target", "_blank");
            var _mp_whatsappDialogButtonText = document.createElement("span");
            _mp_whatsappDialogButtonText.innerText = "Chat via computer";
            _mp_whatsappDialogButtonText.classList = "_mp_whatsappDialogButtonText";
            var svg = _mp_createSVG(
                "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
                "25px",
                "#fff"
            );

            _mp_whatsappDialogButton.appendChild(svg);
            _mp_whatsappDialogButton.appendChild(_mp_whatsappDialogButtonText);
            _mp_whatsappDialogContent.appendChild(_mp_whatsappDialogText);
            _mp_whatsappDialogContent.appendChild(_mp_whatsappQR);
            _mp_whatsappDialogContent.appendChild(_mp_whatsappDialogButton);
            _mp_whatsappDialogWrapper.appendChild(_mp_whatsappDialogContent);
            document.body.appendChild(_mp_whatsappDialogWrapper);

            window.addEventListener("click", (e) => {
                if (e.target == document.querySelector("._mp_whatsappDialogWrapper")) {
                    document.querySelector("._mp_whatsappDialogWrapper").remove();
                    _mp_collapseButton(
                        document.querySelector("._mp_buttonList"),
                        options
                    );
                    // document.querySelectorAll("._mp_buttonList").remove();
                }
            });
        });
    } else {
        _mp_whatsappBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            _mp_click_outside(options);
            // calls whatsapp api and opens a new window for the chat
            var _mp_whatsappLink =
                "https://wa.me/" +
                _mp_whatsappNumber +
                "?text=" +
                _mp_whatsappMessage;
            window.open(_mp_whatsappLink, "_blank");
        });
    }
    bl.appendChild(_mp_whatsappBtn);
}



function _mp_missingElements(options) {
    if (!options._mp_pos_val) {
        options._mp_pos_val = "right";
    }
    if (!options._mp_v_pos) {
        options._mp_v_pos = "2vw";
    }
    if (!options._mp_h_pos) {
        options._mp_h_pos = "1.8vw";
    }
    if (!options._mp_btn_color) {
        options._mp_btn_color = "#fff";
    }
    if (!options._mp_bubble_color) {
        options._mp_bubble_color = "#000";
    }
    if (options._mp_pos_val == "manual") {
        _mp_zero_v_placement = "top";
        _mp_pos_val = "left";
    } else {
        _mp_zero_v_placement = "bottom";
    }
    options._mp_horizontal_position = "50%";
    options._mp_vertical_position = "100%";
    // options._mp_horizontal_position = 100%
    // options._mp_vertical_position = 40%
    return options._mp_pos_val, options._mp_v_pos, options._mp_h_pos;
}

function _mp_getMobileView(options) {
    options._mp_btn_size = "mobile";
    options._mp_ct_action = "";
    options._mp_horizontal_position = "100%";
    options._mp_vertical_position = "40%";
}


function _mp_getButtonSize(options) {
    switch (options._mp_btn_size) {
        case "big":
            return (_mp_widgetSize = "6vw"), (_mp_widgetSvgSize = "3.5vw");
        case "medium":
            return (_mp_widgetSize = "5vw"), (_mp_widgetSvgSize = "3vw");
        case "normal":
            return (_mp_widgetSize = "4vw"), (_mp_widgetSvgSize = "2vw");
        case "mobile":
            return (_mp_widgetSize = "5vw"), (_mp_widgetSvgSize = "3vw");
        default:
            break;
    }
}

function _mp_getButtonSizeMobile(options) {
    switch (options._mp_btn_size) {
        case "big":
            return (_mp_mobile_btn_viewport = "23vw"), (_mp_mobile_btn_svg = "17vw");
        case "medium":
            return (_mp_mobile_btn_viewport = "19vw"), (_mp_mobile_btn_svg = "14vw");
        case "normal":
            return (_mp_mobile_btn_viewport = "16vw"), (_mp_mobile_btn_svg = "11vw");
        case "mobile":
            return (_mp_mobile_btn_viewport = "16vw"), (_mp_mobile_btn_svg = "11vw");
        default:
            break;
    }
}


function _mp_greetingMessageModal(options) {
    var closeBtnDiv = document.createElement("div");
    closeBtnDiv.id = "closeBtnDiv";
    var closeBtn = document.createElement("div");
    closeBtn.id = "closeBtn";
    var testDiv = document.createElement("div");
    testDiv.id = "testDiv";
    var text = document.createElement("h1");
    text.id = "text";
    // var _mp_greeting_channels = createGreetingMessageChannels(
    //   options._mp_order.split(",")
    // );
    // _mp_greeting_channels.id = "_mp_greeting_channels";
    // testDiv.appendChild(text);
    // text.appendChild(_mp_greeting_channels);
    // testDiv.appendChild(closeBtn);
    // closeBtnDiv.appendChild(testDiv);
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        _mp_close_modal(closeBtnDiv, options);
        options._mp_modal_open = false;
    });

    // testDiv.style =
    //   "position: absolute; bottom:50%;" +
    //   options._mp_pos_val +
    //   ": 100%; margin:5px; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; overflow: hidden; border-radius: 7px;";

    return closeBtnDiv;
}

// creates the top div that contains the close button
function _mp_createModal(svg, color, textContent, options) {
    if (screen.width > 820) {
        var closeBtnDiv = document.createElement("div");
        var closeBtn = document.createElement("div");
        var testDiv = document.createElement("div");
        var text = document.createElement("h1");
        var titleSvg = _mp_createSVG(svg, "30px", "#fff");
        text.innerText = textContent;
        testDiv.style =
            "display:flex; justify-content:space-between; height:45px; padding: 0 10px 0 5px; align-items:center; background-color:" +
            color +
            ";";
        text.style =
            "color: #fff; font-size: 15px; font-family: Mulish, sans-serif !important;";
        closeBtnDiv.style =
            "width: 300px; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; overflow: hidden; background: #fff; border-radius: 7px;";
        closeBtn.innerHTML =
            '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" fill="#fff"/></svg>';
        testDiv.appendChild(titleSvg);
        testDiv.appendChild(text);
        testDiv.appendChild(closeBtn);
        closeBtnDiv.appendChild(testDiv);
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            _mp_close_modal(closeBtnDiv, options);
            options._mp_modal_open = false;
        });
    } else {
        var closeBtnDiv = document.createElement("div");
        var closeBtn = document.createElement("div");
        var testDiv = document.createElement("div");
        var text = document.createElement("h1");
        var titleSvg = _mp_createSVG(svg, "60px", "#fff");
        text.innerText = textContent;
        testDiv.style =
            "display:flex; justify-content:space-between; height:90px; padding: 0 10px 0 5px; align-items:center; background-color:" +
            color +
            ";";
        text.style =
            "color: #fff; font-size: 40px; font-family: Mulish, sans-serif !important;";
        closeBtnDiv.style =
            "width: 650px; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; overflow: hidden; border-radius: 7px;";
        closeBtn.innerHTML =
            '<svg width="60px" height="60px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" fill="#fff"/></svg>';
        testDiv.appendChild(titleSvg);
        testDiv.appendChild(text);
        testDiv.appendChild(closeBtn);
        closeBtnDiv.appendChild(testDiv);
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            _mp_close_modal(closeBtnDiv, options);
            options._mp_modal_open = false;
        });
    }
    return closeBtnDiv;
}

// creates the app buttons
function _mp_createAppButton(backgroundColor, size) {


    if (window.orderMulti) {

        var button = document.createElement("div");
        button.style =
            "width:" +
            size +
            "; height:" +
            size +
            "; background-color:" +
            backgroundColor +
            "; position:relative !important; border-radius:50%; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; margin-bottom:2px; z-index:9999; cursor: pointer";

    } else {
        var button = document.createElement("div");
        button.style =
            "width:" +
            size +
            "; height:" +
            size +
            "; background-color:" +
            backgroundColor +
            "; position:relative !important; border-radius:50%; box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px; margin-bottom:-1px; z-index:9999; cursor: pointer";

    }


    return button;
}

// creates the svg inside the app buttons
function _mp_createSVG(svgPath, size, fill) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill-rule", "evenodd");
    svg.setAttribute("clip-rule", "evenodd");
    // svg.setAttribute("preserveAspectRatio", "xMidYMin");
    svg.innerHTML = "<path d='" + svgPath + "' fill='" + fill + "' />";
    return svg;
}

// gets the selected chat bubble svg path
function _mp_getWidgetSvgPath(options) {
    switch (options._mp_chat_bubble) {
        case "1":
            return (svg =
                "M17.454 12.537c2.782 0 5.046 1.779 5.046 3.967 0 1.12-.462 1.745-1.102 2.509-.021.746-.049 1.054.139 1.866-.891-.306-.986-.396-1.666-.813-.894.218-1.489.38-2.465.38-3.087 0-4.998-2.046-4.998-3.942 0-2.188 2.264-3.967 5.046-3.967zm0-1.5c-3.436 0-6.546 2.292-6.546 5.467 0 2.799 2.633 5.442 6.498 5.442.699 0 1.44-.087 2.213-.275.914.561 2.933 1.128 4.352 1.385-.53-1.044-1.117-2.479-1.088-3.479.714-.853 1.117-1.953 1.117-3.073 0-3.158-3.089-5.467-6.546-5.467zm-8.485 4.614c-1.138-.11-1.611-.247-2.611-.491-.97.596-1.26.815-3.008 1.374.418-1.514.364-2.183.333-3.183-.834-1-1.683-2.07-1.683-3.943 0-3.502 3.589-6.352 8-6.352 4.264 0 7.748 2.664 7.978 6.004.698.038 1.377.14 2.021.315-.022-4.834-4.762-8.319-9.999-8.319-5.281 0-10 3.527-10 8.352 0 1.71.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.313 2.168-.391 5.252-1.258 6.649-2.115.802.196 1.578.314 2.33.374-.135-.749-.148-1.317-.054-2.024z");
        case "2":
            return (svg =
                "M2.001 9.352c0 1.873.849 2.943 1.683 3.943.031 1 .085 1.668-.333 3.183 1.748-.558 2.038-.778 3.008-1.374 1 .244 1.474.381 2.611.491-.094.708-.081 1.275.055 2.023-.752-.06-1.528-.178-2.33-.374-1.397.857-4.481 1.725-6.649 2.115.811-1.595 1.708-3.785 1.661-5.312-1.09-1.305-1.705-2.984-1.705-4.695-.001-4.826 4.718-8.352 9.999-8.352 5.237 0 9.977 3.484 9.998 8.318-.644-.175-1.322-.277-2.021-.314-.229-3.34-3.713-6.004-7.977-6.004-4.411 0-8 2.85-8 6.352zm20.883 10.169c-.029 1.001.558 2.435 1.088 3.479-1.419-.258-3.438-.824-4.352-1.385-.772.188-1.514.274-2.213.274-3.865 0-6.498-2.643-6.498-5.442 0-3.174 3.11-5.467 6.546-5.467 3.457 0 6.546 2.309 6.546 5.467 0 1.12-.403 2.221-1.117 3.074zm-7.563-3.021c0-.453-.368-.82-.82-.82s-.82.367-.82.82.368.82.82.82.82-.367.82-.82zm3 0c0-.453-.368-.82-.82-.82s-.82.367-.82.82.368.82.82.82.82-.367.82-.82zm3 0c0-.453-.368-.82-.82-.82s-.82.367-.82.82.368.82.82.82.82-.367.82-.82z");
        case "3":
            return (svg =
                "M10 3.002c4.411 0 8 2.849 8 6.35 0 3.035-3.029 6.311-7.925 6.311-1.58 0-2.718-.317-3.718-.561-.966.593-1.256.813-3.006 1.373.415-1.518.362-2.182.331-3.184-.837-1.001-1.682-2.069-1.682-3.939 0-3.501 3.589-6.35 8-6.35zm0-2.002c-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 1.181.289 2.312.421 3.382.421 5.903 0 9.925-4.038 9.925-8.313 0-4.852-4.751-8.352-10-8.352zm11.535 11.174c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348zm-15.035-3.763c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071z");
        case "4":
            return (svg =
                "M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75");
        default:
            break;
    }
}

// creates the widget svg
function _mp_widgetSvg(size, options) {
    var _mp_widgetSvgPath = _mp_getWidgetSvgPath(options);
    var _mp_widgetCloseSvgPath =
        "M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill-rule", "evenodd");
    svg.setAttribute("clip-rule", "evenodd");
    // svg.setAttribute("preserveAspectRatio", "xMidYMin");
    svg.innerHTML = `<path class='_mp_open' style='display:block' d='
    ${_mp_widgetSvgPath}' fill='${options._mp_bubble_color}' /><path class='_mp_close' style='display:none' d='
    ${_mp_widgetCloseSvgPath}' fill='${options._mp_bubble_color}' />`;
    return svg;
}

// following 3 functions close buttons/modals
function _mp_click_outside(options) {
    if (!!document.getElementById(`${options._mp_randomID}_modal`)) {
        const modal = document.querySelector(`#${options._mp_randomID}_modal`);
        modal.remove();
        !!document.getElementById(`${options._mp_randomID}_modal`)
            ? document.getElementById(`${options._mp_randomID}_modal`).remove()
            : null;
        options._mp_modal_open = false;
    }
}

function _mp_close_modal(parent, options) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    _mp_eventFire(
        document.getElementById(`${options._mp_randomID}_modal`),
        "click"
    );
}

function _mp_widget_close_button(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function _mp_widget_close_button_list(parent) {
    parent.removeChild(parent.firstChild);
}

function _mp_eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent("on" + etype);
    } else {
        var evObj = document.createEvent("Events");
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function createGreetingMessageChannels(options) {
    var _mp_channelDiv = document.createElement("div");
    _mp_channelDiv.style = "display:flex";
    _mp_channelDiv.classList = "_mp_channelDiv";
    options._mp_order.split(",").forEach((el) => {
        var _mp_button_color = "#4DC247";
        var _mp_background_button_color = "#fff";
        _mp_getButtonSize(options);
        var _mp_whatsappBtn = _mp_createAppButton(
            _mp_background_button_color,
            _mp_widgetSize
        );
        _mp_whatsappBtn.id = "_mp_whatsappBtn";
        _mp_whatsappBtn.classList = "_mp_channel_btn";
        var _mp_whatsappSvgPath =
            "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z";
        var svg = _mp_createSVG(
            _mp_whatsappSvgPath,
            "30px",
            _mp_button_color
        );
        _mp_whatsappBtn.appendChild(svg);
        var _mp_whatsappNumber = options._mp_whatsapp.replace("+", "");
        if (options._mp_w_app_filled) {
            var _mp_whatsappMessage = options._mp_w_app_filled.replace(
                " ",
                "%20"
            );
        } else {
            var _mp_whatsappMessage = "";
        }
        var _mp_whatsappLink =
            "https://wa.me/" +
            _mp_whatsappNumber +
            "?text=" +
            _mp_whatsappMessage;
        if (screen.width > 820) {
            _mp_whatsappBtn.addEventListener("click", (e) => {
                if (e.currentTarget) {
                    _mp_click_outside(options);
                    var _mp_whatsappDialogWrapper = document.createElement("div");
                    _mp_whatsappDialogWrapper.classList =
                        "_mp_whatsappDialogWrapper";
                    var _mp_whatsappDialogContent = document.createElement("div");
                    _mp_whatsappDialogContent.classList =
                        "_mp_whatsappDialogContent";
                    var _mp_whatsappDialogText = document.createElement("span");
                    _mp_whatsappDialogText.classList = "_mp_whatsappDialogText";
                    _mp_whatsappDialogText.innerText =
                        "Scan QR code with your phone now to chat via Whatsapp:";
                    var _mp_whatsappQR = document.createElement("div");
                    _mp_whatsappQR.classList = "_mp_whatsappQR";
                    if (options._mp_w_app_qrcodeurl) {
                        _mp_whatsappQR.innerHTML = `<img src='https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${options._mp_w_app_qrcodeurl}&chld=H|1' height='200px' style='padding:10px'>`;
                        _mp_whatsappDialogText.innerText =
                            "Scan QR code:";
                    } else {
                        _mp_whatsappQR.innerHTML = `<img src='https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${_mp_whatsappLink}&chld=H|1' height='200px' style='padding:10px'>`;
                        _mp_whatsappDialogText.innerText =
                            "Scan QR code with your phone now to chat via Whatsapp:";
                    }
                    var _mp_whatsappDialogButton = document.createElement("a");
                    _mp_whatsappDialogButton.classList = "_mp_whatsappDialogButton";
                    _mp_whatsappDialogButton.setAttribute("href", _mp_whatsappLink);
                    _mp_whatsappDialogButton.setAttribute("target", "_blank");
                    var _mp_whatsappDialogButtonText =
                        document.createElement("span");
                    _mp_whatsappDialogButtonText.innerText = "Chat via computer";
                    _mp_whatsappDialogButtonText.classList =
                        "_mp_whatsappDialogButtonText";
                    var svg = _mp_createSVG(
                        "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
                        "25px",
                        "#fff"
                    );

                    _mp_whatsappDialogButton.appendChild(svg);
                    _mp_whatsappDialogButton.appendChild(
                        _mp_whatsappDialogButtonText
                    );
                    _mp_whatsappDialogContent.appendChild(_mp_whatsappDialogText);
                    _mp_whatsappDialogContent.appendChild(_mp_whatsappQR);
                    _mp_whatsappDialogContent.appendChild(_mp_whatsappDialogButton);
                    _mp_whatsappDialogWrapper.appendChild(
                        _mp_whatsappDialogContent
                    );
                    document.body.appendChild(_mp_whatsappDialogWrapper);
                }
                window.addEventListener("click", (e) => {
                    if (
                        e.target ==
                        document.querySelector("._mp_whatsappDialogWrapper")
                    ) {
                        document.querySelector("._mp_whatsappDialogWrapper").remove();
                    }
                });
            });
        } else {
            _mp_whatsappBtn.addEventListener("touchstart", (e) => {
                e.stopPropagation();
                _mp_click_outside(options);
                // calls whatsapp api and opens a new window for the chat
                var _mp_whatsappLink =
                    "https://wa.me/" +
                    _mp_whatsappNumber +
                    "?text=" +
                    _mp_whatsappMessage;
                window.open(_mp_whatsappLink, "_blank");
            });
        }
        _mp_whatsappBtn.style = "margin-right:2px";
        _mp_channelDiv.appendChild(_mp_whatsappBtn);
        // creates instagram button for greeting modal
    });
    _mp_channelDiv.style = "display:flex; margin-top:-5px";
    return _mp_channelDiv;
}
