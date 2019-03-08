import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginateComponent } from './paginate/paginate.component';
import { AddAlbumComponent } from './add-album/add-album.component';

@NgModule({
  declarations: [
    PaginateComponent,
    AddAlbumComponent,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
  ],
  exports: [PaginateComponent, FormsModule, ReactiveFormsModule]
})
export class ShareModule { }
