import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Global } from './global.service';
import { identity } from 'rxjs';

@Injectable()
export class UserService{
    public url:String;
    public identity;
    public tokken;
    constructor(private _http: Http){
        this.url= Global.url;
    }
    register(user_to_register){
        let headers = new Headers({'Content-Type':'application/json'});
        let params = JSON.stringify(user_to_register);

        return this._http.post(this.url +'register', params, {headers : headers})
                         .map(res => res.json());
    }
    signUp(user_to_login, gettoken = null){

        if(gettoken !=null){
            user_to_login.gettoken = gettoken;
        }
        let headers = new Headers({'Content-Type':'application/json'});
        let params = JSON.stringify(user_to_login);
        return this._http.post(this.url+ 'login', params, {headers :headers})
                    .map(res => res.json());
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')); 

        if(identity != undefined){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getTokken(){
        let tokken = localStorage.getItem('tokken');
        if(tokken != undefined){
            this.tokken = tokken;
        }else{
            this.tokken = null;
        }
        return this.tokken;
    }

    updateUser(user_to_update){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': this.getTokken()
        });
        let params = JSON.stringify(user_to_update);

        return this._http.put(this.url + 'update-user/' + user_to_update._id, params, {headers : headers})
                        .map( res => res.json());
    }
}