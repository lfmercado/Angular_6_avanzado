import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit{
  title = 'app';
  public titulo: string;
  public emailContacto:string;
  ngDoCheck(){
    this.emailContacto = localStorage.getItem('emailContacto');
  }
  ngOnInit(){
    this.titulo ="¡Curso De Angular Avanzado!";
  }

  eliminarEmailContacto(){
    localStorage.removeItem('emailContacto');
  }
}
