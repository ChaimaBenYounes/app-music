import { Injectable } from '@angular/core';
import { Album, List } from '../album'; 
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

  private httpClientGetAlbums = this.http.get<Album[]>(this.albumsUrl+'/.json', httpOptions);
  
  subjectAlbum = new Subject<Album>();

  constructor(private http: HttpClient) { }

  count():Observable<number>{
    return this.httpClientGetAlbums.pipe(
        map(album => {
          return album.length;
        }),
    );
  }

  //elle retournera tous les albums sort by duration.
  getAlbums():Observable<Album[]>{

    return this.httpClientGetAlbums.pipe(
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
  getAlbumList( id : string) : Observable<List>{

    // URL/ID/.json pour récupérer un album
    return this.http.get<List>(this.albumListsUrl+`/${id}/.json`, httpOptions).pipe(
      map(albumList => albumList) //JSON
    );
  }

  //pagination
  paginate(start: number, end: number):Observable<Album[]>{
   
    return this.httpClientGetAlbums.pipe(
      map( album => album.sort(
        (a, b) => { return b.duration - a.duration }
      ).slice(start, end)
    ));

  }
  
  paginateNumberPage():number{

    return 3 ;
  }

  //search 
  search(word: string): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + `/.json`).pipe(
      map(albums => {
        let search: Album[] = [];
        let re = new RegExp('^' + word.trim())
        _.forEach(albums, (v, k) => {
          v.id = k.toString();
          if (v.title.match(re) != null) search.push(v);
        })

        return search;
      })
    );
  }

  switchOn(album : Album) : void{
    album.status = 'on';
    this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(
      e => e,
      error => console.warn(error),
      () => {
        this.subjectAlbum.next(album); //next c'est equivalent à emit
      }
    );
  }

  switchOf(album : Album): void{
    album.status = 'off';
    this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(() => {});
  }

}
