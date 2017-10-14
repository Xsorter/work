'use sctrict'

angular.module('content', [])
    .component('content', {
        templateUrl: './angular/content/content.template.html',
        controller: function contentCtrl (){
            console.log('test2')
        }
    })
