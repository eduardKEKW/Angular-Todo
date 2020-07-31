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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { TodoComponent } from './todo/todo.component';
import { DatePipe } from './pipes/date.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterModalPipe } from './pipes/filter-modal.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    DatePipe,
    UsersComponent,
    EditComponent,
    DocPipe,
    DocsPipe,
    ImgPipe,
    DialogAddComponent,
    TodoComponent,
    FilterModalPipe,
  ],
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
    MatListModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatAutocompleteModule,
  ],
  exports: [UsersComponent],
})
export class SideModule {}
