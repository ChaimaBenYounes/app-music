import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginateComponent } from './paginate/paginate.component';


@NgModule({
  declarations: [PaginateComponent],
  imports: [
    CommonModule, 
  ],
  exports: [PaginateComponent, FormsModule, ReactiveFormsModule]
})
export class ShareModule { }
