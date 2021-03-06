angular.module("demo", ["ngRoute", "dndLists", "ngAnimate", "ui.bootstrap", 'angular-confirm'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl:'view/home.html',
                controller: 'HomeController'
            })
            .when('/productBacklog', {
                templateUrl: 'view/productBacklog.html',
                controller: 'ProductBacklogCtrl'
            })
            .when('/kanban', {
                templateUrl: 'view/kanban/kanban-frame.html',
                controller: 'KanbanController'
            })
            .when('/dialog', {
                templateUrl: 'view/dialog.html',
                controller: 'ModalDemoCtrl'
            })
            .when('/fillSprint', {
                templateUrl: 'view/fillSprint.html',
                controller: 'FillSprintCtrl'
            })
            .when('/testeAceitacao', {
                templateUrl: 'view/testeAceitacao.html',
                controller: 'TesteAceitacao'
            })
            .when('/sprintBurndown', {
                templateUrl: 'view/sprintBurndown.html',
                controller: 'SprintBurndown'
            })
            .when('/sprintReview', {
                templateUrl: 'view/sprintReview.html',
                controller: 'SprintReview'
            })
            .when('/licoesAprendidas', {
                templateUrl: 'view/licoesAprendidas.html',
                controller: 'LicoesAprendidasCtrl'
            })
            .when('/release', {
                templateUrl: 'view/release.html',
                controller: 'ReleaseCtrl'
            })
            .when('/',{redirectTo: '/home'})
            .otherwise({redirectTo: '/home'});
    })
    .directive('navigation', function($rootScope, $location) {
        return {
            template: '<li ng-repeat="option in options" ng-class="{active: isActive(option)}">' +
                      '    <a ng-href="{{option.href}}">{{option.label}}</a>' +
                      '</li>',
            link: function (scope, element, attr) {
                scope.options = [
                    {label: "Nested Containers", href: "#/nested"},
                    {label: "Simple Demo", href: "#/simple"},
                    {label: "Item Types", href: "#/types"},
                    {label: "Advanced Demo", href: "#/advanced"},
                    {label: "Multiselection", href: "#/multi"},
                    {label: "Github", href: "https://github.com/marceljuenemann/angular-drag-and-drop-lists"}
                ];
                scope.isActive = function(option) {
                    return option.href.indexOf(scope.location) === 1;
                };
                $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
                    scope.location = $location.path();
                });
            }
        };
    });
