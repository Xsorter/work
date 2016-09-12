$(function(){
	var $navicon = $('.header-navicon');
	$navicon.on('click', function(){
		var $dropdown = $('.header-menu-mobile');
		$dropdown.toggle();
		$dropdown.animate({margin: '10'}, 500);
		//$dropdown.slideToggle();
	});
});