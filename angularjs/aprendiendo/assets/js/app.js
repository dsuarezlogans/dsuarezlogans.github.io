angular.module("MyApp", ["LocalStorageModule"])
    .controller("Controlador", ["$scope", function (s) {
        s.apellido = "Bienvenido a";
        s.name = "Hola Danny";
        setTimeout(function () {
            s.$apply(function () {
                s.name = "My App";
                s.apellido = "con AngulasJs";
            });
        }, 2000);

}])
    .controller("ComentarioController", ["$scope", function (s) {
        s.nComentario = {};
        s.comentarios = [
            {
                comentario: "Hola Mundo!!!",
                autor: "josefo"
        },
            {
                comentario: "Soy Segundo",
                autor: "segundon"
        }
    ];
        s.addComentario = function () {
            s.comentarios.push(s.nComentario);
            s.nComentario = {};
        }
}])
    .controller("JsonController", ['$scope', '$http', function (s, h) {
        s.posts = [];
        s.nPost = {};
        s.loading = true;
        h.get("http://jsonplaceholder.typicode.com/posts")
            .success(function (data) {
                s.posts = data;
                s.loading = false;
            })
            .error(function (err) {
                s.loading = false;
            });

        s.addPost = function () {
            h.post("http://jsonplaceholder.typicode.com/posts", {
                    title: s.nPost.title,
                    body: s.nPost.body,
                    userId: 1
                })
                .success(function (data, status, headers, config) {
                    console.log(data);
                    s.posts.push(s.nPost);
                    s.nPost = {};
                })
                .error(function (err, status, headers, config) {
                    console.log(err);
                });
        };
}])
    .controller("ToDoController", ['$scope', 'localStorageService', function (s, ls) {
        s.precio = 200;
        if (ls.get("todolist")) {
            s.todo = ls.get("todolist");
        } else {
            s.todo = [];
        }
        s.$watchCollection("todo", function () {
            ls.set("todolist", s.todo);
        });
        s.addActiv = function () {
            s.todo.push(s.newActiv);
            s.newActiv = {};
        };
}])
    .filter('monedaBs', function () {
        return function (precio) {
            return "BsF" + precio;
        }
    })
    .factory('ToDoService', ['localStorageService', function (ls) {
        var toDoService = {};
        toDoService.key = "todolist";
        if (ls.get(toDoService.key)) {
            toDoService.activities = ls.get(toDoService.key);
        } else {
            toDoService.activities = [];
        }
        toDoService.add = function (newAct) {
            toDoService.activities.push(newAct);
            toDoService.updLocalStorage();
        };
        toDoService.updLocalStorage = function () {
            console.log(toDoService.getAll());
            ls.set(toDoService.key, toDoService.activities);
            console.log(toDoService.getAll());
        };
        toDoService.clean = function () {
            toDoService.activities = [];
            toDoService.updLocalStorage();
            return toDoService.getAll();
        };
        toDoService.getAll = function () {
            return toDoService.activities;
        };
        toDoService.removeItem = function (item) {
            toDoService.activities = toDoService.activities.filter(function (activity) {
                return activity !== item;
            });
            toDoService.updLocalStorage();
            return toDoService.getAll();
        };
        return toDoService;
}])
    .controller("ToDoSerController", ['$scope', 'ToDoService', function (s, tds) {
        s.toDo = tds.getAll();
        s.newAct = {};
        s.addAct = function () {
            tds.add(s.newAct);
            s.newAct = {};
            console.log(tds.getAll());
        };
        s.removeAct = function (item) {
            s.toDo = tds.removeItem(item);
        };
        s.clean = function () {
            s.toDo = tds.clean();
        };
}]);