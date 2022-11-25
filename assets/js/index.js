$(document).ready(function () {
    // PRELOADER
    setTimeout(function () {
        $('.preloader').addClass('end');
        $('.wrapper').css('display', 'block');
    }, 3000)
    setTimeout(function () {
        $('.preloader').css('display', 'none');
    }, 4000);

    // CRYPTOS
    const symbols = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH'];
    $.get('https://api.coinlore.net/api/tickers/',
        function (datas) {
            for (i in datas.data) {
                for (let j = 0; j < symbols.length; j++) {
                    if (datas.data[i].symbol == symbols[j]) {
                        $('.cryptos').append(`
                        <li class="cryptos__item p-3 mb-4">
                            <div class="crypto d-flex align-items-center">
                                <img src="assets/images/figma/cryptos/${symbols[j]}.svg" alt="bitcoin ison">
                                <h5 class="m-2">${datas.data[i].symbol}</h5>
                                <span class="d-flex justify-content-center align-items-center px-2">${datas.data[i].name}</span>
                            </div>
                            <hr class="my-3">
                            <h3 class="crypto__price font-weight-bold">$${datas.data[i].price_usd}</h3>
                            ${datas.data[i].percent_change_24h > 0 ? 
                                `<h4 class="crypto__condition font-weight-normal crypto__condition--up mt-3"><i class="fa-solid fa-circle-chevron-up"></i> ${datas.data[i].percent_change_24h.replace(/-/g, '')}%</h4>    `
                                : 
                                `<h4 class="crypto__condition font-weight-normal crypto__condition--down mt-3"><i class="fa-solid fa-circle-chevron-down"></i> ${datas.data[i].percent_change_24h.replace(/-/g, '')}%</h4>    `
                            }
                        </li>                   
                        `)
                    } else {
                        continue
                    }
                }
            }
        });

    // VALIDATION
    var emailValidation = false;
    var passwordValidation = false;
    if ($('#email') != "" || $('#password') != "") {
        $('#email').on('keyup', function () {
            emailValue = $(this).val();
            if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
                emailValidation = false;
                $('#email').removeClass('valid')
            } else {
                $('#email').addClass('valid')
                $('#email').removeClass('invalid')
                emailValidation = true;
            }
        })
        $('#email').on('blur', function () {
            emailValue = $(this).val();
            if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
                $('#email').removeClass('valid')
                $('#email').addClass('invalid')
            } else {
                emailValidation = true;
                $('#email').removeClass('invalid')
                $('#email').addClass('valid')
            }
        })
        $('#password').on('keyup', function () {
            passValue = $(this).val();
            characters = false;
            numbers = false;
            lowercase = false;
            uppercase = false;
            specialCharacters = false;
            $('.pwd-val__item').addClass('pwd-val__item--invalid')
            if (passValue.length >= 8 && passValue.length <= 15) {
                characters = true;
                $('.pwd-val__item:nth-child(1)').removeClass('pwd-val__item--invalid');
                $('.pwd-val__item:nth-child(1)').addClass('pwd-val__item--valid');
            } else {
                $('.pwd-val__item:nth-child(1)').removeClass('pwd-val__item--valid')
                $('.pwd-val__item:nth-child(1)').addClass('pwd-val__item--invalid')
            }
            if (passValue.match(/[0-9]/g)) {
                numbers = true;
                $('.pwd-val__item:nth-child(2)').removeClass('pwd-val__item--invalid');
                $('.pwd-val__item:nth-child(2)').addClass('pwd-val__item--valid');
            } else {
                $('.pwd-val__item:nth-child(2)').removeClass('pwd-val__item--valid')
                $('.pwd-val__item:nth-child(2)').addClass('pwd-val__item--invalid')
            }
            if (passValue.match(/[a-z]/g)) {
                lowercase = true;
                $('.pwd-val__item:nth-child(3)').removeClass('pwd-val__item--invalid');
                $('.pwd-val__item:nth-child(3)').addClass('pwd-val__item--valid');
            } else {
                $('.pwd-val__item:nth-child(3)').removeClass('pwd-val__item--valid')
                $('.pwd-val__item:nth-child(3)').addClass('pwd-val__item--invalid')
            }
            if (passValue.match(/[A-Z]/g)) {
                uppercase = true;
                $('.pwd-val__item:nth-child(4)').removeClass('pwd-val__item--invalid');
                $('.pwd-val__item:nth-child(4)').addClass('pwd-val__item--valid');
            } else {
                $('.pwd-val__item:nth-child(4)').removeClass('pwd-val__item--valid')
                $('.pwd-val__item:nth-child(4)').addClass('pwd-val__item--invalid')
            }
            if (passValue.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g)) {
                specialCharacters = true;
                $('.pwd-val__item:nth-child(5)').removeClass('pwd-val__item--invalid');
                $('.pwd-val__item:nth-child(5)').addClass('pwd-val__item--valid');
            } else {
                $('.pwd-val__item:nth-child(5)').removeClass('pwd-val__item--valid')
                $('.pwd-val__item:nth-child(5)').addClass('pwd-val__item--invalid')
            }
            if (characters && numbers && lowercase && uppercase && specialCharacters) {
                $('#password').addClass('valid')
                $('#password').removeClass('invalid')
                passwordValidation = true;
            } else {
                $('#password').removeClass('valid')
                $('#password').addClass('invalid')
                passwordValidation = false;
            }
        })

        $('form input').on('keyup', function () {
            console.log(passwordValidation, emailValidation);
            if (passwordValidation && emailValidation) {
                $('form button').removeAttr('disabled')
                $('form button').removeClass('disabled__btn')
            } else {
                $('form button').attr('disabled', true)
                $('form button').addClass('disabled__btn')
            }
        })
    }

    // FORM_POST
    $('#btn__submit').on('click', function () {
        $.post($("#registration__form").attr("action"),
            $("#registration__form :input").serializeArray(),
            function (data) {
                var response = JSON.parse(data)
                if (response.message == "success") {``
                    $('.registration__alert--valid').addClass('active')
                    $('.registration__alert--invalid').removeClass('active')
                } else {
                    $('.registration__alert--valid').removeClass('active')
                    $('.registration__alert--invalid').addClass('active')
                    $('.registration__alert--invalid h2').html(
                        `                            
                    <h3 class="mb-4 d-flex align-items-center"><i class="fas fa-frown mr-3"></i>${response.message}OOO</h3>
                    `
                    )
                }
            }).fail(function () {
            console.log("aaa");
            $('.registration__alert--valid').removeClass('active')
            $('.registration__alert--invalid').addClass('active')
            $('.registration__alert--invalid').html(
                `                            
                <h3 class="mb-4 d-flex align-items-center"><i class="fas fa-frown mr-3"></i>Something went wrong... <br> The server  is not responding!</h3>
                `
            )
        })
        $('#registration__form').on('submit', function () {
            return false;
        });
    });

    // SWIPER
    $(function () {
        $("#carousel-multiple").on("slide.bs.carousel", function (e) {
            var itemsPerSlide = parseInt($(this).attr('data-maximum-items-per-slide')),
                totalItems = $(".carousel-item", this).length,
                reserve = 1, 
                $itemsContainer = $(".carousel-inner", this),
                it = (itemsPerSlide + reserve) - (totalItems - e.to);

            if (it > 0) {
                for (var i = 0; i < it; i++) {
                    $(".carousel-item", this)
                        .eq(e.direction == "left" ? i : 0)
                        .appendTo($itemsContainer);
                }
            }
        });
    });
})