import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public title:string;
  public number = [];
  constructor() { 
    this.title = "Listado";
    this.number= new Array(10)

  }

  ngOnInit() {
  }

}
