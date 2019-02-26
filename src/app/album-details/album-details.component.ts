import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { ALBUMS, ALBUM_LISTS} from '../mock-albums';
import { AlbumService } from '../service/album.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  } from '@angular/animations';


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('myAnimation', [
      // définir l'état inactive de l'élément HTML
      state('active', style({
        height: '50%',
        opacity: 0.25,
        backgroundColor: 'black',
        transform: 'scale(0.6)',
      })),
      // définir l'état active de l'élément HTML
      state('inactive', style({
        height: '26%',
        opacity: 1,
        backgroundColor: '#f8f9fa',
        transform: 'scale(1)',
      })),
      transition('inactive => active', animate('2s ease-in')),
      transition('active => inactive', animate('0.5s ease-out')),
    ]),
  ]

})
export class AlbumDetailsComponent implements OnInit {

  // on récupére [album] <app-album-details [album]="selectedAlbum"></app-album-details>
  @Input() album: Album; // propriété [album] liée dans album.component.html
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  albums : Album[] =  ALBUMS;
  albumLists: List[] = ALBUM_LISTS; // récupération de la liste des chasons
  songs : List;
  private stateGrow : boolean = false;


  constructor(private ablumService: AlbumService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: {Album : SimpleChanges}){
    
    if (this.album) {
      this.songs = this.ablumService.getAlbumList(this.album.id);
      this.stateGrow = false;

      const annimate = setTimeout(() => {
        this.stateGrow = !this.stateGrow, 
        clearInterval(annimate)
       }, 300);

    }
  }

  play(album: Album){
    this.onPlay.emit(album); // émettre un album vers le parent
  }

}
