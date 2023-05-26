import { Component } from '@angular/core';
import { AuthHttpService } from '../../services/auth-http.service';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
})
export class AuthMainComponent {
  loginStarted = false;
  constructor(private authHttp: AuthHttpService) {}

  loginClick() {
    this.loginStarted = true;
    this.authHttp.getToken().subscribe();
  }
}
