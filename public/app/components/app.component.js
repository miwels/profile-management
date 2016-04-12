System.register(['angular2/core', 'angular2/router', './profile-list.component', './profile-detail.component', './profile-add.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, profile_list_component_1, profile_detail_component_1, profile_add_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (profile_list_component_1_1) {
                profile_list_component_1 = profile_list_component_1_1;
            },
            function (profile_detail_component_1_1) {
                profile_detail_component_1 = profile_detail_component_1_1;
            },
            function (profile_add_component_1_1) {
                profile_add_component_1 = profile_add_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = "Manage profiles";
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <h1>{{ title }}</h1>\n        <nav>\n            <a [routerLink]=\"['Profiles']\">Profiles</a> |\n            <a [routerLink]=\"['ProfileAdd']\">Add Profile</a>\n        </nav>\n        <router-outlet></router-outlet>\n    ",
                        styleUrls: ['app/css/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        // The providers array tells Angular to create a fresh instance of the HeroService when it creates a new HeroesComponent. The HeroesComponent can use that service to get heroes and so can every child component of its component tree.
                        providers: [router_1.ROUTER_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/profiles',
                            name: 'Profiles',
                            component: profile_list_component_1.ProfileListComponent
                        },
                        {
                            path: '/profile-add',
                            name: 'ProfileAdd',
                            component: profile_add_component_1.ProfileAddComponent
                        },
                        {
                            path: '/profile-add/:username',
                            name: 'ProfileEdit',
                            component: profile_add_component_1.ProfileAddComponent
                        },
                        {
                            path: '/profile/:username',
                            name: 'ProfileDetail',
                            component: profile_detail_component_1.ProfileDetailComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map