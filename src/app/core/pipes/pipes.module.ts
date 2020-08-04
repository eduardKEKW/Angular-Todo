import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './globalPipes/date.pipe';
import { DocsPipe } from './globalPipes/docs.pipe';
import { FilterModalPipe } from './globalPipes/filter-modal.pipe';
import { ImgPipe } from './globalPipes/img.pipe';
import { DocPipe } from './globalPipes/doc.pipe';

@NgModule({
  declarations: [DatePipe, DocPipe, DocsPipe, FilterModalPipe, ImgPipe],
  imports: [
  CommonModule
  ],
  exports: [
    DatePipe, DocsPipe, FilterModalPipe, ImgPipe, DocPipe
  ]
})
export class PipesModule { }
