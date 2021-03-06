import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { ALBUMS, ALBUM_LISTS} from '../mock-albums';
import { AlbumService } from '../service/album.service';
import { trasAnimation } from '../animation';
import { PlayState } from '@angular/core/src/render3/interfaces/player';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: trasAnimation,

})
export class AlbumDetailsComponent implements OnInit {

  // on récupére [album] <app-album-details [album]="selectedAlbum"></app-album-details>
  @Input() album: Album; // propriété [album] liée dans album.component.html
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  albums : Album[] =  ALBUMS;
  albumLists: List[] = ALBUM_LISTS; // récupération de la liste des chasons
  songs : List;
  private stateGrow : boolean = false;
  valueButtonPlayStop : string = 'Play';

  constructor(private ablumService: AlbumService) {}

  ngOnInit() {}

  ngOnChanges(changes: {Album : SimpleChanges}){
    
    this.valueButtonPlayStop = 'Play';

    if (this.album) {
      this.songs = this.ablumService.getAlbumList(this.album.id);
      
      this.stateGrow = false;
      const annimate = setTimeout(() => {
        this.stateGrow = !this.stateGrow, 
        clearInterval(annimate)
       }, 100);

    }
  }

  play(album: Album){
    this.onPlay.emit(album); // émettre un album vers le parent

    if(this.valueButtonPlayStop === 'Play'){
      this.valueButtonPlayStop = 'Stop';
      this.ablumService.switchOn(album);
    } 
    else if (this.valueButtonPlayStop === 'Stop'){
      this.valueButtonPlayStop = 'Play';
      this.ablumService.switchOf(album);
    }
  }

}
