import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormsComponent } from './../forms/forms.component';
import { UserService } from './../../../core/services/user.service';
import { User } from './../../../core/interfaces/user';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {
  user: User | null;

  constructor(
    private bottomSheet: MatBottomSheet,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(FormsComponent);
  }

  onIconClick(): void {
    if (this.user) {
      this.userService.logout();
    } else {
      this.openBottomSheet();
    }
  }

}
