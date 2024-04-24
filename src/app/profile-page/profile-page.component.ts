import { Component, Input, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = { Username: '', Password: '', Email: '', Birth: '' };

  FavoriteMovies : any[] = [];
  movies: any[] = [];
  favorites: any[] = [];
  
  constructor(public fetchApiData: FetchApiDataService,
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
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });

  }

  public back(): void {
    this.router.navigate(['movies']);
  }

  public updateUser(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
      data: { userData: this.user }
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
      const index = this.FavoriteMovies.findIndex((movie: any) => movie._id === movieId);
      if (index > -1) {
        this.FavoriteMovies.splice(index, 1);
      }
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  public isFavoriteMovie(movieId: string): boolean {
    return this.user.FavoriteMovies.includes(movieId);
  }

  public getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
    });
  }
}
