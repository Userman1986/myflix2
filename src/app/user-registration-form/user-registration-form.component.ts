import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  userData: any = {};

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {
    if (data && data.userData) {
      this.userData = data.userData;
    }
  }
  
  ngOnInit(): void {
    const userId = this.data.userId; // Get userId from data
  }
  
  onSubmit(): void {
    const userId = this.data.userId; // Get userId from data
  
    if (this.userData._id) {
      this.fetchApiData.updateUser(userId, this.userData).subscribe(() => {
        this.snackBar.open('User updated successfully', 'OK', {
          duration: 3000
        });
        this.dialogRef.close(this.userData);
      });
    } else {
      this.fetchApiData.userRegistration(this.userData).subscribe(() => {
        this.snackBar.open('User registered successfully', 'OK', {
          duration: 3000
        });
        this.dialogRef.close();
      });
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}