import { Component, OnInit } from '@angular/core';


declare var jQuery:any;
declare var $:any;

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
    $('textojq').hide();
    $('#botonjq').click(function(){
      $('#textojq').slideToggle();
    });
    //Esta es una libreria de Jquery que lo que permite es contener un texto con los ... para evitar que se salga de un div o un contenedor
    $('#caja').dotdotdot({});
  }
  
  mostrarNombre(){
    console.log(this.nombreParque);
  }

  verDatosParque(event){
    console.log(event);
    this.miParque = event;
  }
}
