import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  optionsOpen = false;
  loggedIn$!: Observable<boolean>;

  styleActive =
    'text-sky-500 border-sky-500 hover:text-sky-500 hover:border-sky-500';
  styleNormal =
    'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100';

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectCurrentUserLogged);
  }

  toggleOptions() {
    this.optionsOpen = !this.optionsOpen;
  }

  routeClick() {
    this.optionsOpen = false;
  }
}
