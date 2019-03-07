import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { MinuteSecondsPipe } from './pipe/minute-seconds-pipe';
import { SearchComponent } from './search/search.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { RegisterComponent } from './register/register.component';
import { PaginateComponent } from './paginate/paginate.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumComponent } from './admin/album/album.component';

// Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCzg8jxB9r6PvmZ79nmEKyAzxZtUJWsKDc",
    authDomain: "music-9a476.firebaseapp.com",
    databaseURL: "https://music-9a476.firebaseio.com",
    projectId: "music-9a476",
    storageBucket: "music-9a476.appspot.com",
    messagingSenderId: "304064632742"
  };
  firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    MinuteSecondsPipe,
    AlbumDetailsComponent,
    SearchComponent,
    LoginComponent,
    AlbumDescriptionComponent,
    RegisterComponent,
    PaginateComponent,
    AudioPlayerComponent,
    TimeAgoPipe,
    DashboardComponent,
    AlbumComponent, // import ./admin/album/album.component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    
    HttpClientModule, // module HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
