import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Global } from './global.service';

@Injectable()
export class UserService{
    public url:String;
    constructor(private _http: Http){
        this.url= Global.url;
    }
    register(){
        return "Texto desde el servicio";
    }
}