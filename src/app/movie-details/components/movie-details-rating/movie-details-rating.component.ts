import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { addRating, removeRating } from '../../store/specific-movie.actions';

@Component({
  selector: 'app-movie-details-rating',
  templateUrl: './movie-details-rating.component.html',
})
export class MovieDetailsRatingComponent implements OnInit {
  @Input() rating!: number;
  rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Input() logged$!: Observable<boolean>;
  @Input() movieId!: number;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;
  currentRate: number | null = null;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.currentRate = this.rating;
  }

  addRate(rate: number): void {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(
          addRating({ payload: { movieId: this.movieId, rate: rate } })
        );
        this.rating = rate;
      }
    });
  }

  removeRate(): void {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.openConfirmationDialog(
          'Are you sure you want to remove this movie from the watchlist?'
        ).subscribe(result => {
          if (result) {
            this.store.dispatch(removeRating({ payload: this.movieId }));
          }
        });
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

  onStarHover(index: number): void {
    this.currentRate = index;
  }

  onStarLeave(): void {
    this.currentRate = this.rating !== undefined ? this.rating : null;
  }
}
