import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../core/services/user.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private userSerive: UserService
  ) { }

  users: User[] | null = null;
  loading = false;
  error = false;

  ngOnInit(): void {
    this.loading = true;

    this.userSerive.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.error = true;
    });
  }

}
