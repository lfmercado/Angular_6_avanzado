import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Animal }  from '../../models/animal.model';
import { Global } from '../../services/global.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  providers: [AnimalService],
  
})
export class AnimalsComponent implements OnInit {
  public title:String;
  public animals : Animal[];
  public url;
  constructor(
    private _animalService: AnimalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {  
    this.title= "Animales";
    this.url = Global.url;
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

}
