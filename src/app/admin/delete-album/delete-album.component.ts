import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../service/album.service';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.scss']
})
export class DeleteAlbumComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private AlbumService: AlbumService) { }

  ngOnInit() {
    if (
      this.route.snapshot.paramMap.get('id') &&
      this.route.snapshot.paramMap.get('action')
    ) {
      const id = this.route.snapshot.paramMap.get('id');
      const action = this.route.snapshot.paramMap.get('action');

      this.AlbumService.deleteAlbum(id).subscribe(
        () => {
          this.router.navigate(['/admin/album']);
        }
      )
    }
  }

}
