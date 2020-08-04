import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthModule } from './components/auth/auth.module';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MainModule } from './components/main/main.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    MatProgressBarModule,
    AngularFireDatabaseModule,
    MatSnackBarModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
