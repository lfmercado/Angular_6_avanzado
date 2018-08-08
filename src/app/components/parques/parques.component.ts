import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'parques',
  templateUrl: './parques.component.html',
  styleUrls: ['./parques.component.css']
})
export class ParquesComponent implements OnInit {

  @Input()nombre : String;
  
  public metros: Number;
  public vegetacion: String;
  public abierto: Boolean;
                            //por medio de esta clase se permite enviar datos 
  @Output() pasameLosDatos = new EventEmitter;

  constructor() {
  
    this.nombre ="Parque Natural De Caballos";
    this.metros = 450;
    this.vegetacion = "Media";
    this.abierto = true;
   }

  ngOnInit() {
  }

  emitirEvento(){
    this.pasameLosDatos.emit({
      'nombre' : this.nombre,
      'metros' : this.metros,
      'vegetacion' : this.vegetacion,
      'abierto' : this.abierto,

    });
  }

}
