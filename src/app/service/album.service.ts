import { Injectable } from '@angular/core';
import { Album, List } from '../album'; 
import { ALBUMS, ALBUM_LISTS  } from '../mock-albums';
import { sortBy } from 'sort-by-typescript';

@Injectable({
  providedIn: 'root' // injecter de manière globale
})
export class AlbumService {

  albums : Album[] =  ALBUMS;
  albumLists: List[] = ALBUM_LISTS; // récupération de la liste des chasons

  constructor() { }

  count(){
    return this.albums.length;
  }
  //elle retournera tous les albums sort by duration.
  getAlbums(){
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
  getAlbum( id: string){
    if (this.albums.find(elem => elem.id === id)){
      return this.albums.find(elem => elem.id === id);
    }
    return null;
  }

  //elle retournera la liste d’un album
  getAlbumList( id : string){

    if(this.albumLists.find(elem => elem.id === id)){
      return this.albumLists.find(elem => elem.id === id);
    }
    return null;
  }

}
