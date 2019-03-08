import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { AlbumService } from '../../service/album.service';
import { Album } from 'src/app/album';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm : FormGroup;
  
  constructor(private formBuilder : FormBuilder,
              private albumService : AlbumService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
      this.albumForm =  this.formBuilder.group({
        ref : new FormControl('', [Validators.required, Validators.minLength(5)]),
        name : new FormControl('', [Validators.required, Validators.minLength(5)]),
        title : new FormControl('', [Validators.required, Validators.minLength(5)]),
        description : new FormControl('', [Validators.required, Validators.minLength(10)]),
        duration : new FormControl('', [Validators.required]),
        status : new FormControl('', [Validators.required, Validators.minLength(5)]),
        url : new FormControl('', []),
        like : new FormControl('', []),
        tags : new FormControl('', []),
      })  
  }

  //GETTER
  get ref() { return this.albumForm.get('ref'); }
  get name() { return this.albumForm.get('name'); }
  get title() { return this.albumForm.get('title'); }
  get description() { return this.albumForm.get('description'); }
  get duration() { return this.albumForm.get('duration'); }
  get status() { return this.albumForm.get('status'); }
  get url() { return this.albumForm.get('url'); }
  get like() { return this.albumForm.get('like'); }
  get tags() { return this.albumForm.get('tags'); }

  //OnSubmit Form
  onSubmit() {
    const formValue = this.albumForm.value;
    console.log(formValue);
    const newAlbum = new Album(
      '',
      formValue['ref'],
      formValue['name'],
      formValue['title'],
      formValue['description'],
      formValue['duration'],
      formValue['status'],
      formValue['url'],
      formValue['like'],
      formValue['tags'],
    );

    this.albumService.addAlbum(newAlbum).subscribe(
          album => { console.log(album) },
          error => console.error(error),
          () => {
          this.router.navigate(['admin/album'], { queryParams: { message: 'success' } });
          }
    );

    //this.router.navigate(['/album/{{album.id}}']);
  }

}
