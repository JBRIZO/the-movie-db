import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListDetails } from 'src/app/lists/interfaces/list-details-response.interface';
import {
  addMovieToList,
  deleteMovieFromList,
} from 'src/app/lists/store/lists.actions';
import { selectListEntities } from 'src/app/lists/store/lists.selector';
import { AppState } from 'src/app/store/app.store';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss'],
})
export class AddToListComponent implements OnInit {
  @Input() movieId!: number;
  lists$!: Observable<IListDetails[]>;
  isDropdownHidden = true;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.lists$ = this.store.select(selectListEntities);
  }

  openConfirmationDialog(question: string): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage = question;
    return this.confirmDialog.afterClosed();
  }

  addMovieToList(listId: string): void {
    this.store.dispatch(
      addMovieToList({ movieId: this.movieId, listId: parseInt(listId) })
    );
  }

  removeMovieFromList(listId: string): void {
    this.openConfirmationDialog(
      'Are you sure you want to remove this movie from the list?'
    ).subscribe(result => {
      if (result) {
        this.store.dispatch(
          deleteMovieFromList({
            movieId: this.movieId,
            listId: parseInt(listId),
          })
        );
      }
    });
  }

  isMovieInList(list: IListDetails): boolean {
    if (list) {
      const movie = list.items.find(movie => movie.id === this.movieId);
      return movie !== undefined;
    }
    return false;
  }
}
