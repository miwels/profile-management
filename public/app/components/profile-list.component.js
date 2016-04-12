System.register(['angular2/router', 'angular2/core', '../services/profile.service'], function(exports_1, context_1) {
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
    var router_1, core_1, profile_service_1;
    var ProfileListComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profile_service_1_1) {
                profile_service_1 = profile_service_1_1;
            }],
        execute: function() {
            ProfileListComponent = (function () {
                function ProfileListComponent(_router, _profileService) {
                    this._router = _router;
                    this._profileService = _profileService;
                    this.deleted = false;
                }
                ProfileListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._profileService.getProfiles()
                        .subscribe(function (profiles) { return _this.profiles = profiles; }, function (error) { return _this.errorMessage = error; });
                };
                // ['ProfileDetal'] is the name of a route that we have defined in our app.component.ts
                // same thing happens when we define a route in our view:
                //
                // <a [routerLink]="['Profiles']">All Profiles</a>
                //
                // or
                //
                // <a [routerLink]="['ProfileDetail', {id: profile.username}]">View profile</a>
                //
                // Which is equivalent to using the code below with a (click)="gotoDetail(profile)" event
                //
                // in the previous example, 'Profiles' and 'ProfileDetail' are the names of a route
                ProfileListComponent.prototype.gotoDetail = function (profile) {
                    this.deleted = false;
                    this._router.navigate(['ProfileDetail', { username: profile.username }]);
                };
                ProfileListComponent.prototype.delete = function (profile) {
                    var _this = this;
                    this._profileService.deleteProfile(profile)
                        .subscribe(function (profile) {
                        if (profile.ok === 1) {
                            // call the ngOnInit() method to update the list of profiles
                            // in our model and to update the view.
                            // I don't know if this is the best way of doing it but it
                            // works, but this means that we have to perform another ajax
                            // request. Maybe we should loop through the array of profiles
                            // and delete the profile that has been removed. This would be
                            // more efficient if we have a large list of profiles.
                            _this.ngOnInit();
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                ProfileListComponent.prototype.edit = function (profile) {
                    this._router.navigate(['ProfileEdit', { username: profile.username }]);
                };
                ProfileListComponent = __decorate([
                    core_1.Component({
                        selector: 'profile-list',
                        templateUrl: 'app/templates/profile-list.component.html',
                        providers: [profile_service_1.ProfileService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, profile_service_1.ProfileService])
                ], ProfileListComponent);
                return ProfileListComponent;
            }());
            exports_1("ProfileListComponent", ProfileListComponent);
        }
    }
});
//# sourceMappingURL=profile-list.component.js.map