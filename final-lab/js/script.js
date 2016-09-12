$(function(){
    
$('.corner').corner();  //border radius for IE 8  
    
// JQuery-plugin-slider 
var id1 = $('#slider1');
var id2 = $('#slider2');
var id3 = $('#slider3');
slider(id1);
slider(id2);
slider(id3);

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
      


//ajax

$.ajax({
    type: 'GET',
    url:'https://pixabay.com/api/?key=2566046-80b4e8851317db138039b9381&q=ocean', 
    dataType: 'json',
    success: function(data){
    console.log('data', data); 
    
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
    }     
});



$(function(){
    $('#search-button').click(function(e){ 
    e.preventDefault();
    var query=$('#input').val(); // write query from input field
    $.ajax({ 
        url:'https://pixabay.com/api/?key=2566046-80b4e8851317db138039b9381&q='+query,
        dataType: 'jsonp',
        method: 'GET',
        success: function(data){
            console.log(data);
            var img = _.map(data.hits, 'webformatURL');
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

});

//ajax for IE8
$.ajaxTransport("+*", function( options, originalOptions, jqXHR ) {
    if(jQuery.browser.msie && window.XDomainRequest) {
        var xdr;
        return {
            send: function( headers, completeCallback ) {
                // Use Microsoft XDR
                xdr = new XDomainRequest();
                xdr.open("get", options.url);
                xdr.onload = function() {
                    if(this.contentType.match(/\/xml/)){
                        var dom = new ActiveXObject("Microsoft.XMLDOM");
                        dom.async = true;
                        dom.loadXML(this.responseText);
                        completeCallback(200, "success", [dom]);
                    }else{
                        completeCallback(200, "success", [this.responseText]);
                    }
                };
                xdr.ontimeout = function(){
                    completeCallback(408, "error", ["The request timed out."]);
                };
                xdr.onerror = function(){
                    completeCallback(404, "error", ["The requested resource could not be found."]);
                };
                xdr.send();
          },
          abort: function() {
              if(xdr)xdr.abort();
          }
        };
      }
    });
});


