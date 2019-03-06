import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { interval } from 'rxjs';
import { Album, List } from '../album';
@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  showplayer : boolean = false;
  total : number; 
  ratio : number;
  current : number;
  album : Album;
  albumList : List; 
  constructor(private ablumService : AlbumService) {}

  ngOnInit() {
  
    this.ablumService.subjectAlbum.subscribe( album => {
      this.current = 1;
      this.ratio = 0;
      this.showplayer = true; 
      this.album = album;
      this.ablumService.getAlbumList(album.id).subscribe(
        albumList => this.albumList = albumList
      );
    
      // if (list null) TODO
      let nbAlbumList = this.albumList.list.length;
      let durationPerSong = album.duration / nbAlbumList;

      this.total = Math.floor(nbAlbumList);
      this.ratio = Math.floor(durationPerSong*100/album.duration); // durée en pourcentage

      let step = this.ratio;
      let timer = durationPerSong *1000; // 20*1000sec
      
      setInterval(() => {
        if(album.status ==="off"){
          this.showplayer = false;
          this.ratio = 0;
        } 
      });

      const player = setInterval(() => {
          this.current ++;
          this.ratio += step;
        if( this.ratio > 100) {
          clearInterval(player);
          this.showplayer = false;
          this.ablumService.switchOf(album);
        } 
      }, timer);
    }); 
    
  }

    
}
