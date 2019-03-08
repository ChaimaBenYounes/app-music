import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AlbumComponent } from './album/album.component';
import { AddAlbumComponent  } from './add-album/add-album.component';
import { GuardService } from './../service/guard.service';

const routes: Routes = [
  { path:'admin/album', canActivate: [GuardService], component : AlbumComponent},
  { path:'admin/album/add', canActivate: [GuardService], component : AddAlbumComponent },
]
@NgModule({
    declarations: [
        AlbumComponent,// déclarer le component dans le module
        AddAlbumComponent,
    ], 
    imports: [
        CommonModule, // directives classiques à importer dans le module
        ShareModule,
        RouterModule.forChild(routes) // définition des routes dans le sous-module
    ],
    exports : [
        AlbumComponent, // exporter le component pour le reste de l'application
        AddAlbumComponent,
    ]
})
export class AdminModule { }
