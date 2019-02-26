import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { MinuteSecondsPipe } from './pipe/minute-seconds-pipe';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { RegisterComponent } from './register/register.component';

const albumsRoutes: Routes = [
  { path:'albums', component : AlbumsComponent},
  { path:'', redirectTo: '/albums', pathMatch:'full'},
  { path:'login', component : LoginComponent},
  { path:'register', component : RegisterComponent},
  { path:'album/:id', component : AlbumDescriptionComponent},
] 

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    MinuteSecondsPipe,
    AlbumDetailsComponent,
    SearchComponent,
    LoginComponent,
    AlbumDescriptionComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    RouterModule.forRoot(
      albumsRoutes, 
  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
