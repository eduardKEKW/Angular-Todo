import { Component, OnInit } from '@angular/core';
import { User } from './core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private userService: UserService) {}

  user: User | null;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });

    this.userService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

  register(): void {
    console.log('registering')
    this.userService.register({
      email: 'test3@test.com',
      password: 'testing',
      name: 'test',
    });
  }

  logOut(): void {
    this.userService.logout();
  }
}
