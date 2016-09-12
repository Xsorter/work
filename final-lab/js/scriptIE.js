$(function(){
    $.ajax({ 
        url:'https://pixabay.com/api/?key=2566046-80b4e8851317db138039b9381&q=ocean',
        dataType: 'jsonp',
        method: 'GET',
        success: function(data){
            console.log(data);
            var img = _.map(data.hits, 'webformatURL');

            function shuffle(a) {   //picture shuffler
                var j, x, i;
                for (i = a.length; i; i -= 1) {
                    j = Math.round(Math.random() * i);
                    x = a[i - 1];
                    a[i - 1] = a[j];
                    a[j] = x;
                }
            }
            
            shuffle(img);
            
            var item = $('.grid-wrapper-box');

            item.each(function(value){  
                $(this).css('backgroundImage', 'url('+img[value]+')');  
        });
    },
        error: function(){
            alert('Картинок с таким названием не найдено');
        }      
    });
});