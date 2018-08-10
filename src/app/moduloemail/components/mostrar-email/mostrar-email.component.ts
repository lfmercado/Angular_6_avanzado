import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'mostrar-email',
  templateUrl:  './mostrar-email.component.html',
  styleUrls: ['./mostrar-email.component.css']
})
export class MostrarEmailComponent implements OnInit,DoCheck {
  public title: string;
  public emailContacto:string;
  constructor() { 
    this.title ="Mostrar Email";
  }

   ngOnInit() {
    this.emailContacto = localStorage.getItem('emailContacto');
  }

  
  eliminarEmailContacto(){
    localStorage.removeItem('emailContacto');
  }
  ngDoCheck(){
    this.emailContacto = localStorage.getItem('emailContacto');
  }

  
}
