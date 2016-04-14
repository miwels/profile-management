// Source:
// https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/

import {Component, Injectable} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Injectable()

@Component({
    selector: 'picture-add',
    templateUrl: 'app/templates/picture-add.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class PictureAddComponent {
    filesToUpload: Array<File>;
    fileUploaded: boolean = false;
    
    constructor() {
        this.filesToUpload = [];
    }
    
    upload() {
        this.makeFileRequest("/api/upload", [], this.filesToUpload)
            .then(result => {
                console.log(result);
                if(result) {
                    this.fileUploaded = true;
                }    
            },
            error  => console.log(error));
    }
    
    // This method is triggered when we detect an change in our input
    // We are logging the "files" property which contains the files
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
    
    // This method creates a set of key-value pars (FormData) to be sent
    // using AJAX. 
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    // https://developer.mozilla.org/es/docs/Web/Guide/Usando_Objetos_FormData
    // We are going to loop through every file in the File array and append
    // each file to the XHR request that we’ll later send.

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } 
                    else {
                        reject(xhr.response);    
                    }
                }
            }
            
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
}