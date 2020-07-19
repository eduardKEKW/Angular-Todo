import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap } from 'rxjs/operators';
import { of, Observable, BehaviorSubject, from } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authFire: AngularFireAuth,
    private DB: AngularFirestore
  ) {}

  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();

  private eventAuthError = new BehaviorSubject<string>('');
  public eventAuthError$ = this.eventAuthError.asObservable();

  user$: Observable<User | null> = this.authFire.authState.pipe(
    switchMap((authState) => {
      return authState
        ? this.DB.doc(`users/${authState.uid}`).valueChanges()
        : of(null);
    }),
    map((user) => {
      return user;
    })
  );

  login(email: string, password: string): Observable<any> {
    this.loading.next(true);

    return from(this.authFire.signInWithEmailAndPassword(email, password))
      .pipe(
        tap({
          error: () => this.loading.next(false),
          complete: () => this.loading.next(false)
        })
      );
  }

  register(userData): Promise<any> {
    this.loading.next(true);

    return this.authFire
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((userCredentials) => {
        userCredentials.user.updateProfile({
          displayName: userData.name,
        });

        return this.saveUser(userCredentials, userData);
      })
      .finally(() => this.loading.next(false) );
  }

  saveUser(userCredentials, userData): Promise<any> {
    return this.DB.doc(`users/${userCredentials.user.uid}`).set({
      email: userData.email,
      username: userData.username,
    });
  }

  logout(): Promise<any> {
    return this.authFire.signOut();
  }
}
