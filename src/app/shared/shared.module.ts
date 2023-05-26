import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AddToListComponent } from './components/add-to-list/add-to-list.component';
import { CardComponent } from './components/card/card.component';
import { CircleComponent } from './components/card/components/circle/circle.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { ScrollDirective } from './directives/scroll.directive';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthLocalStorageService } from './services/auth-local-storage.service';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
  declarations: [
    NavbarComponent,
    UserDropdownComponent,
    ConfirmationDialogComponent,
    CardComponent,
    CarrouselComponent,
    CircleComponent,
    AddToListComponent,
    ScrollDirective,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    InfiniteScrollModule,
    NgOptimizedImage,
    MatDividerModule,
  ],
  exports: [
    NavbarComponent,
    CardComponent,
    CarrouselComponent,
    MatIconModule,
    InfiniteScrollModule,
    AddToListComponent,
    ScrollDirective,
    ProfileComponent,
  ],
  providers: [
    AuthLocalStorageService,
    SnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class SharedModule {}
