import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { MovieReview } from '../../interfaces/responses/movie-reviews/movie-review.interface';
import { selectMovieReviews } from '../../store/specific-movie.selectors';

@Component({
  selector: 'app-movie-details-reviews',
  templateUrl: './movie-details-reviews.component.html',
})
export class MovieDetailsReviewsComponent implements OnInit {
  reviews$!: Observable<MovieReview[] | null>;
  @Input() sectionTitle!: string;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.reviews$ = this.store.select(selectMovieReviews);
  }
}
