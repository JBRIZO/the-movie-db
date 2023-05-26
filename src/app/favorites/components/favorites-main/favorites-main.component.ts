import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { loadLists } from 'src/app/lists/store/lists.actions';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { loadFavorites } from '../../store/favorites.actions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-favorites-main',
  templateUrl: './favorites-main.component.html',
})
export class FavoritesMainComponent implements OnInit {
  constructor(private store: Store<AppState>, private titleService: Title) {
    this.titleService.setTitle('My Favorites');
  }

  ngOnInit(): void {
    this.store.dispatch(loadFavorites({ page: 1 }));
    this.store.dispatch(loadLists({ page: 1 }));
  }
}
