import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthMainComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'authenticate',
    component: AuthRedirectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
