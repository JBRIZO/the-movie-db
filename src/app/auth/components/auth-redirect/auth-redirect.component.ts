import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { signInStart } from '../../store/auth.actions';
import { selectCurrentUserLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
})
export class AuthRedirectComponent implements OnInit {
  currentUserLoading$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.currentUserLoading$ = this.store.select(selectCurrentUserLoading);
    this.activatedRoute.queryParamMap.subscribe(params => {
      const requestToken = params.get('request_token');
      if (!requestToken) {
        this.router.navigate(['login']);
      } else {
        this.store.dispatch(signInStart({ payload: requestToken }));
      }
    });
  }
}
