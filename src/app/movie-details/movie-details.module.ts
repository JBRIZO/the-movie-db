import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MovieDetailsMainComponent } from './components/movie-details-main/movie-details-main.component';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsMovieComponent } from './components/movie-details-movie/movie-details-movie.component';
import { MovieDetailsReviewsComponent } from './components/movie-details-reviews/movie-details-reviews.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovieDetailsCircleComponent } from './components/movie-details-circle/movie-details-circle.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { specificMoviesReducer } from './store/specific-movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SpecificMovieEffects } from './store/specific-movie.effects';
import { ReviewCardComponent } from './components/movie-details-reviews/components/card/review-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SpecificMovieWatchlistEffects } from './store/specific-movie-watchlist.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpecificMovieRateEffects } from './store/specific-movie-rating.effects';
import { MovieDetailsRatingComponent } from './components/movie-details-rating/movie-details-rating.component';
import { SpecificMovieHttpService } from './services/specific-movie-http.service';

@NgModule({
  declarations: [
    MovieDetailsMainComponent,
    MovieDetailsMovieComponent,
    MovieDetailsReviewsComponent,
    MovieDetailsCircleComponent,
    ReviewCardComponent,
    SafeHtmlPipe,
    MovieDetailsRatingComponent,
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    NgOptimizedImage,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    SharedModule,
    InfiniteScrollModule,
    StoreModule.forFeature('specificMovie', specificMoviesReducer),
    EffectsModule.forFeature([
      SpecificMovieEffects,
      SpecificMovieWatchlistEffects,
      SpecificMovieRateEffects,
    ]),
  ],
  providers: [SpecificMovieHttpService],
})
export class MovieDetailsModule {}
