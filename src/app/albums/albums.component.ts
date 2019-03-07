import { Component, OnInit } from '@angular/core';
import { Album } from '../album'; 
import { AlbumService } from '../service/album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page principale Albums Music";
  albums : Album[] = [];
  selectedAlbum : Album;
  status: string = null; // pour gérer l'affichage des caractères [play] 
  
  constructor(private ablumService: AlbumService) {}

  ngOnInit() {

    this.ablumService.paginate(0, this.ablumService.paginateNumberPage()).subscribe(
      albums => this.albums = albums
    );
    
    // récupération des données depuis Firebase avec la méthode HttpClient
    this.ablumService.getAlbums().subscribe(
      albums => this.albums = albums
    );
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
    this.ablumService.paginate($event.start,$event.end).subscribe(
      albums => this.albums = albums
    );
  }

}
