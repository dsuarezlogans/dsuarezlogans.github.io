angular.module('App')
    .factory('PostResource', ['$resource', function (r) {
        return r("http://jsonplaceholder.typicode.com/posts/:id", {
            id: "@id"
        }, {
            update: {
                method: 'PUT'
            }

        });
}])
    .factory('UserResource', ['$resource', function (r) {
        return r("http://jsonplaceholder.typicode.com/users/:id", {
            id: "@id"
        }, {
            update: {
                method: 'PUT'
            }

        });
}]);