'use strict'

angular.module('admin',[])
    .component('admin', {
        templateUrl: './angular/admin/admin.template.html',
        controller: function adminCtrl ($scope){
            console.log('test')
        }
    })