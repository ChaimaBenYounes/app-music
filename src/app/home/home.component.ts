import { Component, OnInit } from '@angular/core';
// importez la définition de la classe et les albums
import { Album } from '../album'; 
import { ALBUMS } from '../mock-albums';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  titlePage: string = "Page principale Albums Music";
  albums : Album[] =  ALBUMS;
  constructor() { }

  ngOnInit() {
  }

}
