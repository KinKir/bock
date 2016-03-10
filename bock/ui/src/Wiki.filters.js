angular.module('Wiki')

.filter('safeHTML', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})

.filter('underscore', function() {
    return function(val) {
        return val.split(' ').join('_');
    };
})

.filter('deUnderscore', function() {
    return function(val) {
        return val.split('_').join(' ');
    };
})

.filter('formatTitle', function() {
    return function(val) {
        return /(.*\/)?(.*)$/.exec(
            val.split('_').join(' ')
        )[2];
    };
})

.filter('readableTimestamp', function() {
    return function(val) {
        return moment(val).format('h:mma on MMMM D YYYY');
    };
})

.filter('trimSHA', function() {
    return function(val) {
        return val.substr(0, 7);
    };
})

;
