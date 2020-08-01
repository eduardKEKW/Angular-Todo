import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TodosService } from './../../../core/services/todos.service';
import { User } from 'src/app/core/interfaces/user';
import { Todo } from './../../../core/interfaces/todo';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  user: User | null;
  todos: [Todo] | [] = [];
  client = false;
  loadingUser = true;
  loadingTodos = true;
  admin: User | null = null;
  filter: '0' | '1' | '-1' = '0';

  constructor(
    private userService: UserService,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.todosService.loadingTodos$.subscribe(
      (loading) => (this.loadingTodos = loading)
    );
    this.todosService.loadingUser$.subscribe(
      (loading) => (this.loadingUser = loading)
    );

    this.todosService.getUser().subscribe((user) => {
      this.user = user;

      this.userService.user$.subscribe(
        (admin: User) => {
          this.admin = admin;
          this.client = admin.id === this.user.id;
        }
      );

    });

    this.todosService.getTodos().subscribe((todos: [Todo]) => {
      this.todos = todos;
    });
  }

  addNewTodo(): void {
    this.filter = '0';
    this.todosService.createTodo(this.user.id, this.admin.id);
  }

  filterChange({ value }): void {
    this.filter = value;
  }

}
