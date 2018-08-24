import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Global } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements DoCheck, OnInit{
  title = 'app';
  public titulo: string;
  public emailContacto:string;
  public identity;
  public tokken;
  public global;
  constructor(
    private _userService: UserService
            ){
              this.global = Global.url;
  }
  //Este metodo 
  ngDoCheck(){
    this.tokken = this._userService.getTokken(); 
    this.identity = this._userService.getIdentity();
    //this.emailContacto = localStorage.getItem('emailContacto');
  }
  ngOnInit(){
    this.titulo ="¡Curso De Angular Avanzado!";
    this.tokken = this._userService.getTokken(); 
    this.identity = this._userService.getIdentity();
    console.log(this.tokken);
    console.log(this.identity);
  }
  cerrarSesion(){
    localStorage.clear();
  }
  


}
