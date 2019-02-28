'use strict';

/**
 * @ngdoc overview
 * @name 153App
 * @description
 * # 153App
 *
 * Main module of the application.
 */
angular
    .module('153App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

var ismobile;
$(document).ready(function() {

    // Mobile check

    //var ismobile;
    window.mobilecheck = function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        ismobile = check;
    }

    mobilecheck();

    // create projects in grid

    var gridDiv = document.getElementById('projects');
    if (gridDiv !== null) {
        _.forEach(projects, function(n, key) {
            createGridElement(n, key);
        });
    }

    // init Isotope
    var $container = $('.grid').isotope({
        itemSelector: '.col-md-4',
        layoutMode: 'fitRows'
    });

    // filter functions
    var filterFns = {};

    // bind filter button click
    $('#filters').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $container.isotope({
            filter: filterValue
        });
    });

    // change is-checked class on buttons
    $('.button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    // open sketchbook
    var sketches = [

        // telephone poles series

        '../images/sketchbook/pole.jpg',
        '../images/sketchbook/scape.jpg',
        '../images/sketchbook/stoneship.jpg',
        '../images/sketchbook/telephonepoles.jpg',
        '../images/sketchbook/tele.jpg',
        '../images/sketchbook/falling.jpg',

        // figure drawings

        '../images/sketchbook/figure1.jpg',
        '../images/sketchbook/figure2.jpg',

        // watercolors

        '../images/sketchbook/hopper.jpg',
        '../images/sketchbook/butterfly.jpg',
        '../images/sketchbook/huan.jpg',
        '../images/sketchbook/manhattan.jpg',

        // moleskin
        '../images/sketchbook/moleskin1.jpg',
        '../images/sketchbook/moleskin2.jpg',
        '../images/sketchbook/moleskin3.jpg',
        '../images/sketchbook/moleskin4.jpg'

    ];

    if ($("#homepage-flag").length > 0) {
        $('.btn-sketches-wrapper').slickLightbox({
            images: sketches,
            itemSelector: '.sketch-btn'
        });
    };


    // GO-TOP button
    checkOffset();

    var showhide;

    function checkOffset() {
        if ($("#homepage-flag").length > 0) {
            //console.log('im on homepage');
            if (showhide == null) {
                if (isFarFromTop()) {
                    showhide = true;
                } else {
                    showhide = false;
                }
            } else {
                if (isFarFromTop()) {
                    if (showhide !== true) {
                        $('.go-top').velocity("fadeIn", {
                            duration: 500,
                            queue: false
                        });
                        showhide = true;
                    }
                } else {
                    if (showhide !== false) {
                        $('.go-top').velocity("fadeOut", {
                            duration: 500,
                            queue: false
                        });
                        showhide = false;
                    }
                }
            }
        }
    }

    function isFarFromTop() {
        var h = $('.hello').height() + $('.hello').offset().top, // .hello div Height
            st = $(window).scrollTop(), // Scroll Top
            offset = -1,
            boo = st > (h + offset);
        return boo;
    }


    $('a[href*=#]').bind('click', function(e) {
        checkOffset();
    });

    $('#btn-work').click(function(e) {
        // find out height of WORK
        var workheight = $("#work").offset().top;
        $('html').velocity('scroll', {
            duration: 600,
            offset: workheight,
            easing: 'easeInOutCubic'
        });
        checkOffset();
    });

    $('#go-top').click(function(e) {
        $('html').velocity('scroll', {
            duration: 600,
            offset: '0',
            mobileHA: false,
            easing: 'easeInOutCubic'
        });
        checkOffset();
    });

    $(document).scroll(function() {
        checkOffset();
    });



    function isVisible(elment) {
        var vpH = $(window).height(), // Viewport Height
            st = $(window).scrollTop(), // Scroll Top
            y = $(elment).offset().top;

        return y <= (vpH + st);
    }


    // full name animation
    $('.navbar-brand').velocity("fadeIn", {
        duration: 200
    });

    var shixie = $('.shixie')
        .blast({
            delimiter: 'character',
            tag: 'div',
            customClass: 'sh',
            generateIndexID: true
        });

    var fullname = $('.xjst')
        .blast({
            delimiter: 'character',
            tag: 'div',
            customClass: 'fn',
            generateIndexID: true
        })
        .velocity({
            opacity: 0
        }, 0);

    $('.navbar-brand').hover(
        function fullNameIn() {
            $('#sh-6').velocity({ //"."
                opacity: 0,
                translateX: 40
            }, 400, [0, 0.53, 1, 0.6]);

            $('#sh-0, #sh-1, #sh-2').velocity({ //"Shi"
                translateX: 84,
                duration: 1250,
            }, 450, [0.75, 0, 0.59, 1]);

            $('#sh-3, #sh-4').velocity({ //"Xi"
                translateX: -28,
            });

            $('#fn-2, #fn-3, #fn-4, #fn-5, #fn-6, #fn-7').velocity({ //"angjun"
                opacity: 1,
                translateX: -62,
            }, 400, 'swing');

            $('#fn-8, #fn-9, #fn-10').velocity({
                opacity: 0
            }, 240);

            $('#fn-11, #fn-12, #fn-13, #fn-14, #fn-15, #fn-16, #fn-17, #fn-18').velocity({ //"Trofimov"
                opacity: 1,
                translateX: -62
            }, 700, [0, 0.19, 0.36, 1]);

            $('#sh-5').velocity({
                opacity: 0
            });
            $('#sh-3').text($('#sh-3').text().toUpperCase());

        },

        function fullNameOut() {
            $('#sh-3').text($('#sh-3').text().toLowerCase());
            $('#sh-5').velocity('reverse');
            $('#fn-11, #fn-12, #fn-13, #fn-14, #fn-15, #fn-16, #fn-17, #fn-18').velocity('reverse');
            $('#fn-8, #fn-9, #fn-10').velocity('reverse');
            $('#fn-2, #fn-3, #fn-4, #fn-5, #fn-6, #fn-7').velocity('reverse');
            $('#sh-3, #sh-4').velocity('reverse', 300);
            $('#sh-0, #sh-1, #sh-2').velocity('reverse', 500, [0.75, 0, 0.59, 1]);
            $('#sh-6').velocity('reverse', 900, [0, 0.19, 0.36, 1]);
        }
    );

    // dynamic styling .proj-desc
    function projDescMargin() {
        var vh = $('.hero-media').height();
        $('.proj-desc').css('margin-top', vh * 1.05 + 'px');
    }

    projDescMargin();

    window.onresize = function() {
        projDescMargin();
    }

    $(function() {
        var iframe = $('#player')[0];
        var player = $f(iframe);
        var status = $('.status');

        // When the player is ready, add listeners for pause, finish, and playProgress
        player.addEvent('ready', function() {
            status.text('ready');
            player.addEvent('play', onPlay);
        });

        function onPlay(id) {
            var windowheight = $(window).height();
            var playerheight = $('.hero-media').height();
            $('.hero-media').velocity("scroll", {
                offset: -(windowheight - playerheight) / 2
            });
            status.text('play');
        }
    });


    function createGridElement(obj, num) {

        var title = _.get(obj, 'title');
        var imageurl = _.get(obj, 'thumbnail');
        var tags = _.get(obj, 'tags');

        var div = document.createElement('div');
        div.className = 'col-md-4 col-sm-6 col-xs-12' + ' proj-' + num + ' ' + tags;
        div.style.backgroundImage = "url(" + imageurl + ")";

        var para = document.createElement("p");
        var p = document.createTextNode(title);
        para.appendChild(p);
        para.className = 'gridtitle';

        var a = document.createElement('a');
        a.className = 'gridlink';
        a.href = _.get(obj, 'link');

        var gridHighlight = document.createElement('div');
        gridHighlight.className = "gridHighlight";
        gridHighlight.style.backgroundImage = "url(../images/bg_highlight.svg)";

        div.appendChild(gridHighlight);
        div.appendChild(para);

        document.getElementById('projects').appendChild(a).appendChild(div);

        // Grid Title and Thumbnail hover effect

        if (ismobile) { //console.log('i AM mobile');
            $('.gridlink').addClass('mo_gridlink');
            $('.proj-' + num).bind('touchstart mousedown', function(e) {
                function highlightOut() {
                    $(this).find('.gridHighlight').velocity({
                        translateX: -500,
                        easing: 'easeInOutCubic'
                    });
                    $(this).find('.gridtitle').velocity({
                        translateX: -500,
                        easing: 'easeInOutCubic'
                    }, 400);
                }
            });


        } else { //console.log('im not mobile');
            $('.proj-' + num).find('.gridHighlight').velocity({
                translateX: -500,
            }, 0);
            $('.proj-' + num).find('.gridtitle').velocity({
                translateX: -500,
            }, 0);

            $('.proj-' + num).hover(

                function highlightIn() {
                    $(this).find('.gridHighlight').velocity({
                        translateX: 0,
                        easing: 'easeInOutCubic'
                    });
                    $(this).find('.gridtitle').velocity({
                        translateX: 0,
                        easing: 'easeInOutCubic'
                    }, 440);
                },

                function highlightOut() {
                    $(this).find('.gridHighlight').velocity('reverse');
                    $(this).find('.gridtitle').velocity('reverse');
                }
            );
        }

    }


    // SLICK gallery and lightbox

    $('.gallery').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        variableWidth: true

    });


    $('.gallery').slickLightbox({
        itemSelector: '.slickitem img',
        src: 'src'
    });

    $('.gallery-wrap').slickLightbox({
        itemSelector: '.imginsert-slick img',
        src: 'src'
    });


});
