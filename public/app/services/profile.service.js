System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var ProfileService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            ProfileService = (function () {
                function ProfileService(_http) {
                    this._http = _http;
                    this._profilesUrl = '/api/profile/get';
                    this._messageUrl = '/api/message/post';
                    this._saveProfileUrl = '/api/profile/post';
                    this._deleteProfileUrl = '/api/profile/delete';
                }
                // we might have a data property sometimes:
                // res => res.json().data
                // we can use the .do() function to debug our application and check what's
                // recevied without affecting the normal flow of the application
                ProfileService.prototype.getProfiles = function () {
                    return this._http.get(this._profilesUrl)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                // Get one single profile. Useful if we need to populate the information of a model
                ProfileService.prototype.getProfile = function (username) {
                    return this._http.get(this._profilesUrl + '/' + username)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log('Profile detail: ' + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                // Save a new profile. We perform a POST method to do this.
                ProfileService.prototype.saveProfile = function (profile) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.post(this._saveProfileUrl, JSON.stringify(profile), {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                // Edit a profile. The end point is the same we use for saving a profile but performing a PUT instead
                ProfileService.prototype.editProfile = function (profile) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.put(this._saveProfileUrl, JSON.stringify(profile), {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                // Deletes a profile from the database. Perfroms a DELETE in the specified end point.
                ProfileService.prototype.deleteProfile = function (profile) {
                    return this._http.delete(this._deleteProfileUrl + '/' + profile.username)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ProfileService.prototype.handleError = function (error) {
                    console.log(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ProfileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProfileService);
                return ProfileService;
            }());
            exports_1("ProfileService", ProfileService);
        }
    }
});
//# sourceMappingURL=profile.service.js.map