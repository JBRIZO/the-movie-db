import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducer';
import { AuthHttpService } from './services/auth-http.service';
import { RedirectService } from './services/redirect.service';

@NgModule({
  declarations: [AuthMainComponent, AuthRedirectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule,
  ],
  providers: [AuthHttpService, RedirectService],
})
export class AuthModule {}
