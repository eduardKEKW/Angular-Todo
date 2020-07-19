import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { RegisterComponent } from './forms/register/register.component';
import { FormsComponent } from './forms/forms.component';

import { UserService } from 'src/app/core/services/user.service';
import { LoginComponent } from './forms/login/login.component';

@NgModule({
  providers: [UserService],
  declarations: [BottomSheetComponent, FormsComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
  ],
  exports: [
    BottomSheetComponent,
  ]
})
export class AuthModule { }
