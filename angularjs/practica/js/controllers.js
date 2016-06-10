angular.module("App")
    .controller('MainController', ['$scope', 'PostResource', 'UserResource', 'LxNotificationService', function (s, pr, ur, n) {
        s.posts = pr.query();
        s.users = ur.query();
        s.removePost = function (post) {
            pr.delete({
                id: post.id
            }, function (data) {
                console.log(data);
                n.success('El Post: ' + post.title.italics().fontcolor("red-400") + ' Borrado con Exito');
            });
            s.posts = s.posts.filter(function (element) {
                return element.id !== post.id;
            });
        };

}])
    .controller('PostController', ['$scope', 'PostResource', '$routeParams', '$location', 'LxNotificationService', function (s, pr, p, l, n) {
        s.title = "Editar Post"
        s.post = pr.get({
            id: p.id
        });
        s.savePost = function () {
            pr.update({
                id: s.post.id
            }, {
                data: s.post
            }, function (data) {
                console.log(data);
                n.success('Post Modificado con Exito!');
                l.path('/post/' + s.post.id);
            });
        };
}])
    .controller('NewPostController', ['$scope', 'PostResource', 'LxNotificationService', function (s, pr, n) {
        s.title = "Crear Post"
        s.post = {};
        s.savePost = function () {
            pr.save({
                data: s.post
            }, function (data) {
                console.log(data);
                n.success('Post Creado con Exito!');
            });
        };
}]);