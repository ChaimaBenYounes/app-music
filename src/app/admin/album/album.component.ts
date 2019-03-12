import { Component, OnInit } from '@angular/core';
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
  countBis;

  showModal: boolean = false;
  albumId;

  constructor(private ablumService: AlbumService,
              private router: Router) { }

  ngOnInit() {
   // on récupère les albums directement comme ci-dessous, dans le template on utilisera le pipe async
    // pour récupérer les albums :
    this.ablumService.paginate(0, this.ablumService.paginateNumberPage()).subscribe(
      albums => {
        this.albums = albums;
      }
    );
    this.ablumService.getAlbums().subscribe(
      albums => {
        this.countBis = albums.length;
      }
    );

  }
  paginate($event) {
    this.ablumService.paginate($event.start,$event.end).subscribe(
      albums => this.albums = albums
    );
  }

  //Modals
  deleteAlbum(id: number) {
    // routerLink="/admin/delete/{{album.id}}/deleted"
    this.showModal = true;
    this.albumId = id;
  }

  choice($event) {
    this.showModal = $event.showModal;
  }

  responseModalsYes() {
    this.showModal = false;
    this.router.navigate([
      '/admin/delete/' + this.albumId + '/deleted'
    ], { queryParams: { message: 'Success' } }
    );
  }

  responseModalsNo() {
    this.showModal = false;
  }
}
