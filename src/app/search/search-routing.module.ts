import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchMainComponent } from './components/search-main/search-main.component';

const routes: Routes = [
  {
    path: '',
    component: SearchMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
