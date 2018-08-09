import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public title:string;
  public emailContacto:string;
  constructor() { 
    this.title="Contacto";
  }

  ngOnInit() {
  }

  guadarEmail(){
    localStorage.setItem('emailContacto', this.emailContacto);
    console.log(localStorage.getItem('emailContacto'));
    //console.log(this.emailContacto);
  }

}
