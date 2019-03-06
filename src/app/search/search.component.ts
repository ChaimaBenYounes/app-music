import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven
import { AlbumService } from '../service/album.service';
import { Album } from '../album'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  albums : Album[] =  [];
  @Output() searchByName : EventEmitter<Album[]> = new EventEmitter();// émission des données vers le parent

  constructor(private ablumService: AlbumService) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm):void{

    this.ablumService.search(form.value['search']).subscribe(
      album => {
        if(album.length>0) this.searchByName.emit(album);
      }
    );
  }

}
