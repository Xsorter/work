$(function(){
    

// JQuery-plugin-slider 
	var id1 = $('#slider1');
	slider(id1);

	function slider(idSlider){
    
    	var elWrap = idSlider,
        	el =  elWrap.find('.img'),
       		indexImg = 1,
        	indexMax = el.length,
        	phase = 3000;
    
    	function change () {
        	el.fadeOut(500);
        	el.filter(':nth-child('+indexImg+')').fadeIn(500);
    	}   
        
    	elWrap.append('<span class="next"></span><span class="prev"></span>');
    	var btnNext = $('span.next'),
        	btnPrev = $('span.prev');
        
    	btnNext.click(function() {
        	indexImg++;
        	if(indexImg > indexMax) {
            	indexImg = 1;
        	}
        	change ();
    	});
    	btnPrev.click(function() {
        	indexImg--;
        	if(indexImg < 1) {
            	indexImg = indexMax;
        	}
        	change ();
    	}); 
	}

	// mobile-menu event
	var $navicon = $('.header-navicon');
	$navicon.on('click', function(){
		var $dropdown = $('.header-menu-mobile');
		//$dropdown.toggle();	
		$dropdown.slideToggle();
	});
});