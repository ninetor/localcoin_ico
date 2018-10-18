//--------------------------
// Ready                   |
//--------------------------

$(document).ready(function() {

	$(document).on('click', 'a[href="#"]', function(e){ e.preventDefault(); });


	// WOW Animate
	new WOW().init();


	//Fixed elements
	var urlLastSegment = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	
	$(document).scroll(function () {

		var bodyScroll = $(this).scrollTop();

		if (bodyScroll > 0) {
			$('#header').addClass('header-fixed');
		} else {
			$('#header').removeClass('header-fixed');
		}

		if (urlLastSegment == 'index.html' || urlLastSegment == '') {

			var	advPos           = $('#advantages').offset().top,
					tablePos         = $('.a-table').offset().top,
					tradingPos       = $('#trading').offset().top,
					tradingPosOffset = tradingPos - 137,
					roadmapPos       = $('#roadmap').offset().top;

			if ($(window).width() > 999) {

				if (bodyScroll >= advPos && bodyScroll < tradingPos) {
					$('#header').hide();
				} else $('#header').show();
		
				if (bodyScroll >= tablePos && bodyScroll < tradingPos) {
					$('.a-table-fixed').show();
				} else $('.a-table-fixed').hide();

			} else {

				if (bodyScroll >= advPos && bodyScroll < tradingPosOffset) {
					$('#header').hide();
				} else $('#header').show();
		
				if (bodyScroll >= tablePos && bodyScroll < tradingPosOffset) {
					$('.a-table-fixed').show();
				} else $('.a-table-fixed').hide();

			}

			// Rocket Fly
			if (bodyScroll >= roadmapPos - $(window).height() / 2) {
				$('.rocket').addClass('fly');
			}

		}

	});

	if (typeof $().stick_in_parent !== "undefined") {

		$('.a-table-fixed').stick_in_parent({
			parent: '.advantages__table-inner'
		});

	}



	// Popup-modal
	var scrollWidth = window.innerWidth - document.body.clientWidth;

	$('#buy_coin_header, #buy_coin_footer, #coin_hover_btn').on('click', function(e) {
		e.preventDefault();

		$('.popup-modal').fadeIn('fast');

		$('body').css({
			'overflow' : 'hidden',
			'margin-right' : scrollWidth + 'px'
		});
		$('.header-fixed').css('right', scrollWidth + 'px');

		return false;
	});

	$('.p-modal__close').on('click', function() {
		$('.popup-modal').hide();
		$('body').attr('style', '');
		$('.header-fixed').css('right', 0);
	});

	$(document).on('click touchstart', function(e) {
		var container = $('.p-modal');
		if (container.length && !$(e.target).closest(container).length) {
			$('.popup-modal').hide();
			$('body').attr('style', '');
			$('.header-fixed').css('right', 0);
		}
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.popup-modal').hide();
			$('body').attr('style', '');
			$('.header-fixed').css('right', 0);
		}
	});



	// Custom select
	$('.select').each(function(){
		var self = $(this);
		self.find('.select_hidden').val(self.find('.select_list li:first').attr('data-value'));
	});
	
	$('.select_in').on('click', function() {
		var self = $(this),
			select = self.closest('.select'),
			option_list = select.find('.select_list');
	
		if (option_list.is(':visible')){
			option_list.slideUp(200);
			select.removeClass('is-opened');
			self.find('.select_arrow').removeClass('is-active');
		} else {
			if ($('.select .select_list:visible').length){
				$('.select .select_list:visible').hide();
				$('.select .select_arrow').removeClass('is-active');
			}
			option_list.slideDown(200);
			select.addClass('is-opened');
			self.find('.arrow').addClass('is-active');
		}
	});
	
	$('.select_list li').on('click', function() {
		var self =  $(this),
				title = self.closest('.select').find('.select_in .select_title'),
				option = self.html();
	
		title.html(option);
		self.closest('.select').find('input[type=hidden]').val(self.attr('data-value'));
		self.closest('.select_list').find('li').removeClass('is-active');
		self.addClass('is-active');
		self.closest('.select_list').slideUp(200);
		self.closest('.select').removeClass('is-opened');
		self.closest('.select').find('.select_arrow').removeClass('is-active');
	});
	
	$(document).on('click', function(e) {
		if ($('.select .select_list:visible').length && !$(e.target).closest('.select').length){
			$('.select').removeClass('is-opened');
			$('.select .select_list').slideUp(200);
			$('.select .select_arrow').removeClass('is-active');
		}
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.select').removeClass('is-opened');
			$('.select .select_list').slideUp(200);

			$('.header__nav').slideUp();
			$('.hamburger').removeClass('is-active');

			$('.ps-circuit__item').removeClass('active');
		}
	});



	// Hamburger
	$('.hamburger').on('click', function() {
		$(this).toggleClass('is-active');
		$('.header__nav').slideToggle();

		return false;
	});

	$(document).on('click', function(e) {
		var container = $(".header__nav");
		if (container.length && !$(e.target).closest(container).length) {
			$('.header__nav').slideUp();
			$('.hamburger').removeClass('is-active');
		}
	});



	// Smooth scrolling
	if (urlLastSegment == 'index.html' || urlLastSegment == '') {

		$('.header__nav ul li a').on('click', function (e) {
			e.preventDefault();

			var _id  = $(this).attr('href'),
					headerHeight = $('.header').outerHeight(),
					top = $(_id).offset().top - headerHeight;

			$('html, body').animate({scrollTop: top}, 1000);

			$('.header__nav').slideUp();
			$('.hamburger').removeClass('is-active');
		});

		$('.footer__nav li a').on('click', function(e) {
			e.preventDefault();

			var _id  = $(this).attr('href'),
					top = $(_id).offset().top;

			if (_id == '#airDrop') {
				$('html, body').animate({scrollTop: top}, 1000);
				
				$('.main__tab-links ul li a').removeClass('active');
				$('.main__tab').removeClass('active');

				$('.main__tab-links ul li a[href="#airDrop"]').addClass('active');
				$(_id).addClass('active');
				mainChartInit();
				
			} else $('html, body').animate({scrollTop: top}, 1000);

		});

	}


	//Random Background
	var bgArr = $('.main__bg video').toArray(),
			rand  = Math.round(Math.random() * bgArr.length);

			if(rand == bgArr.length) rand -= 1;

	$(bgArr[rand]).addClass('visible');	




	
	if (urlLastSegment == 'index.html' || urlLastSegment == '') {

		// Pre-sale form
		coinChange({
			arrPrev: '.prev-coin',
			arrNext: '.next-coin',
			input: '.input-coin'
		});


		// Main Tabs
		tabThis({
			tabsLinks: '.main__tab-links ul li a',
			tabsConts: '.main__tab'
		});

		// Token info Tabs
		tabThis({
			tabsLinks: '.tokeninfo__tab-links ul li a',
			tabsConts: '.tokeninfo__tab'
		});


		// Token info charts
		// Allocation of shares
		tokenInfoChart({
			chartId: 'sharesChart',
			chartIdSelector: '#sharesChart',
			legendId: 'sharesChartLegend',
			legendItems: '#sharesChartLegend ul li',
			data: [10, 10, 80],
			bgColor: ['#46a6ff', '#57c2ff', '#5447eb']
		});

		// Use of funds
		tokenInfoChart({
			chartId: 'useOfFundsChart',
			chartIdSelector: '#useOfFundsChart',
			legendId: 'useOfFundsChartLegend',
			legendItems: '#useOfFundsChartLegend ul li',
			data: [90, 10],
			bgColor: ['#46a6ff', '#57c2ff']
		});

	}

}); // End Ready









//--------------------------
// Resize trigger          |
//--------------------------


$(window).resize(function() {

	var urlLastSegment = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

	if (urlLastSegment == 'index.html' || urlLastSegment == '') {

		var slider = $('.pre-sale__slider');

		if($(this).width() < 1000) {

			$('.advantages__table').mCustomScrollbar({
				axis: "x",
				autoDraggerLength: false,
				mouseWheel:{ enable: false },
				advanced:{ autoExpandHorizontalScroll:true },
				callbacks: {
					whileScrolling:function() {
						var l = this.mcs.left + 20;
						$('.a-table-fixed').css({ left: l });
					}
				}
			});

			$('.ps-circuit__item').removeClass('item-hover');

			if(!slider.hasClass('slick-initialized'))
				slider.slick({
					dots: true,
					adaptiveHeight: true
				});

			$('.download__item').removeClass('wow flipInY');

		} else {
			$('.advantages__table').mCustomScrollbar("destroy");
			$('.a-table-fixed').css({ left: 'auto' });

			$('.ps-circuit__item').addClass('item-hover');

			if(slider.hasClass('slick-initialized'))
				slider.slick('unslick');

				$('.download__item').addClass('wow flipInY');
		}

	}

}).trigger("resize");










//--------------------------
// Functions               |
//--------------------------


// Coin Change
function coinChange(e) {
	var arrPrev         = $(e.arrPrev),
			arrNext         = $(e.arrNext),
			input           = $(e.input),
			selectHidden    = input.find('.select_hidden'),
			selectListItems = input.find('.select-coin_list li'),
			title = input.find('.select-coin_in .select-coin_title'),
			currentVal;

	arrPrev.on('click', coinPrev);
	arrNext.on('click', coinNext);

	function coinPrev() {
		currentVal = selectHidden.val();

		if(currentVal > 1) {
			$(selectListItems[currentVal-1]).removeClass('is-active');
			currentVal -= 1;
			selectHidden.val(currentVal);
			$(selectListItems[currentVal-1]).addClass('is-active');
			$(selectListItems[currentVal-1]).html();
			title.html($(selectListItems[currentVal-1]).html());
		}
	}

	function coinNext() {
		currentVal = selectHidden.val();

		if(currentVal < selectListItems.length) {
			$(selectListItems[currentVal-1]).removeClass('is-active');
			currentVal = +currentVal + 1;
			selectHidden.val(currentVal);
			$(selectListItems[currentVal-1]).addClass('is-active');
			$(selectListItems[currentVal-1]).html();
			title.html($(selectListItems[currentVal-1]).html());
		}
	}
}



// Universal Tabs
function tabThis(t){
	$(t.tabsLinks).on('click', function(e){
		e.preventDefault();
		e.stopPropagation();

		var _id = $(this).attr('href');

		if(_id == '#airDrop') mainChartInit();
		//if(_id == '#shares') tokenInfoChart({ chartId: 'sharesChart' });
		//if(_id == '#useOfFunds') tokenInfoChart({ chartId: 'useOfFundsChart' });

		$(t.tabsLinks).removeClass('active');
		$(t.tabsConts).removeClass('active');

		$(this).addClass('active');
		$(_id).addClass('active');
	});
}



// Main Chart
function mainChartInit() {

	var xmlns = "http://www.w3.org/2000/svg",
	xlinkns = "http://www.w3.org/1999/xlink",
	select = function(s) {
		return document.querySelector(s);
	},
	selectAll = function(s) {
		return document.querySelectorAll(ds);
	},
	mainSVG = select('.mainSVG'),
	box = select('.box'),
	connector = select('#connector'),
	connectorGroup = select('#connectorGroup'),
	dragger = select('#dragger'),
	graphDot = select('#graphDot'),
	boxLabel = select('#boxLabel'),
	nullDot = select('#nullDot'),
	graphLine = select('#graphLine'),
	graphBezier = MorphSVGPlugin.pathDataToBezier(graphLine.getAttribute('d')),
	perc,
	boxPos = {
		x: 0,
		y: 0
	},
	//pt = mainSVG.createSVGPoint(),
	isPressed = false

	TweenMax.set('svg', {
		visibility: 'visible'
	});

	TweenMax.set([dragger, graphDot, nullDot], {
		transformOrigin: '50% 50%'
	});

	TweenMax.set([box], {
		transformOrigin: '50% 100%'
	});

	var tl = new TimelineMax({
		onUpdate: updateGraph,
		paused: true
	});

	tl.to([graphDot, dragger], 5, {
		bezier: {
			type: "cubic",
			values: graphBezier,
			autoRotate: false
		},
		ease: Linear.easeNone
	});

	function updateTimeline() {

		perc = nullDot._gsTransform.x / 770;
		//console.log(perc)

		//tl.progress(perc)  ;
		TweenMax.to(tl, 0.5, {
			progress: perc
		});

	}

	function updateGraph() {

		boxPos.x = dragger._gsTransform.x - (box.getBBox().width / 2);
		boxPos.y = dragger._gsTransform.y - (box.getBBox().height * 3);
		TweenMax.to(box, 1, {
			x: boxPos.x,
			y: boxPos.y,
			ease: Elastic.easeOut.config(0.7, 0.7)
		});

		boxLabel.textContent = parseInt(600 - dragger._gsTransform.y) - 118 //.toFixed(2);
	}

	function graphPress() {
		isPressed = true;

		TweenMax.to(dragger, 1, {
			attr: {
				r: 30
			},
			ease: Elastic.easeOut.config(1, 0.7)
		});

		TweenMax.to(connector, 0.6, {
			attr: {
				x1: dragger._gsTransform.x,
				x2: dragger._gsTransform.x,
				y1: boxPos.y,
				y2: dragger._gsTransform.y
			}
		});

		TweenMax.to(connector, 0.1, {
			attr: {
				x1: box._gsTransform.x + 40,
				x2: boxPos.x + 40,
				y1: box._gsTransform.y + 20,
				y2: graphDot._gsTransform.y
			},
			onComplete: function() {
				TweenMax.ticker.addEventListener('tick', connectLine);
				TweenMax.to(box, 0.8, {
					scale: 1,
					alpha: 1,
					y: boxPos.y,
					ease: Elastic.easeOut.config(1.2, 0.7)
				});
			}
		});
		TweenMax.ticker.removeEventListener("tick", connectLine);
	}

	function graphRelease() {

		isPressed = false;

		TweenMax.to(dragger, 0.3, {
			attr: {
				r: 15
			},
			ease: Elastic.easeOut.config(0.7, 0.7)
		});

		TweenMax.to(box, 0.2, {
			scale: 0,
			alpha: 0,
			y: boxPos.y + 30,
			ease: Anticipate.easeOut
		});

		

	}

	updateTimeline();
	tl.progress(0.000001);
	//updateGraph();
	//graphRelease();

	var introTl = new TimelineMax({
		onComplete: init,
		delay: 1
	});

	introTl.staggerFrom('#horizontalLinesGroup line', 1, {
			drawSVG: '100% 100%',
			alpha: 1,
			//scaleX:-1,
			transformOrigin: '0% 100%'
		}, 0.1)
		.staggerFrom('#graphTextGroup text', 1, {

			alpha: 0
		}, 0.1, '-=0.5')

	.from([graphDot, dragger], 0.71, {
			attr: {
				r: 0
			},
			ease: Power1.easeOut
		}, '-=1.3')
		.from(graphLine, 2.3, {
			drawSVG: '0% 0%',
			ease: Power3.easeInOut
		}, '-=1.73');

	/* // Get point in global SVG space
	function cursorPoint(e) {
		pt.x = e.clientX;
		pt.y = e.clientY;
		return pt.matrixTransform(mainSVG.getScreenCTM().inverse());
	}
	*/
	function connectLine() {

		if (isPressed) {
			TweenMax.set(connector, {
				attr: {
					x1: box._gsTransform.x + 40,
					x2: boxPos.x + 40,
					y1: box._gsTransform.y + 43,
					y2: graphDot._gsTransform.y
				}
			});

		} else {

			TweenMax.to(connector, 0.1, {
				attr: {
					x1: graphDot._gsTransform.x,
					x2: graphDot._gsTransform.x,
					y1: graphDot._gsTransform.y,
					y2: graphDot._gsTransform.y
				}
			});

		}

	}

	function init() {

		Draggable.create(nullDot, {
			type: 'x',
			trigger: dragger,
			onPress: graphPress,
			bounds: {
				minX: 0,
				maxX: 770
			},
			zIndexBoost:false,
			onDrag: updateTimeline,
			onRelease: graphRelease,
			
			//throwProps:true,
			onThrowUpdate: updateTimeline
				//snap:[0,200, 400, 700, 770]
		});
		TweenMax.ticker.addEventListener('tick', connectLine);
		graphRelease();
		
	}

}


// Token info chart
function tokenInfoChart(c) {

	var ctx = document.getElementById(c.chartId);
	var myChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
					datasets: [{
							label: '# of Votes',
							data: c.data,
							backgroundColor: c.bgColor,
							hoverBackgroundColor: [
								'#ffffff',
								'#ffffff',
								'#ffffff',
								'#ffffff'
							],
							borderWidth: 0,
							shadowColor: 'rgba(0, 0, 0, 1)',
							shadowOffsetX: 0,
							shadowOffsetY: 15,
							shadowBlur: 30
					}]
			},
			options: {
					cutoutPercentage: 68,
					layout: {
							padding: {
									left: 20,
									right: 20,
									top: 20,
									bottom: 40
							}
					},
					scales: {
							yAxes: [{
									ticks: {
										display: false
									},
									gridLines: {
										display:false,
										drawTicks: false,
										drawBorder:false
                	}
							}],
							xAxes: [{
								ticks: {
									display: false
								},
								gridLines: {
									display:false,
									drawTicks: false,
									drawBorder:false
								}
						}]
					},
					legend: {
							display: false
					},
					tooltips: {
						enabled: false
					},
					onHover: function(e) {
						var point = this.getElementAtEvent(e);
						//console.log(point);
						if (point.length) e.target.style.cursor = 'pointer';
						else e.target.style.cursor = 'default';
					}
			}
	});

	// Highlight Doughnut Segment on Legend Hover
	var legendItems = $(c.legendItems);

	$(legendItems).each(function(index, item) {
		$(item).on('mouseenter', function() {
			var itemVal = $(this).find('a').data('value');

			highlightSegment(myChart, index, true);
			$(c.legendItems).removeClass('active');
			$(this).addClass('active');
			$('.chart-item-value').html(itemVal);
		});
		$(item).on('mouseleave', function() {
			highlightSegment(myChart, index, false);
			$(c.legendItems).removeClass('active');
			$('.chart-item-value').html('');
		});
	});

	function highlightSegment(chart, index, isHighlight) {
		var activeSegment = chart.getDatasetMeta(0).data[index];

		if (isHighlight) {
			chart.updateHoverStyle([activeSegment], null, true);
		} else {
			chart.updateHoverStyle([activeSegment], null, false);
		}
		chart.draw();
	}

	// Highlight Legend Hover on Doughnut Segment
	$(c.chartIdSelector).on('mousemove mouseout',function(e){
		var activeSegment = myChart.getElementAtEvent(e);
		pieChartHoverBreakout(this, activeSegment, e);
	});

	var currentBreakoutIndex = null;
	function pieChartHoverBreakout(chart, activeSegment, eventType) {		

		var legendItems = $(chart).closest('.tokeninfo__tab').find('.tokeninfo__chart-legend ul li');
		var segmentIndex = (activeSegment.length && (typeof activeSegment[0]._index != 'undefined' && activeSegment[0]._index !== null)) ? activeSegment[0]._index : -1;
		var breakout = (eventType.type === 'mousemove') ? true : false;
		if (currentBreakoutIndex != segmentIndex) {
				if (breakout && segmentIndex >= 0) {
					currentBreakoutIndex = segmentIndex;
					var targetSegment = legendItems.get(segmentIndex);
					var targetSegmentValue = $(targetSegment).find('a').data('value');
					$(legendItems).removeClass('active');
					$(targetSegment).addClass('active');
					$('.chart-item-value').html(targetSegmentValue);
				} else {
					currentBreakoutIndex = null;
					legendItems.removeClass('active');
					$('.chart-item-value').html('');
				}
			}

	}


}