import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  favoriteMovies: any[] = [];
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { 
    this.loadUser();
    this.getAllMovies();
  }

  public loadUser(): void { 
    this.user = this.fetchApiData.getOneUser();
    this.fetchApiData.getFavoriteMovies().subscribe((response) => {
      this.favoriteMovies = response;
    });
  }

  public back(): void {
    this.router.navigate(['movies']);
  }

  public updateUser(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
      data: { userData: this.user, userId: this.user._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
        this.fetchApiData.updateUser(this.user._id, {
          Username: this.user.Username,
          Email: this.user.Email,
          Birth: this.user.Birth,
          FavoriteMovies: this.user.FavoriteMovies
        }).subscribe(
          (updatedUser: any) => {
            this.user = updatedUser;
            this.snackBar.open('Profile updated successfully', 'OK', {
              duration: 2000
            });
          },
          (error: any) => {
            console.error('Error updating user:', error);
            this.snackBar.open('Failed to update profile', 'OK', {
              duration: 2000
            });
          }
        );
      }
    });
  }

  public deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account deleted successfully', 'OK', {
          duration: 2000
        });
      });
    }
  }

  public getGenre(genre: any): void {
    this.dialog.open(GenreComponent, {
      data: { genre },
      panelClass: 'genre-dialog'
    });
  }

  public getOneDirector(director: any): void {
    this.dialog.open(DirectorComponent, {
      data: { director },
      panelClass: 'director-dialog'
    });
  }

  public openMovieDetails(description: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { description },
      panelClass: 'movie-details-dialog'
    });
  }

  public removeFavoriteMovie(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe(() => {
      const index = this.favoriteMovies.findIndex((movie: any) => movie._id === movieId);
      if (index > -1) {
        this.favoriteMovies.splice(index, 1);
      }
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  public isFavoriteMovie(movieId: string): boolean {
    return this.favoriteMovies.some((movie: any) => movie._id === movieId);
  }

  public getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
    });
  }
}
