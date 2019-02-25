import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven
import { AlbumService } from '../service/album.service';
import { Album } from '../album'; 
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  albums : Album[] =  ALBUMS;
  @Output() onSub : EventEmitter<Album> = new EventEmitter();

  constructor(private ablumService: AlbumService) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm):void{

    this.onSub.emit(this.ablumService.search(form.value['search']));
  }

}
