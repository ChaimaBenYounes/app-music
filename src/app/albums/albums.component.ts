import { Component, OnInit } from '@angular/core';
// importez la définition de la classe et les albums
import { Album } from '../album'; 
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})

export class AlbumsComponent implements OnInit {

  albums : Album[] =  ALBUMS;
  selectedAlbum : Album;
  status: string = null;// pour gérer l'affichage des caractères [play] 

  constructor() { 

  }

  ngOnInit() {

    //console.log(this.albums[0].ref);
  }

}
