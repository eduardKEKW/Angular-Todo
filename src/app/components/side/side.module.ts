import { NgModule, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent, DialogAddComponent } from './users/users.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditComponent } from './edit/edit.component';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { PipesModule } from './../../core/pipes/pipes.module';

@NgModule({
  declarations: [
    UsersComponent,
    EditComponent,
    DialogAddComponent,
    TodoComponent,
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
    MatCheckboxModule,
    MatRadioModule,
    PipesModule
  ],
  exports: [],
})
export class SideModule {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public resolveComponent(): ComponentFactory<UsersComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(UsersComponent);
  }

}
