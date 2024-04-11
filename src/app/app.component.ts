import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { FetchApiDataService } from './fetch-api-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies: any[] = []; // Declare the movies property here

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fetchApiDataService: FetchApiDataService 
  ) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    // Open the login dialog when the "Login" button is clicked
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });

    // Optionally, you can subscribe to the afterClosed event to perform actions after the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  fetchAllMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe((data: any) => {
      this.movies = data;
    });
  }
}
