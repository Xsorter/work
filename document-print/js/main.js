$(function(){
	var pictureUrls = ['img/cover/2.jpg',
                       'img/cover/3.jpg',
                       'img/cover/4.jpg'
                      ], i=1;
	
    function headerChange(){
        if(i > (pictureUrls.length-1)){
			$('.header').animate({'background-position':'-1300px'},100,function(){
				i=1;
				$('.header').css({
                    'background':'url('+pictureUrls[0]+')',
                    'background-size':'cover'
                
                });
			});
			$('.header').animate({'background-position':'0'},100);
		}else{
			$('.header').animate({'background-position':'-1300px'},100,function(){
				$('.header').css({'background':'url('+pictureUrls[i]+')', 'background-size':'cover'});
				i++;
			});
			$('.header').animate({'background-position':'0'},100);
		}
    }
    var intervalCsaHead = setInterval(headerChange,3000);
});
