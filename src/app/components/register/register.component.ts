import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { Global } from '../../services/global.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public title:String;
  public message:String;
  public alert:boolean;
  constructor(  
              private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService
            ){
              this.title = "Registro";
              this.user = new User('','','','','','','ROLE_USER');
            }

  ngOnInit() {
  }
  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
        response =>{
          console.log(response);
          if(response.message == 'Se ha guardado el usuario con exito!!'){
          this.alert = true;
          this.message = 'El registro se realizo conrrectamente, identificate con ' + this.user.email;
          this.user = new User('','','','','','','ROLE_USER');
          registerForm.reset();
          }else{
            this.alert= false;
            this.message = response.message;
        }
        
      },
        error =>{
          console.log(<any>error);
        }
    );
  }

}
