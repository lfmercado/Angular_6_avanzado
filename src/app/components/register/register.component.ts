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
  onSubmit(){
    console.log(this.user);
  }

}
