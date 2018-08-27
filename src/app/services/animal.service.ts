import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Global } from './global.service';
import { identity } from 'rxjs';


@Injectable()
export class AnimalService{
    public url:String;
    public identity;
    public tokken;
    constructor(private _http: Http){
        this.url= Global.url;
    }

    addAnimal(tokken, animal){
        let params = JSON.stringify(animal);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': tokken
        })
        return this._http.post(this.url + 'save-animal', params , {headers:headers})
                        .map(res => res.json());
    }
}