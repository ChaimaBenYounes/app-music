import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { Album, List } from '../album'; 
import { ALBUMS, ALBUM_LISTS  } from '../mock-albums';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  showplayer : boolean = false;

  constructor(private ablumService : AlbumService) {
  }

  ngOnInit() {

    this.ablumService.subjectAlbum.subscribe( album => {

      if(album.status){
        this.showplayer = true;
      } else {
        this.showplayer = false;
      }

    });

  }

}
