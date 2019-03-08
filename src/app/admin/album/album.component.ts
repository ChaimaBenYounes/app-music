import { Component, OnInit } from '@angular/core';
import { Album } from '../../album'; 
import { AlbumService } from '../../service/album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  
  albums;
  perPage: number = 5;
  message: string;
  count;

  constructor(private ablumService: AlbumService,
              private router: Router) { }

  ngOnInit() {
   // on récupère les albums directement comme ci-dessous, dans le template on utilisera le pipe async
    // pour récupérer les albums :
    this.ablumService.paginate(0, this.ablumService.paginateNumberPage()).subscribe(
      albums => this.albums = albums
    );

    this.count = this.ablumService.count();
  }

  paginate($event) {
    this.ablumService.paginate($event.start,$event.end).subscribe(
      albums => this.albums = albums
    );
  }

  deleteAlbum(id: string){
      this.ablumService.deleteAlbum(id).subscribe(
        album => { console.log(album) },
        error => console.error(error),
        () => {
          this.router.navigate(['admin/album/delete'], { queryParams: { message: 'success' } });
        }
      );
  }



}
