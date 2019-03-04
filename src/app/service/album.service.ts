import { Injectable } from '@angular/core';
import { Album, List } from '../album'; 
import { ALBUMS, ALBUM_LISTS  } from '../mock-albums';
import { sortBy } from 'sort-by-typescript';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Service et classe utile
import { map } from 'rxjs/operators'; // Opérateurs de RxJS
import * as _ from 'lodash'; // libraire utile pour le traitement de données

// définition des headers
const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root' // injecter de manière globale
})
export class AlbumService {

  albums : Album[] =  ALBUMS;
  albumLists: List[] = ALBUM_LISTS; // récupération de la liste des chasons
  subjectAlbum = new Subject<Album>();

  
  constructor(private http: HttpClient) { }

  count():number{
    return this.albums.length;
  }
  //elle retournera tous les albums sort by duration.
  getAlbums():Album[]{
    if(this.albums){
      return this.albums.sort(sortBy('-duration')); // avec sort-by-typescript
      /* ou avec mapping
      return this.albums.sort((a, b) => 
      (b.duration - a.duration ));
      */
    } 
      return null;
  }

  //elle retournera un album
  getAlbum( id: string): Album{
    if (this.albums.find(elem => elem.id === id)){
      return this.albums.find(elem => elem.id === id);
    }
    return null;
  }

  //elle retournera la liste d’un album
  getAlbumList( id : string) : List{
    if(this.albumLists.find(elem => elem.id === id)){
      return this.albumLists.find(elem => elem.id === id);
    }
    return null;
  }

  //pagination
  paginate(start: number, end: number): Album[]{
    
    return this.albums.sort(
    (a, b) => { return b.duration - a.duration }
    ).slice(start, end);
  }
  
  paginateNumberPage():number{

    return 3 ;
  }

  //search 
  search(word : string ): Album[]{
 
   let arrayAlbum = []; 
   this.albums.forEach(album => { if (album.name.includes(word)) arrayAlbum.push(album) });
   
   return arrayAlbum;
  }

  switchOn(album : Album) : void{
    this.albums.forEach(alb => {
      if( alb.id === album.id) album.status = 'on';       
    });
    this.subjectAlbum.next(album); //next c'est equivalent à emit
  }

  switchOf(album : Album): void{
    this.albums.forEach(alb => {
      alb.status = 'off'    
    });
  }


}
