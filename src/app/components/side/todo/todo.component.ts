import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Todo } from './../../../core/interfaces/todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodosService } from './../../../core/services/todos.service';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnChanges {
  editTodoForm: FormGroup;
  expanded: undefined | boolean = undefined;
  loading = false;
  admin: User | null = null;
  from: string | null = null;
  show = true;

  constructor(
    private todosService: TodosService,
    private userService: UserService,
  ) {}

  @Input() todo: Todo;
  @Input() active: boolean;
  @Input() userId: string;
  @Input() isClient: boolean;
  @Input() filter: string;

  ngOnInit(): void {
    this.editTodoForm = new FormGroup({
      text: new FormControl(this.todo.text, [
        Validators.required,
        Validators.maxLength(150),
      ]),
      from: new FormControl('', []),
      expire: new FormControl((this.todo.expire as any).toDate(), [
        Validators.required,
      ]),
    });

    this.userService.user$.subscribe((user: User | null) => {
      this.admin = user;
    });

    this.expanded = this.todo.text ? undefined : true;
    this.show = this.showTodo(this.filter);
  }

  ngOnChanges(changes): void {
    this.show = this.showTodo(this.filter);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.editTodoForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    this.loading = true;
    const { text, expire } = this.editTodoForm.getRawValue();

    this.todosService.editTodo(
      {
        text,
        expire,
        sendTo: this.from,
      },
      this.todo.id,
      this.userId,
    )
    .subscribe(
      res => {
        this.expanded = undefined;
        this.loading = false;
      },
      err => {
        this.expanded = undefined;
        this.loading = false;
      },
    );
  }

  selectSendTo(id: string): void {
    this.from = id;
  }

  selectSendToSingle(id: string): void {
    this.todosService.editTodoFrom(id, this.todo.id, this.userId);
  }

  onCancel(): void {
    this.editTodoForm.controls.text.reset(this.todo.text);
    this.editTodoForm.controls.text.setErrors(null);

    this.editTodoForm.controls.expire.reset((this.todo.expire as any).toDate());
    this.editTodoForm.controls.expire.setErrors(null);

    this.expanded = undefined;
  }

  deleteTodo(): void {
    this.todosService.deleteTodo(this.todo.id)
    .subscribe(
      (res) => this.userService.dialogMessage.next(`Todo ${this.todo.id} is deleted`),
      (err) => this.userService.dialogMessage.next(`Todo ${this.todo.id} failed to delete`),
    );
  }

  checkCompleted(completed: boolean, id: string): void {
    this.todosService.checkTodo(completed, id)
    .subscribe(
      (res) => this.userService.dialogMessage.next(`Todo ${id} is ${completed ? '' : 'not'} completed`),
      (err) => this.userService.dialogMessage.next(`Todo ${id} failed`),
    );
  }

  showTodo(type: string): boolean {
    return {
      '-1': moment(new Date((this.todo.expire as any).toDate())).isBefore(new Date(Date.now())),
      0 : true,
      1 : this.todo.completed
    }[type];
  }


}
