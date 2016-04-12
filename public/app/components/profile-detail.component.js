System.register(['angular2/core', 'angular2/router', './profile', '../services/profile.service'], function(exports_1, context_1) {
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
    var core_1, router_1, profile_1, profile_service_1;
    var ProfileDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (profile_service_1_1) {
                profile_service_1 = profile_service_1_1;
            }],
        execute: function() {
            ProfileDetailComponent = (function () {
                function ProfileDetailComponent(_router, _routeParams, _profileService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._profileService = _profileService;
                }
                ProfileDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var username = this._routeParams.get('username');
                    this._profileService.getProfile(username)
                        .subscribe(function (profile) { return _this.profile = profile[0]; }, function (error) { return _this.errorMessage = error; });
                };
                // Lets define an method to go back to the previous page. It's a function
                // that returns a type void (nothing) and uses the router to take the user
                // to a different location defined in our app.component.js
                ProfileDetailComponent.prototype.onBack = function () {
                    this._router.navigate(['Profiles']);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', profile_1.Profile)
                ], ProfileDetailComponent.prototype, "profile", void 0);
                ProfileDetailComponent = __decorate([
                    core_1.Component({
                        // selector: 'profile-detail', <- we don't need selector unless we are implementing the
                        //                                directive in a template/view
                        templateUrl: 'app/templates/profile-detail.component.html',
                        providers: [profile_service_1.ProfileService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, profile_service_1.ProfileService])
                ], ProfileDetailComponent);
                return ProfileDetailComponent;
            }());
            exports_1("ProfileDetailComponent", ProfileDetailComponent);
        }
    }
});
//# sourceMappingURL=profile-detail.component.js.map