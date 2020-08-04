import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { TodoComponent } from './todo/todo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from './../../core/pipes/pipes.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [MainComponent, UserComponent, TodoComponent],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
    PipesModule,
    MatTabsModule,
    MatRadioModule,
    FormsModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
