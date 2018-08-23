import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Global } from './global.service';
import { promise } from 'protractor';

@Injectable()
export class UploadService{
     public url: string;

     constructor(
         private _http: Http
     ){
        this.url = Global.url;
     }

     makeFileRequest(url: string, params: Array<string>, files: Array<File>, tokken: string, name:string){
        return new Promise( function(resolve, reject) {
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            for (let index = 0; index < files.length; index++) {
                formData.append(name, files[index], files[index].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', tokken);
            xhr.send(formData);
        });
     }
}