import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedInGuard } from '../shared/guards/logged-guard.guard';
import { FavoritesMainComponent } from './components/favorites-main/favorites-main.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesMainComponent,
    canActivate: [loggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
