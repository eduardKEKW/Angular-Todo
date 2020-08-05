import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { Todo } from 'src/app/core/interfaces/todo';
import { TodosService } from './../../../core/services/todos.service';
import { UserService } from './../../../core/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  filter: '0' | '1' | '-1' = '0';
  todos: Todo[] | null = null;
  showTodos: Todo[] | null = null;
  loading = false;
  paginationOptions = { previousPageIndex: 0, pageIndex: 0, pageSize: 5, length: 100, completed: false, expired: false };
  query$: Observable<Todo[]>;
  query: BehaviorSubject<{}>;

  constructor(
    private todosService: TodosService,
    private userService: UserService,
    private db: AngularFireStorage
  ) { }

  @Input() user: User;

  ngOnInit(): void {
    this.loading = true;

    const [query$, query] = this.todosService.getTodosForUser(this.user.id, this.paginationOptions);

    this.query$ = query$;
    this.query = query;

    this.query$.subscribe((todos: Todo[]) => {
      this.todos = todos;

      this.getPage();

      this.paginationOptions.length = this.todos.length;

      this.loading = false;
    });

  }

  filterChange({ value }): void {
    this.paginationOptions.completed = value === '1';
    this.paginationOptions.expired = value === '-1';
    this.paginationOptions.previousPageIndex = 0;
    this.paginationOptions.pageIndex = 0;

    this.filter = value;

    this.getTodos(this.paginationOptions);
  }

  changePage(options): void {
    this.paginationOptions = { ...this.paginationOptions, ...options };
    this.getPage();
  }

  getTodos(filters): void {
    this.loading = true;
    this.query.next(filters);
  }

  getPage(): void {
    this.showTodos = this.todos.slice(
      this.paginationOptions.pageIndex * this.paginationOptions.pageSize,
      (this.paginationOptions.pageIndex + 1) * this.paginationOptions.pageSize
    );

  }

}
