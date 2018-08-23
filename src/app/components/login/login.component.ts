import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit, DoCheck{
      public title:String;
      public user: User;
      public identity;
      public tokken: string;
      public status: String;
      public alert:Boolean;
      
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService
            ){
              this.title = "Login";
              this.user = new User('','','','','','','ROLE_USER');
            }

  ngOnInit() {
  }

     //Este metodo 
  ngDoCheck(){
    this.tokken = this._userService.getTokken(); 
    this.identity = this._userService.getIdentity();
    //this.emailContacto = localStorage.getItem('emailContacto');
  }
  onSubmit(){
    //Conseguimos los datos del usuario en limpio
   this._userService.signUp(this.user).subscribe(
     response =>{
      this.identity = response.user; 
      //console.log(this.identity);
        if (!this.identity || !this.identity._id){
          this.status='Error, el usuario no se ha logueado correctamente';
          this.alert = false;
        }else{
          this.identity.password = '';
          localStorage.setItem('identity', JSON.stringify(this.identity));
            //Aca conseguimos el token del usuario
          this._userService.signUp(this.user, 'true').subscribe(
            response =>{
             this.tokken = response.tokken;
             //console.log(response);
               if (this.tokken.length <= 0){
                 alert("El tokken no se ha generado");
               }else{ //Mostramos el tokken
                localStorage.setItem('tokken', this.tokken);
                this.status='Success'
                this._router.navigate(['/']);
                this.alert = true;
               }
            },
            error =>{
             console.log(<any>error);
            }
          );
        }
     },
     error =>{
       var errmessage = <any>error;
       if(errmessage != null){
         var body = JSON.parse(error.body);
         this.status='Error';
         this.alert = false;
       }
     }
   );
  }

}
