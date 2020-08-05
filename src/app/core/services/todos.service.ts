import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable, from } from 'rxjs';
import { switchMap, map, tap, finalize } from 'rxjs/operators';
import { User } from './../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from './../interfaces/todo';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { DocPipe } from './../pipes/globalPipes/doc.pipe';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private DB: AngularFirestore) {}

  private editUser = new BehaviorSubject<string>('');
  public editUser$ = this.editUser.asObservable();

  private loadingUser = new BehaviorSubject<boolean>(true);
  public loadingUser$ = this.loadingUser.asObservable();

  private loadingTodos = new BehaviorSubject<boolean>(true);
  public loadingTodos$ = this.loadingTodos.asObservable();

  edit(userId: string): void {
    this.editUser.next(userId);
  }

  getUser(): Observable<User> {
    return this.editUser$.pipe(
      tap((_) => this.loadingUser.next(true)),
      switchMap((userId: string) => {
        return this.DB.doc(`users/${userId}`)
          .snapshotChanges()
          .pipe(
            map((value) => {
              const data = value.payload.data() as User;
              const id = value.payload.id;
              return { id, ...data } as User;
            }),
            tap(() => this.loadingUser.next(false))
          );
      })
    );
  }

  getTodos(): Observable<Todo[]> {
    return this.getUser().pipe(
      tap((_) => this.loadingTodos.next(true)),
      switchMap((user: User) => {
        return this.DB.collection('todos', (ref) =>
          ref.where('userId', '==', user.id)
        )
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((item) => {
                return {
                  id: item.payload.doc.id,
                  ...(item.payload.doc.data() as Todo),
                } as Todo;
              });
            })
          );
      }),
      map((todos: Todo[]) => {
        return todos;
      }),
      tap(() => this.loadingTodos.next(false))
    );
  }

  getTodosForUser(id: string, filters): [Observable<Todo[]>, BehaviorSubject<{}>] {
    const obs = new BehaviorSubject(filters);
    const obs$ = obs.asObservable();

    const query$ = obs$.pipe(
      switchMap((filtersObj) => {

        return this.DB.collection('todos', (ref) => {
          let base = ref.where('userId', '==', id);

          if (filtersObj.completed) {
            base = base.where('completed', '==', true);
          }

          if (filtersObj.expired) {
            base = base.where('expire', '<=', firebase.firestore.Timestamp.fromDate(new Date()));
          }

          // base = base.orderBy('expire');
          // base = base.limit(filtersObj.pageSize);
          // base = base.startAfter();

          return base;
        })
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((item) => {
                return {
                  id: item.payload.doc.id,
                  ...(item.payload.doc.data() as Todo),
                } as Todo;
              });
            })
          );
      })
    );

    return [query$, obs];
  }

  editTodo(
    data: { text: string; expire: any, sendTo: string | null, },
    todoId: string,
    userId: string,
  ): Observable<any> {
    const newData = {
      text: data.text,
      expire: data.expire,
    };

    if (data.sendTo) {
      (newData as any).from = userId;
      (newData as any).userId = data.sendTo;
    }

    return from(this.DB.doc(`todos/${todoId}`).update(newData));
  }

  editTodoFrom(
    sendTo: string,
    todoId: string,
    userId: string,
  ): Observable<any> {

    return from(this.DB.doc(`todos/${todoId}`).update({
      from: userId,
      userId: sendTo,
    }));
  }

  createTodo(userId, fromId): void {
    this.DB.doc(`todos/${this.DB.createId()}`).set({
      from: fromId,
      text: '',
      createdAt: new Date(),
      expire: new Date(),
      userId,
      completed: false,
    });
  }

  deleteTodo(id: string): Observable<void> {
    return from(this.DB.doc(`todos/${id}`).delete());
  }

  checkTodo(value: boolean, todoId: string): Observable<void> {
    return from(this.DB.doc(`todos/${todoId}`).update({
      completed: value
    }));
  }

}
