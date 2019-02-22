import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { ALBUMS} from '../mock-albums';
import { ALBUM_LISTS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  // on récupére [album] <app-album-details [album]="selectedAlbum"></app-album-details>
  @Input() album: Album; // propriété [album] liée dans album.component.html
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  albums : Album[] =  ALBUMS;
  albumLists: List[] = ALBUM_LISTS; // récupération de la liste des chasons
  songs : List;


  constructor() { }

  ngOnInit() {
    console.log(this.album); // contrôler que les données rentrent bien ici  
  }

  ngOnChanges(changes: {Album : SimpleChanges}){

    if (this.album) {
    
      this.songs = this.albumLists.find(elem => elem.id === this.album.id);
      
    }
  }

  play(album: Album){
    this.onPlay.emit(album); // émettre un album vers le parent
  }

}
