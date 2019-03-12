import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../service/album.service';
import { Album } from '../../album';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.scss']
})
export class UpdateAlbumComponent implements OnInit {

  album: Album;
  selectedImage: File = null;
  updateFormAlbum: FormGroup;
  id: string;
  urlImage:string;

  constructor(private route: ActivatedRoute,
              private albumService: AlbumService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id'); // id dans l'url

    this.initUpdateForm(); // initialisation du formulaire 

    // mise à jour du formulaire après l'instanciation de ce dernier
    this.albumService.getAlbum(this.id).subscribe(album => {
      // on récupère l'instance du formulaire et on met à jour les champs du formulaire
      // avec la méthode patchValue du formGroup
      this.updateFormAlbum.patchValue(album);
      this.urlImage = album.url;
    }
    );
  }
  initUpdateForm() {

    this.updateFormAlbum = this.formBuilder.group(
      {
        id: 0,
        ref : new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        title : new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        url : new FormControl('', []),
        duration: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.max(900)
        ]),
        description: new FormControl('', [
          Validators.required
        ]),
        status: 'off',
        like : new FormControl('', []),
        tags : new FormControl('', []),
      }
    );
  }

  // getter pour la validation dans le formulaire errors
  get ref() { return this.updateFormAlbum.get('ref'); }
  get name() { return this.updateFormAlbum.get('name'); }
  get title() { return this.updateFormAlbum.get('title'); }
  get description() { return this.updateFormAlbum.get('description'); }
  get duration() { return this.updateFormAlbum.get('duration'); }
  get status() { return this.updateFormAlbum.get('status'); }
  get url() { return this.updateFormAlbum.get('url'); }
  get like() { return this.updateFormAlbum.get('like'); }
  get tags() { return this.updateFormAlbum.get('tags'); }

  //OnSubmit Form
  onSubmit() {
    let album: Album;
    album = this.updateFormAlbum.value;
    album.id = this.id;

    /**
     * @todo observer methods next and error 
     */
    if (this.selectedImage != null) {
      this.albumService.uploadFile(this.selectedImage).then(
        snapshot => {
          return snapshot.ref.getDownloadURL()
        }
      ).then(url => {
        album.url = url;
        this.albumService.updateAlbum(album.id, album).subscribe(
          () => {

            this.router.navigate(['/admin/album'], { queryParams: { message: 'success updated resource' } });
          }
        )
      })      
    }
  }

  onSelectedImage(event) {
    this.selectedImage = <File>event.target.files[0];
  }


}
