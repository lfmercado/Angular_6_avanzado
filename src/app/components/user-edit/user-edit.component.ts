import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user.model';
import { Global } from '../../services/global.service';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'], 
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit, DoCheck {
  public title:string;
  public user:User;
  public identity;
  public tokken;
  public status:boolean;
  public message;
  public global;
  constructor(
    private _userService: UserService,
    private _uploadService: UploadService
  ) { 
    this.title = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.global = Global.url;
    this.user = this.identity;  
    console.log(this.user);
  } 
  //Este metodo 
  ngDoCheck(){
    this.tokken = this._userService.getTokken(); 
    this.identity = this._userService.getIdentity();
    //this.emailContacto = localStorage.getItem('emailContacto');
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.user = this.identity;
  }
 
  onSubmit(){
    
      this._userService.updateUser(this.user).subscribe(
        response => {
          console.log(response);
            if(!response.userUpdate){
              this.message = 'Error, no se ha podido actualizar los datos, desde response !!'
              this.status = false;
            }else{
              localStorage.setItem('identity', JSON.stringify(this.user));
              this.message = 'Los datos se han actualizado con exito!!'
              this.status = true;
              if(this.filesToUpload != null){
              for (var name of this.filesToUpload){
                var namesplit = name.name.split('.');
                var ext = namesplit[1];
                console.log(ext);
                if(ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'git' || ext == 'PNG' ){
                  this._uploadService.makeFileRequest(this.global+ 'upload-image-user/' + this.identity._id, [],this.filesToUpload,this.tokken,'image')
                                  .then((result:any)=>{
                                      this.user.image = result.image;
                                      localStorage.setItem('identity', JSON.stringify(this.user));
                                  });
                }else{
                  alert('la imagen no se ha actualizado, debes introducir un archivo tipo imagen!');
                  break;
                }
              }
            }else{
              alert('No has subido un archivo')
            }
             
            }

        },
        error =>{
          var errorMessage = <any>error;
          if (errorMessage  != null){
            this.status = false;
            this.message = 'Error, no se ha podido actualizar los datos!!'
          }
        }
      );
  }
  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
