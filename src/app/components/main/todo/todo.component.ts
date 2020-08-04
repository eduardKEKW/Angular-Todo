import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/core/interfaces/todo';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  @Input() todo: Todo;
  @Input() userId: string;
  @Input() filter: string;

  ngOnInit(): void {
  }

  showTodo(type: string): boolean {
    return {
      '-1': moment(new Date((this.todo.expire as any).toDate())).isBefore(new Date(Date.now())),
      0: true,
      1: this.todo.completed
    }[type];
  }


}
