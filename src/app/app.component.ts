import { Component, OnInit, ViewContainerRef, ViewChild, Compiler, Injector } from '@angular/core';
import { User } from './core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private compiler: Compiler,
    private injector: Injector
  ) {}

  user: User | null;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      console.log(user);
      this.user = user;

      this.loadFeature();
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

  loadFeature(): void {
    import('./components/side/side.module').then(({ SideModule }) => {
      this.compiler.compileModuleAsync(SideModule).then(moduleFactory => {

        const moduleRef = moduleFactory.create(this.injector);
        console.log(moduleRef.instance);

        const componentFactory = moduleRef.instance.resolveComponent();
        const { instance } = this.container.createComponent(componentFactory);
      });
    });
  }

}
