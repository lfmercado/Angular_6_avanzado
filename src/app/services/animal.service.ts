import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
    getAnimals(){
        return this._http.get(this.url + 'animals').map( res => res.json());
    }
    getAnimal(id){
        return this._http.get(this.url + 'animal/'+id).map( res => res.json());
    }

    editAnimal(tokken, id, animal){
        console.log(animal);
        let params = JSON.stringify(animal);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': tokken
        });
        console.log(params);
        return this._http.put(this.url + 'update-animal/' + id, params, {headers:headers})
                        .map(res => res.json());
    }

    deleteAnimal(tokken, id){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': tokken
        });
        let options = new RequestOptions({headers:headers});
        return this._http.delete(this.url + 'animal/' + id, options)
                    .map(res => res.json());
    }
}