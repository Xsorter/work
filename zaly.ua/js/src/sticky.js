$(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1){
            $('.header-navigation').addClass("header-navigation-sticky");
            $('.header-navigation__city-search').addClass("header-navigation__city-search-sticky");
        }
        else{
            $('.header-navigation').removeClass("header-navigation-sticky");
            $('.header-navigation__city-search').removeClass("header-navigation__city-search-sticky");
        }
    });
});