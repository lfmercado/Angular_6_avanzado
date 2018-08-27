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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class EditComponent implements OnInit {
  public title:string;
  public animal: Animal;
  public identity;
  public tokken;
  public url:string;
  public status:boolean;
  public message;
  public is_edit;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _uploadService: UploadService

  ) { 
    this.is_edit = true;
    this.title = "Editar";
    this.animal = new Animal('','','',2018,'','');
    this.tokken = _userService.getTokken();
    this.url = Global.url;
  }


  ngOnInit() {
    this.getAnimal();
  }
  onSubmit(){
    console.log(this.animal);
    let id = this.animal._id;
    this._animalService.editAnimal(this.tokken, id, this.animal).subscribe(
      response =>{
        console.log(response.animalUpdate);
        if(!response.animalUpdate){
          this.status = false;
          this.message = 'No se ha podido actualizar el animal!!'
          
        }else{
          this.status = true;
          this.animal = response.animalUpdate;
          this.message = 'El animal se ha actualizar con exito!!'
          this._router.navigate(['/animal/', id]);
          //Subir imagen del animal
          if(this.filesToUpload != undefined){
            this._uploadService.makeFileRequest(this.url+ 'upload-image-animal/' + this.animal._id, [],this.filesToUpload,this.tokken,'image')
                            .then((result:any)=>{
                                this.animal.image = result.image;
                                console.log(this.animal);
                                this._router.navigate(['/animal/', id]);
                              });
          }else{
            alert('No has subido un archivo')
          }
          this._uploadService.makeFileRequest
          //Redirect
          //this._router.navigate(['/admin-panel/list']);
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
