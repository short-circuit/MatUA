import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-variablebrowser',
  templateUrl: './variablebrowser.component.html',
  styleUrls: ['./variablebrowser.component.scss']
})
export class VariablebrowserComponent implements OnInit {
  subscription = undefined;
  subscribedItems = [];

  constructor() { }

  ngOnInit() {
  }

}
