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
    var ProfileAddComponent;
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
            ProfileAddComponent = (function () {
                // -- start constructor
                function ProfileAddComponent(_profileService, _routeParams) {
                    var _this = this;
                    this._profileService = _profileService;
                    this._routeParams = _routeParams;
                    // Initialize our Profile model with blank values so that nothing is displayed in the form
                    // This also prevents our component to throw an error due the fact that profile.name, profile.age, etc. 
                    // are not defined if the object is empty
                    this.profile = new profile_1.Profile('', '', 0, '');
                    this.submitted = false;
                    this.submittedMessage = false;
                    this.edit = false;
                    // This bit is a bit esotheric. This component accepts an optional parameter :username
                    // If we don't have this parameter we initialize our model with blank values (first condition)
                    // If there is a :username parameter (else) we call our service and search the user in the database. 
                    // If we find the user we populate our form (model) with the appropriate values. The good thing about
                    // doing this is that we don't need to create a new instance of the Profile class, Angular will
                    // populate all fields of our model for us.
                    // We define this bit in the constructor so that this operation is performed when the route is called.
                    // I assume that we can also do this using an OnInit but I haven't tried
                    var username = this._routeParams.get('username');
                    if (username) {
                        this._profileService.getProfile(username)
                            .subscribe(function (profile) {
                            // don't display unexisting profiles
                            if (profile.length) {
                                // assign the profile found to our template model and set the edit variable to true
                                // so that we replace the "Save" button of our template with an "Edit" button
                                // (each button is linked to a different event)
                                _this.profile = profile[0];
                                _this.edit = true;
                            }
                        }, function (error) { return _this.errorMessage = error; });
                    }
                }
                // -- end constructor
                // if set to true, displays a message in the same page with all the information we've sent to the server
                ProfileAddComponent.prototype.obSubmit = function () {
                    // this.submitted = true;
                };
                // Saves a profile in the database. We return an object with the following structure:
                // response = { 
                //    status: "OK|ERROR",
                //    message: "Some message"
                // }
                ProfileAddComponent.prototype.saveProfile = function () {
                    var _this = this;
                    this._profileService.saveProfile(this.profile)
                        .subscribe(function (response) { return _this.saveEditCallbackSuccess(response); }, function (error) { return _this.saveEditCallbackError(error); });
                };
                // This function edits a profile. The behaviour is pretty much the same of the saveProfile() method but
                // we are performing a PUT instead.
                // 
                // NOTE: Keep in mind that we user the username to search in the database so this field
                // Can't be edited!!!
                ProfileAddComponent.prototype.editProfile = function (profile) {
                    var _this = this;
                    this._profileService.editProfile(this.profile)
                        .subscribe(function (response) { return _this.saveEditCallbackSuccess(response); }, function (error) { return _this.saveEditCallbackError(error); });
                };
                // we can also replace this with an arrow function
                //
                // response  => {
                //      this.submitted = response.status == "OK" ? true : false;
                //      this.submittedMessage = response.message;
                //      }
                ProfileAddComponent.prototype.saveEditCallbackSuccess = function (response) {
                    this.submitted = response.status == "OK" ? true : false;
                    this.submittedMessage = response.message;
                };
                // we can also use an arrow function
                // error     => this.errorMessage = <any>error
                ProfileAddComponent.prototype.saveEditCallbackError = function (error) {
                    this.errorMessage = error;
                };
                ProfileAddComponent = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        selector: 'profile-add',
                        templateUrl: 'app/templates/profile-add.component.html',
                        providers: [profile_service_1.ProfileService]
                    }), 
                    __metadata('design:paramtypes', [profile_service_1.ProfileService, router_1.RouteParams])
                ], ProfileAddComponent);
                return ProfileAddComponent;
            }());
            exports_1("ProfileAddComponent", ProfileAddComponent);
        }
    }
});
//# sourceMappingURL=profile-add.component.js.map