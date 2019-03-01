import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { interval } from 'rxjs';

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
  album : any;
  constructor(private ablumService : AlbumService) {}

  ngOnInit() {
   
    this.ablumService.subjectAlbum.subscribe( album => {
        this.showplayer = true;
        this.album = album;
        let duration = album.duration;
        this.total = Math.floor(duration/120);
        this.ratio = Math.floor(100/this.total); // durée en pourcentage
        
        let step = this.ratio;
        let timer = 10*1000; // 10sec
        
        const player = setInterval(() => {
          this.current ++;
          this.ratio += step;
          if( this.ratio > 100) { 
            clearInterval(player);
            this.showplayer = false;
            this.ablumService.switchOf();
          }  
        }, timer);
        
      
      
    });

  }
}
