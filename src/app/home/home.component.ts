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
  selectedAlbum : Album;
  status: string = null; // pour gérer l'affichage des caractères [play]
  constructor(/*private ablumService: AlbumService*/) {
    //console.log(this.ablumService.count)
   }

  ngOnInit() {
    //this.albums = this.ablumService.paginate(0,5);
  }

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }

  playParent($event){
    this.status = $event.id; // identifiant unique
    console.log($event)
  }

}
