import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { ALBUMS, ALBUM_LISTS} from '../mock-albums';
import { AlbumService } from '../service/album.service';

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

  constructor(private ablumService: AlbumService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: {Album : SimpleChanges}){
    if (this.album) {
      this.songs = this.ablumService.getAlbumList(this.album.id);
    }
  }

  play(album: Album){
    this.onPlay.emit(album); // émettre un album vers le parent
  }

}
