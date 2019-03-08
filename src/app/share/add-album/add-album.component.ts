import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { AlbumService } from '../../service/album.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm : FormGroup;
  
  constructor(private formBuilder : FormBuilder,
              private albumService : AlbumService) { }

  ngOnInit() {
    this.albumForm =  this.formBuilder.group({
      name : new FormControl('', [
      Validators.required,
      Validators.minLength(5)
      ]),
    })  
  }

  get name() {
    return this.albumForm.get('name');
  }

  onSubmit() {
    console.log(this.albumForm.value['name'])
  }

}
