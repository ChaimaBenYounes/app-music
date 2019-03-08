import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [AlbumComponent], // déclarer le component dans le module
  imports: [
    CommonModule, // directives classiques à importer dans le module
    ShareModule
  ],
  exports : [AlbumComponent]// exporter le component pour le reste de l'application
})
export class AdminModule { }
