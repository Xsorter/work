$(function(){
	
	$('.focus-document').on('mouseover', function(){
		$('.hover-document').css("visibility", "hidden");
		$('.modal-document').css("visibility", "visible");	
	});
	$('.focus-document').on('mouseleave', function(){
		$('.hover-document').css("visibility", "visible");
		$('.modal-document').css("visibility", "hidden");
	});

	$('.focus-optimization').on('mouseover', function(){
		$('.hover-optimization').css("visibility", "hidden");
		$('.modal-optimization').css("visibility", "visible");	
	});
	$('.focus-optimization').on('mouseleave', function(){
		$('.hover-optimization').css("visibility", "visible");
		$('.modal-optimization').css("visibility", "hidden");	
	});

});