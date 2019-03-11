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
  selectedImage: File = null;
  
  constructor(private formBuilder : FormBuilder,
              private albumService : AlbumService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    console.log(this.albumService.getRandomID());
  }

  initForm() {
      this.albumForm =  this.formBuilder.group({
        ref : new FormControl('', [Validators.required, Validators.minLength(5)]),
        name : new FormControl('', [Validators.required, Validators.minLength(5)]),
        title : new FormControl('', [Validators.required, Validators.minLength(5)]),
        description : new FormControl('', [Validators.required, Validators.minLength(10)]),
        duration : new FormControl('', [Validators.required,
                                        Validators.pattern('[0-9]*'),
                                        Validators.max(900)
        ]),
        status : new FormControl('off', []),
        like : new FormControl('', []),
        tags : new FormControl('', []),
      })  
  }

  //GETTER for the validation in the form
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
    const idRandom = this.albumService.getRandomID();
    let newAlbum : Album = {
      id : '',
      ref : formValue['ref'],
      name : formValue['name'],
      title : formValue['title'],
      description : formValue['description'],
      duration : formValue['duration'],
      status :'off',
      url : '',
      like : formValue['like'],
      tags : formValue['tags'],
    }

    //HttpClient Observable se désinscrit tout seul après avoir terminé son action
    this.albumService.addAlbum(newAlbum, idRandom).subscribe(
      a => {
        if (this.selectedImage != null) {
          a.name || 'anonymous';
          this.albumService.uploadFile(this.selectedImage)
            .then(
              snapshot => {
                return snapshot.ref.getDownloadURL()
              }
            )
            .then(url => {
              newAlbum.url = url;
              this.albumService.updateAlbum(idRandom, newAlbum).subscribe(
                () => {
                  console.log('updated with url image')
                }
              );
            }
            )
            .catch(error => console.log(error))
        }
      },
      error => console.error(error),
      () => {
        this.router.navigate(['/admin/album'], { queryParams: { message: 'success' } });
      }
    );

  }
  onSelectedImage(event) {
    this.selectedImage = <File>event.target.files[0];
  }

}
