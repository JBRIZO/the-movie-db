import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { FavoritePreviewComponent } from './components/favorite-preview/favorite-preview.component';
import { FavoritesCarrouselComponent } from './components/favorites-carrousel/favorites-carrousel.component';
import { FavoritesMainComponent } from './components/favorites-main/favorites-main.component';
import { FavoritesRoutingModule } from './favorites-router.module';
import { FavoriteService } from './services/favorite.service';
import { FavoriteEffects } from './store/favorites.effects';
import * as fromFavorites from './store/favorites.reducer';

@NgModule({
  declarations: [
    FavoritesMainComponent,
    FavoritePreviewComponent,
    FavoritesCarrouselComponent,
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    EffectsModule.forFeature([FavoriteEffects]),
    StoreModule.forFeature(
      fromFavorites.favoriteFeatureKey,
      fromFavorites.favoritesReducer
    ),
    SharedModule,
  ],
  providers: [FavoriteService],
})
export class FavoritesModule {}
