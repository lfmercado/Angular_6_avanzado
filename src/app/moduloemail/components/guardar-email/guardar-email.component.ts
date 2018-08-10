import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'guardar-email',
  templateUrl: './guardar-email.component.html',
  styleUrls: ['./guardar-email.component.css']
})
export class GuardarEmailComponent implements OnInit, DoCheck {
  public title:string;
  public emailContacto:string;
  constructor() { 
    this.title = "NgZoo";
  }

  ngOnInit() {
    //this.emailContacto = localStorage.getItem('emailContacto');
  }

  ngDoCheck(){
      //this.emailContacto = localStorage.getItem('emailContacto');
    }

  guadarEmail(){
    localStorage.setItem('emailContacto', this.emailContacto);
    console.log(localStorage.getItem('emailContacto'));
    //console.log(this.emailContacto);
  }
 
  
}
