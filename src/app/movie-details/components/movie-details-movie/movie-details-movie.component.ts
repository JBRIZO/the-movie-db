import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';
import {
  addMovieToFavorites,
  deleteFavorite,
} from 'src/app/favorites/store/favorites.actions';
import { loadLists } from 'src/app/lists/store/lists.actions';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import {
  addToWatchlist,
  removeFromWatchList,
} from '../../store/specific-movie.actions';
import { selectMovieAccountState } from '../../store/specific-movie.selectors';
import { IMovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';

@Component({
  selector: 'app-movie-details-movie',
  templateUrl: './movie-details-movie.component.html',
})
export class MovieDetailsMovieComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  logged$!: Observable<boolean>;
  imagePath = 'https://image.tmdb.org/t/p/w500';
  imagePath2 = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  @Input() movie!: IMovieDetails;
  isFavorite: boolean = false;
  isRated: boolean = false;
  isInWatchList: boolean = false;
  rating = 0;
  ratingOpen = false;
  addListOpen = false;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.logged$ = this.store.select(selectCurrentUserLogged);
    this.subscription = this.store
      .select(selectMovieAccountState)
      .subscribe(accountState => {
        if (accountState) {
          this.isFavorite = accountState.favorite;
          this.isInWatchList = accountState.watchlist;
          if (accountState.rated === false) {
            this.isRated = false;
            this.rating = 0;
          } else {
            this.isRated = true;
            const val = accountState.rated.valueOf() as { value: number };
            this.rating = val.value;
          }
        }
      });
    this.loadUserLists();
  }

  loadUserLists() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(loadLists({ page: 1 }));
      }
    });
  }

  watchlistClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        if (!this.isInWatchList) {
          this.store.dispatch(addToWatchlist({ payload: this.movie.id }));
        } else {
          this.openConfirmationDialog(
            'Are you sure you want to remove movie from your watchlist?'
          ).subscribe(result => {
            if (result) {
              this.store.dispatch(
                removeFromWatchList({ payload: this.movie.id })
              );
            }
          });
        }
      }
    });
  }

  favoriteClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        if (!this.isFavorite) {
          this.store.dispatch(addMovieToFavorites({ movieId: this.movie.id }));
        } else {
          this.openConfirmationDialog(
            'Are you sure you want to remove movie from favorites?'
          ).subscribe(result => {
            if (result) {
              this.store.dispatch(
                deleteFavorite({ favoriteMovieId: this.movie.id })
              );
            }
          });
        }
      }
    });
  }

  ratedClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.ratingOpen = !this.ratingOpen;
        this.addListOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listClicked() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.addListOpen = !this.addListOpen;
        this.ratingOpen = false;
      }
    });
  }

  openConfirmationDialog(question: string): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage = question;
    return this.confirmDialog.afterClosed();
  }
}
