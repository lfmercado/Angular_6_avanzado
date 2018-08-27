import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//Model
import { User } from '../../models/user.model';
//Servicio
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global.service';
@Component({
  selector: 'app-keeper',
  templateUrl: './keeper.component.html',
  styleUrls: ['./keeper.component.css'],
  providers: [UserService]
})
export class KeeperComponent implements OnInit {
  public title:String;
  public url;
  public keepers: User[];
  constructor(
    private _userService: UserService,
    private _router: Router
  ) { 
    this.title="Cuidadores";
    this.url = Global.url;
  }

  ngOnInit() {
    this.getKeepers();
  }

  getKeepers(){
    this._userService.getKeepers().subscribe(
      response =>{
        if(!response.users){
          this._router.navigate(['/admin-panel/add']);
        }else{
          this.keepers = response.users;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
