import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TodosService } from './../../../core/services/todos.service';
import { User } from 'src/app/core/interfaces/user';
import { Todo } from './../../../core/interfaces/todo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User | null;
  todos: [Todo] | [] = [];
  client = false;
  loadingUser = true;
  loadingTodos = true;

  constructor(
    private userService: UserService,
    private todosService: TodosService,
  ) { }

  ngOnInit(): void {
    this.todosService.loadingTodos$.subscribe(loading => this.loadingTodos = loading);
    this.todosService.loadingUser$.subscribe(loading => this.loadingUser = loading);

    this
      .todosService
      .getUser()
      .subscribe((user) => {
        this.user = user;

        this.userService.user$.subscribe((admin: User) => this.client = admin.id === this.user.id);
      });

    this.todosService
      .getTodos()
      .subscribe((todos: [Todo]) => {
        this.todos = todos;
      });
  }

}
