// 1) sideBar
// 2) parallax effect
// 3) swipeUp / swipeDown
// 4) clickAnimate

// -----------------------------------------------------------------------------------------------

// 1) sideBar ------------------------------------
$('.icon').on('click', function(){
	var menuActive = $('.menu-active'),
		menu = $('.menu'),
		activeLi = [$('.menu-active ul > li:nth-of-type(1)'), $('.menu-active ul > li:nth-of-type(2)'), $('.menu-active ul > li:nth-of-type(3)'), $('.menu-active ul > li:nth-of-type(4)')];
	menu.fadeOut('slow');
	menuActive.fadeIn('slow');
	activeLi[0].css({
		'animation-name':'activeLi',
		'animation-delay':'0.3s'
	});
	activeLi[1].css({
		'animation-name':'activeLi',
		'animation-delay':'0.4s'
	});
	activeLi[2].css({
		'animation-name':'activeLi',
		'animation-delay':'0.5s'
	});
	activeLi[3].css({
		'animation-name':'activeLi',
		'animation-delay':'0.6s'
	});

});

$('.icon-active').on('click', function(){
	var menuActive = $('.menu-active'),
		menu = $('.menu'),
		menuBg = $('.menu-active-bg');
	menu.fadeIn('slow').css({'animation-name':'none'});
	menuActive.fadeOut('slow');
});

// 2) parallax effect ------------------------------------
$(window).on('mousemove', function(e){
	var width = $(window).width(),
		height = $(window).height();

	var offsetX = 0.5 - e.pageX / width,
		offsetY = 0.5 - e.pageY / height;

	$('.parallax').each(function(i, el){
		var offset = parseInt($(el).data('offset'));

		var position = Math.round(offsetY * offset) + 'px ' + Math.round(offsetX * offset) + 'px';

		$(el).css({'margin':position});
	});
});

// 3) swipeUp / swipeDown ------------------------------------
$('.down-block').swipe({
	swipeDown: downSwipe,
	threshold: 0
});

$('.down-block').swipe({
	swipeUp: upSwipe,
	threshold: 0
});

function downSwipe(event){
	var screenOne = $('.screen-one'),
		downBlock = $('.down-block'),
		downBlockText = $('.down-block_text');
	screenOne.css({
		'transform': 'translateY(0)',
		'transition': 'all 1s'
	});
	downBlock.css({
		'position': 'static',
		'transform': 'rotate(0deg)'
	});
	downBlock.fadeOut();
	downBlock.fadeIn();
	downBlockText.fadeIn();
};

function upSwipe(event){
	var screenOne = $('.screen-one'),
		downBlock = $('.down-block'),
		downBlockText = $('.down-block_text');
	screenOne.css({
		'transform': 'translateY(-2000px)',
		'transition': 'all 2s'
	});
	downBlock.css({
		'position': 'absolute',
		'width': '100%',
		'top': '10px',
		'left': '0',
		'transform': 'rotate(180deg)'
	});
	downBlock.fadeOut();
	downBlock.fadeIn();
	downBlockText.fadeOut();
};

// 4) clickAnimate ------------------------------------
$('.screen-two__content').on('click', function(){
	var menu = $('.menu'),
		captionTitile = $('.article__caption_title'),
		captionText = $('.article__caption_text'),
		parallaxImg = [$('.p2'), $('.p3'), $('.p4')],
		macBook = $('.macbook'),
		screenTwoContent = [$('.screen-two__content:first-of-type'), $('.screen-two__content:last-of-type')],
		logo = $('.bottom-guru');

	menu.css({'animation-name':'menuClick'});
	captionTitile.css({
		'animation-name':'capContentClick',
		'animation-delay':'0.5s'
	});
	captionText.css({
		'animation-name':'capContentClick',
		'animation-delay':'0.7s'
	});
	parallaxImg[0].css({
		'opacity':'1',
		'animation-name':'parallaxClick',
		'animation-delay':'1.5s'
	});
	parallaxImg[1].css({
		'opacity':'1',
		'animation-name':'parallaxClick2',
		'animation-delay':'1.5s'
	});
	parallaxImg[2].css({
		'opacity':'1',
		'animation-name':'parallaxClick3',
		'animation-delay':'1.7s'
	});
	macBook.css({
		'opacity':'1',
		'animation-name':'macbookClick',
		'animation-delay':'1.9s'
	});
	screenTwoContent[0].css({
		'opacity':'1',
		'animation-name':'slideDownBtnRevers',
		'animation-delay':'1.5s'
	});
	screenTwoContent[1].css({
		'opacity':'1',
		'animation-name':'slideDownBtnRevers',
		'animation-delay':'1.7s'
	});
	logo.css({
		'animation-name':'logoClick',
		'animation-delay':'2.1s'
	});
});