import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';
import { deleteFavorite } from '../../store/favorites.actions';

@Component({
  selector: 'app-favorite-preview',
  templateUrl: './favorite-preview.component.html',
})
export class FavoritePreviewComponent {
  @Input() movie!: IMovie;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;
  addListOpen = false;

  constructor(private store: Store, private dialog: MatDialog) {}

  openConfirmationDialog(): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      'Are you sure you want to remove this movie from your favorites?';
    return this.confirmDialog.afterClosed();
  }

  removeFromFavorites(): void {
    this.openConfirmationDialog().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteFavorite({ favoriteMovieId: this.movie.id }));
      }
    });
  }
}
