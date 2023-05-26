import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsMainComponent } from './components/movie-details-main/movie-details-main.component';

const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailsMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailsRoutingModule {}
