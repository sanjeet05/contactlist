angular.module('directives', [])

/* Directive to set the height of the tabs*/
.directive('fixedheightdetails', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var winHeight = $window.innerHeight;
            //console.log("winheight = " + (winHeight - 90));
            // elem.css('height', winHeight - 250 + 'px');
            elem.css('height', winHeight - 220 + 'px');
        }
    };
});
