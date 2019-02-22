import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { MinuteSecondsPipe } from './pipe/minute-seconds-pipe';
import { AlbumDetailsComponent } from './album-details/album-details.component';

const routeshome: Routes = [{ path:'', component : AlbumsComponent}] 

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    MinuteSecondsPipe,
    AlbumDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule.forRoot(
      routeshome, 
  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
