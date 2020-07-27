import { Component, OnInit } from '@angular/core';
import { User } from './core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  user: User | null;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      console.log(user)
      this.user = user;
    });

    this.userService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });

    this.userService.dialogMessage$.subscribe((mss: string) => {
      if (mss) {
        this.snackBar.open(mss, 'Ok', {
        duration: 2000
      });
      }
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
