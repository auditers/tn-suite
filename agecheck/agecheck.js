/*
 * Plugin: ageCheck.js
 * Description: A simple plugin to verify user's age.
 * Uses sessionStorage/localStorage API to store if user is verified.
 * Options can be passed for easy customization.
 * Author: Michael Soriano
 * Author's website: http://michaelsoriano.com
 *
 */

(function ($) {
  $.ageCheck = function (options) {
    const settings = $.extend({
      minAge: 18,
      redirectTo: '',
      redirectOnFail: '',
      title: 'Verificación +18',
      copy: 'Este sitio requiere que tengas más de [18] años de edad. Por favor, ingresá tu fecha de nacimiento:',
      success: null,
      successMsg: {
        header: '¡Verficado!',
        body: 'Estás siendo redirigido al sitio web...'
      },
      underAgeMsg: 'Perdón, pero los menores de edad no tienen permitido ingresar al sitio...',
      underAge: null,
      errorMsg: {
        invalidDay: 'Día incorrecto',
        invalidYear: 'Año incorrecto'
      },
      storage: 'sessionStorage',
      storageExpires: null,
    }, options);

    var storage = window[settings.storage];

    const _this = {
      month: '',
      day: '',
      year: '',
      age: '',
      errors: [],
      setValues() {
        const month = $('.ac-container .month').val();
        const day = $('.ac-container .day').val();
        _this.month = month;
        _this.day = day.replace(/^0+/, ''); // remove leading zero
        _this.year = $('.ac-container .year').val();
      },
      validate() {
        _this.errors = [];
        if (/^([0-9]|[12]\d|3[0-1])$/.test(_this.day) === false) {
          _this.errors.push(settings.errorMsg.invalidDay);
        }
        if (/^(19|20)\d{2}$/.test(_this.year) === false) {
          _this.errors.push(settings.errorMsg.invalidYear);
        }
        _this.clearErrors();
        _this.displayErrors();
        return _this.errors.length < 1;
      },
      clearErrors() {
        $('.errors').html('');
      },
      displayErrors() {
        let html = '<ul>';
        for (let i = 0; i < _this.errors.length; i++) {
          html += `<li><span>x</span>${_this.errors[i]}</li>`;
        }
        html += '</ul>';
        setTimeout(() => {
          $('.ac-container .errors').html(html);
        }, 200);
      },
      reCenter(b) {
        b.css('top', `${Math.max(0, (($(window).height() - (b.outerHeight() + 150)) / 2))}px`);
        b.css('left', `${Math.max(0, (($(window).width() - b.outerWidth()) / 2))}px`);
      },
      buildHtml() {
        const copy = settings.copy;
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'];
        let html = '';
        html += '<style>@import url(https://fonts.googleapis.com/css?family=Bree+Serif); .ac-overlay{box-sizing: border-box; height:100%; width:100%; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0,0,0,0.96); z-index: 99998; opacity:0; cursor: wait; } .ac-container {box-sizing: border-box; font-family: "Bree Serif", serif; width: 360px; position: fixed; padding: 20px 20px 30px 20px; background: #fff; z-index: 99999; opacity:0; text-align:center; border-radius: 4px; box-shadow:0px 0px 5px #000; font-weight:normal; } .ac-container h2 {box-sizing: border-box; margin:0 0 14px 0; font-size:26px; border-bottom:1px dashed #ccc; padding-bottom:11px; } .ac-container h3 {box-sizing: border-box; color:#333333; margin-bottom:5px; margin-top:15px; font-size:26px; } .ac-container p {box-sizing: border-box; margin:0 0 20px 0; font-size: 14px; color:#959595; line-height: 20px; } .ac-container p strong {color:#FF1F1F; } .ac-container select, .ac-container input {box-sizing: border-box; color:#555; padding: 5px 10px; font-size: 12px; line-height: 1.5; border-radius: 3px; margin-right:5px; border:1px solid #ccc; } .ac-container input.day{box-sizing: border-box; width:45px; height:28px; } .ac-container input.year{box-sizing: border-box; width:70px; height: 28px; } .ac-container select {box-sizing: border-box; height:28px; padding-left:4px; } .ac-container button {box-sizing: border-box; display: inline-block; margin-bottom: 1px; font-weight: bold; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 1px; padding: 4px 10px 4px 10px; font-size: 12px; line-height: 1.5; width: 84px; background:#333; color:#fff; } .ac-container button:hover{box-sizing: border-box; background:#666666; } .ac-container .errors  {box-sizing: border-box; margin:0 0 20px 0; font-size: 12px; line-height: 18px; color:#FF1F1F; } .ac-container .errors ul, .ac-container .errors li{box-sizing: border-box; padding:0 0 3px 0; margin:0 0 0 0; list-style:none; } .ac-container .errors li span {box-sizing: border-box; font-size:9px; background:#ebebeb; border:1px solid #ccc; width: 14px; height:14px; border-radius:7px; display:inline-block; color:#FF1F1F; font-weight: bold; text-align: center; margin-right:5px; line-height: 13px; position:relative; top:-2px; text-shadow: 1px 1px 0 #fff; font-family:arial; } .ac-container .fields {box-sizing: border-box; clear:both; margin:10px 0 10px 0; } @media (max-width: 500px) {.ac-container {box-sizing: border-box; width:auto; margin-right:20px; margin-left:1px; } .ac-container select, .ac-container input.day, .ac-container input.year{box-sizing: border-box; display:block; margin-bottom:10px; margin-right:0; width:100%; } .ac-container button {box-sizing: border-box; display: block; width: 100%; } }</style>';
        html += '<div class="ac-overlay"></div>';
        html += '<div class="ac-container">';
        html += `<h2>${settings.title}</h2>`;
        html += `<p>${copy.replace('[21]', `<strong>${settings.minAge}</strong>`)}` + '</p>';
        html += '<div class="errors"></div>';
        html += '<div class="fields">';
        html += '<input class="day" maxlength="2" placeholder="01" />';
        html += '<select class="month">';
        for (let i = 0; i < months.length; i++) {
          html += `<option value="${i}">${months[i]}</option>`;
        }
        html += '</select>';
        html += '<input class="year" maxlength="4" placeholder="1989"/>';
        html += '<button>Enviar</button></div>';
        html += '<small style="position: absolute;bottom: -30px;text-align: center;width: 100%;left: 0;color: #666;">Funcionalidad provista por <a href="">Nombre</a></small></div>';

        $('body').append(html);

        $('.ac-overlay').animate({
          opacity: 0.95,
        }, 200, () => {
          _this.reCenter($('.ac-container'));
          $('.ac-container').css({
            opacity: 1,
          });
        });

        $('.ac-container .day, .ac-container .year').focus(function () {
          $(this).removeAttr('placeholder');
        });
      },
      setAge() {
        _this.age = '';
        const birthday = new Date(_this.year, _this.month, _this.day);
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        _this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      },
      getStorage() {
        if(settings.storage === 'cookie') {
          return document.cookie.split(';').filter((item) => item.trim().startsWith('ageVerified=')).length;
        } else {
          return storage.getItem('ageVerified') === 'true';
        }
      },
      setStorage(key, val, expires) {
        try {
          if(settings.storage === 'cookie') {
            if(expires) {
              let date = new Date();
              date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
              expires = date.toGMTString();
            }
            document.cookie = "ageVerified=true; expires=" + expires + ";";
          } else {
            storage.setItem(key, val);
          }
          return true;
        } catch (e) {
          return false;
        }
      },
      handleSuccess() {
        const successMsg = `<h3>${settings.successMsg.header}</h3><p>${settings.successMsg.body}</p>`;
        $('.ac-container').html(successMsg);
        setTimeout(() => {
          $('.ac-container').animate({
            top: '-350px',
          }, 200, () => {
            $('.ac-overlay').animate({
              opacity: '0',
            }, 500, () => {
              if (settings.redirectTo !== '') {
                window.location.replace(settings.redirectTo);
              } else {
                $('.ac-overlay, .ac-container').remove();
                if (settings.success) {
                  settings.success();
                }
              }
            });
          });
        }, 2000);
      },
      handleUnderAge() {
        const underAgeMsg = `<h3>${settings.underAgeMsg}</h3>`;
        $('.ac-container').html(underAgeMsg);
        if (settings.redirectOnFail !== '') {
          setTimeout(() => {
            window.location.replace(settings.redirectOnFail);
          }, 2000);
        }
        if (settings.underAge) {
          settings.underAge();
        }
      },
    }; // end _this

    if (_this.getStorage()) {
      return false;
    }

    _this.buildHtml();

    $('.ac-container button').on('click', () => {
      _this.setValues();
      if (_this.validate() === true) {
        _this.setAge();

        if (_this.age >= settings.minAge) {
          if (!_this.setStorage('ageVerified', 'true', settings.storageExpires)) {
            console.log(settings.storage + ' not supported by your browser');
          }
          _this.handleSuccess();
        } else {
          _this.handleUnderAge();
        }
      }
    });

    $(window).resize(() => {
      _this.reCenter($('.ac-container'));
      setTimeout(() => {
        _this.reCenter($('.ac-container'));
      }, 500);
    });
  };
}(jQuery));

$(document).ready(function(){ 
    $.ageCheck({
        minAge: 18
    });        
});   
