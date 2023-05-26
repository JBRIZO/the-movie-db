import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { IMovie } from '../../interfaces/movie.interface';
import {
  HomeStartActions,
  SpecificStartActions,
} from '../../interfaces/carrousel-start.actions';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
})
export class CarrouselComponent implements OnInit, OnDestroy {
  storeSubscription!: Subscription;
  cards!: IMovie[];
  page!: number;
  totalPages!: number;
  isLoading!: boolean;
  errors!: string | null;
  @Input() actionToPerform!: HomeStartActions | null;
  @Input() actionToPerformMovieId!: SpecificStartActions | null;
  @Input() carrouselSelector!: any;
  @Input() sectionTitle!: string;
  @Input() movieId!: number | null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select(this.carrouselSelector)
      .subscribe(value => {
        this.page = value.meta.page;
        this.totalPages = value.meta.total_pages;
        this.isLoading = value.loading;
        this.errors = value.errors;
        this.cards = value.movies;
      });
  }

  onScroll() {
    if (this.page + 1 <= this.totalPages) {
      if (this.actionToPerform) {
        this.store.dispatch(this.actionToPerform({ payload: this.page + 1 }));
      } else if (this.actionToPerformMovieId && this.movieId) {
        this.store.dispatch(
          this.actionToPerformMovieId({
            payload: { page: this.page + 1, movieId: this.movieId },
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
