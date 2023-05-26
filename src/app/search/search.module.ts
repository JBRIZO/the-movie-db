import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchMainComponent } from './components/search-main/search-main.component';
import { SearchRoutingModule } from './search-routing.module';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './store/search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/search.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchHttpService } from './services/search-http.service';

@NgModule({
  declarations: [SearchMainComponent],
  imports: [
    SharedModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    SearchRoutingModule,
    StoreModule.forFeature('search', searchReducer),
    EffectsModule.forFeature([SearchEffects]),
  ],
  providers: [SearchHttpService],
})
export class SearchModule {}
