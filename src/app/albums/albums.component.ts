import { Component, OnInit } from '@angular/core';
// importez la définition de la classe et les albums
import { Album } from '../album'; 
import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../service/album.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page principale Albums Music";
  albums : Album[] =  ALBUMS;
  selectedAlbum : Album;
  status: string = null; // pour gérer l'affichage des caractères [play] 
  
  constructor(private ablumService: AlbumService) {
  }

  ngOnInit() {
    this.albums = this.ablumService.paginate(0,this.ablumService.paginateNumberPage());
    console.log(this.ablumService.count())

  }

  onSelect(album: Album) {
      this.selectedAlbum = album;
  }

  playParent($event){
    this.status = $event.id; // identifiant unique
    this.ablumService.switchOn($event);
  }

  searchByNameParent($event){
    if ($event) this.albums = $event;
  }
  paginate($event){
    this.albums = this.ablumService.paginate($event.start,$event.end);
  }

}
