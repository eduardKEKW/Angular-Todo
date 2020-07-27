import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent, DialogAddComponent } from './users/users.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditComponent } from './edit/edit.component';
import { DocPipe } from './pipes/doc.pipe';
import { DocsPipe } from './pipes/docs.pipe';
import { ImgPipe } from './pipes/img.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [UsersComponent, EditComponent, DocPipe, DocsPipe, ImgPipe, DialogAddComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    UsersComponent
  ]
})
export class SideModule { }
