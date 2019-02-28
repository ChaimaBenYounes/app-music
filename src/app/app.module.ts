import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
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
    AudioPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
