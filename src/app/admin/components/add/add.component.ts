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

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class AddComponent implements OnInit {
  public title:string;
  public animal: Animal;
  public identity;
  public tokken;
  public url:string;
  public status:boolean;
  public message;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _uploadService: UploadService

  ) { 
    this.title = "Añadir";
    this.animal = new Animal('','','',2018,'','');
    this.identity = _userService.getIdentity();
    this.tokken = _userService.getTokken();
    this.url = Global.url;
  }


  ngOnInit() {

  }
  onSubmit(){
    console.log(this.animal);
    this._animalService.addAnimal(this.tokken, this.animal).subscribe(
      response =>{
        if(!response.animal){
          this.status = false;
          this.message = 'No se ha podido crear el animal!!'
          
        }else{
          this.status = true;
          this.animal = response.animal;
          this.message = 'El animal se ha creado con exito!!'
          console.log(this.animal);
          //Subir imagen del animal
          if(this.filesToUpload != undefined){
            this._uploadService.makeFileRequest(this.url+ 'upload-image-animal/' + this.animal._id, [],this.filesToUpload,this.tokken,'image')
                            .then((result:any)=>{
                                this.animal.image = result.image;
                                console.log(this.animal);
                                //this._router.navigate(['/admin-panel/list']);
                              });
          }else{
            alert('No has subido un archivo')
          }
          this._uploadService.makeFileRequest
          //Redirect
          this._router.navigate(['/admin-panel/list']);
        }
      },
      error =>{
        this.status = false;
        this.message ='Ha ocurido un error con la peticion!!'
        console.log(<any>error);
      }
    );
  }

  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any){
    if(fileInput != undefined){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    }
    
  }

}
