$(function(){
	var $navicon = $('.header-navicon');
	$navicon.on('click', function(){
		var $dropdown = $('.header-navigation-menu-mobile');
		$dropdown.toggle();	
		//$dropdown.slideToggle();
	});
});