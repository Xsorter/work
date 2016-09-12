$(function () {
	$('.jcarousel').jcarousel();

	$('.jcarousel-pagination').jcarouselPagination({
        item: function(page) {
            return '<a href="#' + page + '">' + '<div class="round">' + page+ '</div>' + '</a>';
    }
    });
    $(".round:first").addClass("active");
    $('.round').on('click', function() {
    	    $(this).addClass('active');
    	    $('.round').not($(this)).removeClass('active');
  
        });
  
   function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    };
 
    $('.accordion-section-tittle').click(function(e) {
        var currentAttrValue = $(this).attr('href');
        close_accordion_section();
       
            $(this).addClass('active');
            $('.accordion-section-tittle').not($(this)).removeClass('active');
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
       e.preventDefault();
       });
 
        
 

})