import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../service/album.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  showplayer : boolean = false;
  total : number; 
  ratio : number;
  current : number = 1;

  constructor(private ablumService : AlbumService) {}

  ngOnInit() {

    this.ablumService.subjectAlbum.subscribe( album => {
        this.showplayer = true;
        
        let duration = album.duration;
        this.total = Math.floor(duration/120);
        this.ratio = Math.floor(100/this.total);
    });

  }
}
