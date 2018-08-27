import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//Modelos
import { Global } from '../../services/global.service';
import { Animal }  from '../../models/animal.model';
//Servicios
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css'],
  providers: [AnimalService]
})
export class AnimalDetailComponent implements OnInit {
  public url;
  public animal : Animal;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService
  ) { 
    
    this.url = Global.url;
  }
  ngOnInit() {
    this.getAnimal();
  }
  getAnimal(){
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];
      this._animalService.getAnimal(id).subscribe(
        response =>{
          if(!response.animal){
            this._router.navigate(['/home']);
          }else{
            this.animal = response.animal;
          }
        },
        error =>{
          this._router.navigate(['/home']);
          console.log(<any>error);
        }
      );
    });
  }

}
