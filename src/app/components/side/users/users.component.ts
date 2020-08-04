import { Component, OnInit, Inject, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { UserService } from './../../../core/services/user.service';
import { User } from './../../../core/interfaces/user';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { TodosService } from './../../../core/services/todos.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, filter, switchMap, map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  sideOpen = false;
  user: User | null;
  editUserId: string | null = null;
  users: Observable<User> | null = null;

  constructor(
    private userService: UserService,
    private todosService: TodosService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.todosService.edit(user.id);
      }

      this.user = user;
    });
  }

  toggleSide(): void {
    this.sideOpen = !this.sideOpen;
  }

  openEdit(userId: string): void {
    this.todosService.edit(userId);
    this.sideOpen = true;
  }

  onUserOpen(id: string | null): void {
    this.openEdit(id ? id : this.user.id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '250px',
      data: { name: this.user.username, id: '' }
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.userService.addAdminList(id);
      }
    });
  }
}


@Component({
  selector: 'app-dialog-add',
  templateUrl: 'dialog-add.html',
  styleUrls: ['./users.component.css']
})
export class DialogAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private DB: AngularFirestore,
    private userService: UserService
  ) { }

  id: string;
  loading = false;
  disable = true;
  user: User | null = null;
  searchTerm: Subject<string> = new Subject<string>();
  searchTerm$ = this.searchTerm.asObservable();
  clientId: string;

  ngOnInit(): void {
    this.id = this.data.id;

    this.userService.user$.subscribe((user: User) => this.clientId = user.id);

    this.searchTerm$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(t => !!t),
      tap(() => {
        this.disable = true;
        this.loading = true;
      }),
      switchMap(term => {
        return this.DB.doc(`users/${term}`).valueChanges();
      }),
      map((user: User) => {
        return user;
      })
    )
    .subscribe((user: User) => {
      if (!user) {
        this.loading = false;
      } else {
        this.user = user;
        this.disable = false;
        this.loading = false;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dataChanged(event): void {
    this.id = event.target.value;

    if (this.id !== this.clientId) {
      this.searchTerm.next(this.id);
    }
  }

}
