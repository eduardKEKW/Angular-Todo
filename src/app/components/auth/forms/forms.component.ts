import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from './../../../core/interfaces/user';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  user: User | null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this
      .userService
      .user$
      .subscribe((user) => this.user = user);
  }

}
