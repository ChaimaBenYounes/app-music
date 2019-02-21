import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  @Input() album: Album;
  albums : Album[] =  ALBUMS;
 
  constructor() { }

  ngOnInit() {
    console.log(this.album); // contrôler que les données rentrent bien ici  
  }

  ngOnChanges(changes: {Album : SimpleChanges}){

    for (let propName in changes) {  
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
    
            console.log(curVal);
            console.log(prevVal);
         }
         
    /*if (changes['album']) {
      console.log(changes['album']);

      /*let found = this.albums.find(function(element) {
        return element > 10;
      });
      
      console.log(found);*/
  /*}*/
  }

}
