import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';
import { AppState } from 'src/app/store/app.store';
import { loadFavorites } from '../../store/favorites.actions';
import {
  selectFavoriteMovies,
  selectIsFavoritesLoaded,
} from '../../store/favorites.selectors';

@Component({
  selector: 'app-favorites-carrousel',
  templateUrl: './favorites-carrousel.component.html',
})
export class FavoritesCarrouselComponent implements OnInit {
  page!: number;
  totalPages!: number;
  areFavoritesLoaded$!: Observable<boolean>;
  favoriteMovies$!: Observable<IMovie[] | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.favoriteMovies$ = this.store.select(selectFavoriteMovies).pipe(
      tap(moviesResponse => {
        this.totalPages = moviesResponse.total_pages;
        this.page = moviesResponse.page;
      }),
      map(moviesResponse => moviesResponse.results)
    );
    this.areFavoritesLoaded$ = this.store.select(selectIsFavoritesLoaded);
  }

  onScroll(): void {
    if (this.page + 1 <= this.totalPages) {
      this.store.dispatch(loadFavorites({ page: ++this.page }));
    }
  }
}
