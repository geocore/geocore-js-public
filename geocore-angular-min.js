(function(){if(!angular){return}var b=angular.module("geocore",[]);function a(d,c,e){return function(){var f=d.defer();f.x=e.toString();arguments=[].splice.call(arguments,0);e.apply(undefined,arguments.concat([function(h,g){c.$apply(function(){if(!g){f.reject(h)}return f.resolve(g)})}]));return f.promise}}b.factory("Places",["$q","$rootScope",function(e,d){var c={};c.in_bound=a(e,d,geocore.places.in_bound);c.in_rect=a(e,d,geocore.places.in_rect);c.nearest=a(e,d,geocore.places.nearest);return c}]);b.factory("Users",["$q","$rootScope",function(e,d){var c={};return c}]);b.factory("Items",["$q","$rootScope",function(e,d){var c={};return c}])})(angular);