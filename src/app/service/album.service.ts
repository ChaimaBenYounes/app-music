import { Injectable } from '@angular/core';
import { Album, List } from '../album'; 
//import { sortBy } from 'sort-by-typescript';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Service et classe utile
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Opérateurs de RxJS
import * as _ from 'lodash'; // libraire utile pour le traitement de données
import * as firebase from 'firebase/app';

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
  countBis: number;
  private httpClientGetAlbums = this.http.get<Album[]>(this.albumsUrl+'/.json', httpOptions);
  
  sendCurrentNumberPage = new Subject<number>(); // pour mettre à jour la pagination 
  subjectAlbum = new Subject<Album>();

  constructor(private http: HttpClient) { }

  //pagination
  paginate(start: number, end: number): Observable<Album[]> {

    // Vous devez faire le mapping avant la récupération des données
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => {
        let newAlbums = [];
        console.log(albums);
        albums.forEach(album => {
          if(album !== null) {
            newAlbums.push(album);
          }
        })
      return newAlbums;
      }),
      // Préparation des données pour avoir un format exploitable dans l'application
      // JSON en Array JSON
      map(albums => {
        let Albums: Album[] = [];
        _.forEach(albums, (v, k) => {
          v.id = k.toString();
          Albums.push(v);
        });

        return Albums;
      }),
      // Ordonner les albums par ordre de durée décroissante
      map(albums => {
        return albums.sort(
          (a, b) => { return b.duration - a.duration }
        ).slice(start, end); // slicing des données
      })
    )
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }
  paginateNumberPage():number{

    return 3 ;
  }

  //count album
  count(){
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
          map(albums => {
            let newAlbums = [];
            albums.forEach(album => {
              if(album !== null) {
                newAlbums.push(album);
              }
            })
          return newAlbums;
          }),
          // Ordonnez les albums par ordre de durées décroissantes
          map(albums => {
            return albums.sort(
              (a, b) => { return b.duration - a.duration }
            );
            //return albums.sort(sortBy('-duration'));
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
    return this.http.get<List>(this.albumListsUrl+`/${id}/.json`, httpOptions);
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

  //add Album
  addAlbum(album: Album, id: string): Observable<any> {
    return this.http.put<void>(this.albumsUrl + `/${id}/.json`, album);
  }

  // id random
  getRandomID():string{
    return  Math.floor(Math.random()* Math.floor(1000)).toString();
  }

  //Update Album
  updateAlbum(ref: string, album: Album): Observable<void> {
    console.log(ref);
    return this.http.put<void>(this.albumsUrl + `/${ref}/.json`, album);
  }

  //Delete Album
  deleteAlbum(id: string): Observable<void> {
    return this.http.delete<void>(this.albumsUrl + `/${id}/.json`);
  }

  //uploadFile
  uploadFile(file: File) {
    const randomId = Math.random().toString(36).substring(2);
    const ref = firebase.app().storage("gs://music-9a476.appspot.com").ref();
    const imagesRef = ref.child('images');
    return imagesRef.child(randomId + '.png').put(file);
  }
  
}
