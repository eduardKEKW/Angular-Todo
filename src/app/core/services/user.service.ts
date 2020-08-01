import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { of, Observable, BehaviorSubject, from, forkJoin, zip, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import { Todo } from './../interfaces/todo';
import { User } from 'src/app/core/interfaces/user';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authFire: AngularFireAuth,
    private DB: AngularFirestore,
    private storage: AngularFireStorage,
  ) {}

  user: User | null;

  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();

  private eventAuthError = new BehaviorSubject<string>('');
  public eventAuthError$ = this.eventAuthError.asObservable();

  public dialogMessage = new Subject<string>();
  public dialogMessage$ = this.dialogMessage.asObservable();

  user$: Observable<User | null> = this.authFire.authState.pipe(
    switchMap((authState) => {
      return authState
        ? this.DB.doc(`users/${authState.uid}`)
          .valueChanges()
          .pipe(map((user: {}) => {
            return { ...user, id: authState.uid };
          }))
        : of(null);
    }),
    map((user) => {
      return user;
    }),
    tap((user: User) => {
      if (!this.user) {
        this.dialogMessage.next(`Logged In ${user.username}`);
      }
      this.user = user;
    })
  );

  login(email: string, password: string): Observable<any> {
    this.loading.next(true);

    return from(this.authFire.signInWithEmailAndPassword(email, password))
      .pipe(
        tap({
          error: () => this.loading.next(false),
          complete: () => {
            this.loading.next(false);
          }
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
      .finally(() => {
        this.loading.next(false);
      });
  }

  saveUser(userCredentials, userData): Promise<any> {
    const img = userData.avatar[0];
    let imgId = null;

    if (img) {
      imgId = Date.now();
      this.storage.upload(`images/${imgId}`, img);
    }

    return this.DB.doc(`users/${userCredentials.user.uid}`).set({
      email: userData.email,
      username: userData.username,
      admin: [],
      avatar: imgId,
    });
  }

  logout(): Promise<any> {
    return this.authFire.signOut();
  }

  getTodos(): Observable<Todo[]> {
    return this.user$.pipe(
      switchMap(user => {
        return this.DB
          .collection('todos', ref => ref.where('userId', '==', user.id) )
          .valueChanges();
      }),
      map((todos: [Todo]) => {
        return todos;
      })
    );
  }

  getUser(id: string): Observable<any> {
    const path = `users/${id}`;

    return this.DB.doc(path).valueChanges().pipe(
      map((val) => {
        return val;
      })
    );
  }

  getImg(id: string): Observable<string> {
    const ref = this.storage.ref('default.png');

    return ref.getDownloadURL();
  }

  getUsers(): Observable<User[]> {
    return this.user$.pipe(
      mergeMap((user: User) => {
          return zip(
            ...user.admin.map((path: string) => {
                return this.DB.doc(path)
                  .snapshotChanges()
                  .pipe(
                    map(action => {
                      return {
                        id: action.payload.id,
                        ...action.payload.data() as User
                      };
                    })
                  );
            })
        );
      })
    );
  }

  addAdminList(id: string): void {
    of(this.DB.doc(`users/${this.user.id}`).update({
      admin: firebase.firestore.FieldValue.arrayUnion(`users/${id}`),
    }))
    .subscribe({
      error: (err) => this.dialogMessage.next(`${id} failed`),
      next: () => this.dialogMessage.next(`${id} added successfully`)
    });
  }
}
