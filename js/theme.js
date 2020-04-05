/*------------------------------------------------------------------
[Table of contents]

- Author:  Andrey Sokoltsov
- Profile:	http://themeforest.net/user/andreysokoltsov
--*/

(function () {

	"use strict";

	var Core = {

		initialized: false,

		initialize: function () {

			if (this.initialized) return;
			this.initialized = true;

			this.build();

		},

		build: function () {

			//Placeholder for IE
			$('input, textarea').placeholder();

			// Dropdown menu
			this.dropdownhover();

			// Page preloader
			this.initPagePreloader();

			// Equal Height
			this.setEqualHeight();

			// Slider
			this.initSlider();

			//Setup WOW.js
			this.initScrollAnimations();

			// Owl Carousel
			this.initOwlCarousel();

			// bxSlider
			this.initBxSlider();

			// Tabs
			this.initTabs();

			// Collapse Blocks
			this.initCollapsible();

			// Counter
			this.initNumberCounter();

			// Go to top
			this.initGoToTop();

			// scrolltop
			this.scrolltop();

			// ClickAboutMe
			this.ClickAboutMe();

			// Mymenu
			this.Mymenu();

			this.Myvalami();

		},

		dropdownhover: function (options) {
			/** Extra script for smoother navigation effect **/
			if ($(window).width() > 798) {
				$('.navbar-main-slide').on('mouseenter', '.navbar-nav-menu > .dropdown', function () {
					"use strict";
					$(this).addClass('open');
				}).on('mouseleave', '.navbar-nav-menu > .dropdown', function () {
					"use strict";
					$(this).removeClass('open');
				});
			}
		},

		initPagePreloader: function (options) {
			var $preloader = $('#page-preloader'),
				$spinner = $preloader.find('.spinner-loader');
			$spinner.fadeOut();
			$preloader.delay(500).fadeOut('slow');
			window.scrollTo(0, 0);
		},

		setEqualHeight: function () {
			var equalHeight = $('body').data('equal-height');
			if (equalHeight && equalHeight.length) {
				var columns = $(equalHeight);
				var tallestcolumn = 0;
				columns.each(
					function () {
						var currentHeight = $(this).height();
						if (currentHeight > tallestcolumn) {
							tallestcolumn = currentHeight;
						}
					}
				);
				columns.height(tallestcolumn);
			}
		},

		initSlider: function (options) {
			var slider = $('.slider').length;
			if (slider) {
				jQuery(".slider").slider({
					min: 100,
					max: 3000,
					values: [0, 3000],
					range: true,
					slide: function (event, ui) {
						$(".ui-slider-handle span.min").text(ui.values[0]);
						$(".ui-slider-handle span.max").text(ui.values[3]);
					},
					stop: function (event, ui) {
						$("input.j-min").val(ui.values[0]);
						$("input.j-max").val(ui.values[3]);
					}
				});
				$(".ui-slider-handle:first-of-type").append("<span class='min'>100</span>");
				$(".ui-slider-handle:last-of-type").append("<span class='max'>3000</span>");
			}
		},

		initScrollAnimations: function (options) {
			var scrollingAnimations = $('body').data("scrolling-animations");
			if (scrollingAnimations) {
				new WOW().init();
			}
		},

		initOwlCarousel: function (options) {
			$(".enable-owl-carousel").each(function (i) {
				var $owl = $(this);
				var itemsData = $owl.data('items');
				var autoPlayData = $owl.data('auto-play');
				var navigationData = $owl.data('navigation');
				var stopOnHoverData = $owl.data('stop-on-hover');
				var itemsDesktopData = $owl.data('items-desktop');
				var itemsDesktopSmallData = $owl.data('items-desktop-small');
				var itemsTabletData = $owl.data('items-tablet');
				var itemsTabletSmallData = $owl.data('items-tablet-small');

				$owl.owlCarousel({
					items: itemsData,
					pagination: false,
					navigation: navigationData,
					autoPlay: autoPlayData,
					stopOnHover: stopOnHoverData,
					navigationText: ["", ""],
					itemsCustom: [
						[0, 1],
						[500, itemsTabletSmallData],
						[710, itemsTabletData],
						[992, itemsDesktopSmallData],
						[1199, itemsDesktopData]
					],
				});
			});
		},


		initBxSlider: function (options) {
			$(".enable-bx-slider").each(function (i) {
				var $bx = $(this);
				var pagerCustomData = $bx.data('pager-custom');
				var modeData = $bx.data('mode');
				var pagerSlideData = $bx.data('pager-slide');
				var modePagerData = $bx.data('mode-pager');
				var pagerQtyData = $bx.data('pager-qty');


				var realSlider = $bx.bxSlider({
					pagerCustom: pagerCustomData,
					mode: modeData,
				});
				if (pagerSlideData) {
					var realThumbSlider = $(pagerCustomData).bxSlider({
						mode: modePagerData,
						minSlides: pagerQtyData,
						maxSlides: pagerQtyData,
						moveSlides: 1,
						slideMargin: 20,
						pager: false,
						infiniteLoop: false,
						hideControlOnEnd: true,
						nextText: '<span class="fa fa-angle-down"></span>',
						prevText: '<span class="fa fa-angle-up"></span>'
					});
					linkRealSliders(realSlider, realThumbSlider, pagerCustomData);
					if ($(pagerCustomData + " a").length <= pagerQtyData) {
						$(pagerCustomData + " .bx-next").hide();
					}
				}
			});

			function linkRealSliders(bigS, thumbS, sliderId) {
				$(sliderId).on("click", "a", function (event) {
					event.preventDefault();
					var newIndex = $(this).data("slide-index");
					bigS.goToSlide(newIndex);
				});
			}
		},

		initTabs: function (options) {
			$(document).on('click', '.j-tab', function (e) {
				var to = $($(this).attr('data-to'));
				if (to.length > 0) {
					if (to.css('display') == 'none') {
						var tabs = to.parent().find('.j-tab');
						if (tabs.length > 0) {
							tabs.each(function (i, e) {
								if ($(e).hasClass('m-active')) {
									$(e).removeClass('s-lineDownCenter');
									$(e).removeClass('m-active');
								}
								var to2 = $($(e).attr('data-to'));
								if (to2.css('display') == 'block')
									to2.css('display', 'none');
							});
						}
						to.css('display', 'block');
						if (!(($(this).hasClass('owl-next')) || ($(this).hasClass('owl-prev'))))
							$(this).addClass('m-active s-lineDownCenter');
						else {
							$('.b-auto__main-toggle').each(function (i, e) {
								if ($(e).attr('data-to').replace('#', '') == to.attr('id')) {
									$(e).addClass('m-active s-lineDownCenter');
								}
							})
						}
					}
				}
				e.preventDefault();
			});
		},

		initCollapsible: function (options) {
			var collapse = $('.j-more').length;
			if (collapse) {
				$(document).on('click', '.j-more', function (e) {
					var inside = $(this).parent().parent().find('.j-inside');
					var span = $(this).find('span.fa');
					if (inside.length > 0) {
						span.toggleClass('fa-angle-left');
						span.toggleClass('fa-angle-down');
						$(this).parent().toggleClass('m-active');
						inside.toggleClass('m-active');
					}
					e.preventDefault();
				});
			}
		},

		initNumberCounter: function (options) {
			if ($('body').length) {
				var waypointScroll = $('.percent-blocks').data('waypoint-scroll');
				if (waypointScroll) {
					$(window).on('scroll', function () {
						var winH = $(window).scrollTop();
						$('.percent-blocks').waypoint(function () {
							$('.chart').each(function () {
								CharsStart();
							});
						}, {
							offset: '80%'
						});
					});
				}
			}

			function CharsStart() {
				$('.chart').easyPieChart({
					barColor: false,
					trackColor: false,
					scaleColor: false,
					scaleLength: false,
					lineCap: false,
					lineWidth: false,
					size: false,
					animate: 3000,
					onStep: function (from, to, percent) {
						$(this.el).find('.percent').text(Math.round(percent));
					}
				});
			}
		},

		initGoToTop: function (options) {
			// Show/Hide Button on Window Scroll event.
			$(window).on('scroll', function () {
				var fromTop = $(this).scrollTop();
				var display = 'none';
				if (fromTop > 650) {
					display = 'block';
				}
				$('#to-top').css({
					'display': display
				});
			});
			$("#to-top").smoothScroll();
		},

		scrolltop: function (options) {
			$('a.dropdown-toggle-rolunk').click(function () {
					$('html, body').animate({
						scrollTop: $("section.b-blog-rolunk").offset().top - 120
					}, 1000)
				}),
				$('a.dropdown-toggle-tenerife').click(function () {
					$('html, body').animate({
						scrollTop: $("section.b-best-tenerife").offset().top - 140
					}, 1000)
				}),
				$('a.dropdown-toggle-munkaim').click(function () {
					$('html, body').animate({
						scrollTop: $("section.b-featured-munkaim").offset().top - 140
					}, 1000)
				}),
				$('a.dropdown-toggle-elerhetosegek').click(function () {
					$('html, body').animate({
						scrollTop: $("div.b-features-elerhetosegek").offset().top - 140
					}, 1000)
				}),
				$('button.carousel-caption__btn-instructions').click(function () {
					$('html, body').animate({
						scrollTop: $("section.b-best-tenerife").offset().top - 140
					}, 1000)
				})
		},

		ClickAboutMe: function (options) {
			$(document).on('click', '.b-blog__posts-one-body-main-button', function (e) {
				$(".b-blog__posts-one-body-main-p").slideToggle();
				$(".b-blog__posts-one-body-main-button").hide();
			});
		},
		Mymenu: function (options) {
			$(document).on("scroll", function () {
				if ($(document).scrollTop() > 50) {
					$(".b-nav").removeClass("b-nav__bottom-shadow-off").addClass("b-nav__bottom-shadow-on");
				} else {
					$(".b-nav").removeClass("b-nav__bottom-shadow-on").addClass("b-nav__bottom-shadow-off");
				}
			});
		},
		Myvalami: function (options) {
			var btn = $(".mySlider__btn");

			btn.on("click", function () {
				$(".mySlider__item").first().clone().appendTo(".mySlider");
				$(".mySlider__image").first().css({
					transform: "rotateX(-180deg)",
					opacity: 0
				});
				setTimeout(function () {
					$(".mySlider__item").first().remove();
				}, 200);
			});
		},
	};

	Core.initialize();

})();