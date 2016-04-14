// Source:
// https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/
System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var PictureAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            PictureAddComponent = (function () {
                function PictureAddComponent() {
                    this.fileUploaded = false;
                    this.filesToUpload = [];
                }
                PictureAddComponent.prototype.upload = function () {
                    var _this = this;
                    this.makeFileRequest("/api/upload", [], this.filesToUpload)
                        .then(function (result) {
                        console.log(result);
                        if (result) {
                            _this.fileUploaded = true;
                        }
                    }, function (error) { return console.log(error); });
                };
                // This method is triggered when we detect an change in our input
                // We are logging the "files" property which contains the files
                PictureAddComponent.prototype.fileChangeEvent = function (fileInput) {
                    this.filesToUpload = fileInput.target.files;
                };
                // This method creates a set of key-value pars (FormData) to be sent
                // using AJAX. 
                // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
                // https://developer.mozilla.org/es/docs/Web/Guide/Usando_Objetos_FormData
                // We are going to loop through every file in the File array and append
                // each file to the XHR request that we’ll later send.
                PictureAddComponent.prototype.makeFileRequest = function (url, params, files) {
                    return new Promise(function (resolve, reject) {
                        var formData = new FormData();
                        var xhr = new XMLHttpRequest();
                        for (var i = 0; i < files.length; i++) {
                            formData.append("uploads[]", files[i], files[i].name);
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    resolve(JSON.parse(xhr.response));
                                }
                                else {
                                    reject(xhr.response);
                                }
                            }
                        };
                        xhr.open("POST", url, true);
                        xhr.send(formData);
                    });
                };
                PictureAddComponent = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        selector: 'picture-add',
                        templateUrl: 'app/templates/picture-add.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PictureAddComponent);
                return PictureAddComponent;
            }());
            exports_1("PictureAddComponent", PictureAddComponent);
        }
    }
});
//# sourceMappingURL=picture-add.component.js.map