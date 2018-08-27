import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//Modelos
import { Global } from '../../../services/global.service';
import { Animal }  from '../../../models/animal.model';
//Servicios
import { AnimalService } from '../../../services/animal.service';
import { UploadService } from '../../../services/upload.service';
import { UserService } from '../../../services/user.service';


import { fadeLateral } from '../../animation';  

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [AnimalService, UserService],
  animations: [fadeLateral]
})
export class ListComponent implements OnInit {
  public title:string;
  public number = [];
  public url;
  public animals : Animal[];
  public tokken;
  public busqueda;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _animalService: AnimalService
  ) { 
    this.title = "Añadir";
    this.url = Global.url;
    this.tokken = _userService.getTokken();
  }


  ngOnInit() {
    this.getAnimals();
  }
  getAnimals(){
    this._animalService.getAnimals().subscribe(
      response =>{
        if(!response.animals){
          this._router.navigate(['/admin-panel/add']);
        }else{
          this.animals = response.animals;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteAnimal(id){
    $('#myModal').modal('hide');
    this._animalService.deleteAnimal(this.tokken, id).subscribe(
      response => {
        if(!response.animal){
          alert('Error en el servidor, no se ha podido borrar el animal!!');
        }else{
          this.getAnimals();

        }
      }, 
      error => {
        alert('Error en el servidor, no se ha podido borrar el animal!!');
        console.log(<any>error);
      }
    );
  }

}
