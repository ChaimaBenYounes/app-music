import { Component, OnInit } from '@angular/core';
import { Album } from '../../album'; 
import { AlbumService } from '../../service/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albums : Album[] = [];
  constructor(private ablumService: AlbumService) { }

  ngOnInit() {
    this.ablumService.paginate(0, this.ablumService.paginateNumberPage()).subscribe(
      albums => this.albums = albums
    );
  }

  paginate($event){
    this.ablumService.paginate($event.start,$event.end).subscribe(
      albums => this.albums = albums
    );
  }

}
