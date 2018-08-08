import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  public titulo: String;
  public nombreParque: String;
  public miParque;
  
  constructor() {
    this.titulo = "Esta es la tienda"
   }

  ngOnInit() {
  }
  
  mostrarNombre(){
    console.log(this.nombreParque);
  }

  verDatosParque(event){
    console.log(event);
    this.miParque = event;
  }
}
