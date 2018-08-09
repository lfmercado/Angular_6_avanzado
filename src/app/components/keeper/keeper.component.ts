import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keeper',
  templateUrl: './keeper.component.html',
  styleUrls: ['./keeper.component.css']
})
export class KeeperComponent implements OnInit {
  public title:String;
  constructor() { 
    this.title="Cuidadores";
  }

  ngOnInit() {
  }

}
