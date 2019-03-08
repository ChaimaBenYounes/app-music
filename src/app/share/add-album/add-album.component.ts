import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AlbumService } from '../../service/album.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
              private albumService : AlbumService) {

      this.formBuilder.group({
              name : new FormControl('', [
              Validators.required,
              Validators.minLength(5)
              ]),
      })                
  }

  ngOnInit() {
  }

}
