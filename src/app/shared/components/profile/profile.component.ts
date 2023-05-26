import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { IUser } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userLoggedIn$!: Observable<IUser | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.store.select(selectCurrentUser);
  }
}
