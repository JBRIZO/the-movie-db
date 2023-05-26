import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { createList, createListWithMovie } from '../../store/lists.actions';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
})
export class NewListComponent implements OnInit {
  movieId!: number;

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });

  constructor(
    private snackBar: SnackbarService,
    private store: Store,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['movieId'];
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snackBar.openSnackBar('Please fill the fields as required', true);
    } else {
      if (this.movieId) {
        this.store.dispatch(
          createListWithMovie({
            name: this.name.value,
            description: this.description.value,
            movieId: this.movieId,
          })
        );
      } else {
        this.store.dispatch(
          createList({
            name: this.name.value,
            description: this.description.value,
          })
        );
      }
    }
  }
}
