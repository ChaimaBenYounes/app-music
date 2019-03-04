import { Injectable } from '@angular/core';
import { Album, List } from '../album'; 
import { ALBUMS, ALBUM_LISTS  } from '../mock-albums';
import { sortBy } from 'sort-by-typescript';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Service et classe utile
import { Observable } from 'rxjs';
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

  // convention dans l'API ajoutez votre identifant de base de données
  private albumsUrl = 'https://music-9a476.firebaseio.com/albums';
  private albumListsUrl = 'https://music-9a476.firebaseio.com/albumLists';

  albums : Album[] =  ALBUMS;
  albumLists: List[] = ALBUM_LISTS; // récupération de la liste des chasons
  subjectAlbum = new Subject<Album>();

  constructor(private http: HttpClient) { }

  count():number{
    return this.albums.length;
  }

  //elle retournera tous les albums sort by duration.
  getAlbums():Observable<Album[]>{

    return this.http.get<Album[]>(this.albumsUrl+'/.json', httpOptions).pipe(
          // Préparation des données avec _.values pour avoir un format exploitable dans l'app
          map(albums => _.values(albums)),
          // Ordonnez les albums par ordre de durées décroissantes
          map(albums => {

            return albums.sort(sortBy('-duration'));
          }),
    );
  }

  //elle retournera un album
  getAlbum( id: string): Observable<Album>{
    // URL/ID/.json pour récupérer un album
    return this.http.get<Album>(this.albumsUrl+`/${id}/.json`, httpOptions).pipe(
      map(album => album) //JSON
    );
    
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
