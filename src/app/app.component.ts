import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  showLoginFormMessage(): void {
    // Create an instance of UserLoginFormComponent
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });

    // Optionally, you can subscribe to the afterClosed event to perform actions after the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
