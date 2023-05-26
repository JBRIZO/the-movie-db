import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap, filter } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import {
  fetchDetailsStart,
  fetchRecommendedStart,
  fetchSimilarStart,
} from '../../store/specific-movie.actions';
import {
  selectAreMovieReviews,
  selectAreRecommendedMovies,
  selectMovieDetails,
  selectMovieDetailsLoading,
  selectRecommendedMovies,
  selectSimilarMovies,
} from '../../store/specific-movie.selectors';
import { IMovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';

@Component({
  selector: 'app-movie-details-main',
  templateUrl: './movie-details-main.component.html',
})
export class MovieDetailsMainComponent implements OnInit {
  movie$!: Observable<IMovieDetails | null>;
  moviesLoading$!: Observable<boolean>;
  similarStart = fetchSimilarStart;
  recommendedStart = fetchRecommendedStart;

  areRecommended$!: Observable<boolean>;
  areReviews$!: Observable<boolean>;

  similarMovies = selectSimilarMovies;
  recommendedMovies = selectRecommendedMovies;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.store.dispatch(fetchDetailsStart({ payload: +movieId }));
      }
    });
    12;
    this.areReviews$ = this.store.select(selectAreMovieReviews);
    this.areRecommended$ = this.store.select(selectAreRecommendedMovies);
    this.moviesLoading$ = this.store.select(selectMovieDetailsLoading);
    this.movie$ = this.store.select(selectMovieDetails).pipe(
      filter(movie => movie !== null),
      tap(movie =>
        this.title.setTitle(
          `${movie!.title} (${movie!.release_date.substring(0, 4)})`
        )
      )
    );
  }
}
