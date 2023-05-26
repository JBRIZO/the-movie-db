import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { loadLists } from '../../store/lists.actions';
import { selectLists } from '../../store/lists.selector';

@Component({
  selector: 'app-movieslists',
  templateUrl: './movieslists.component.html',
})
export class MovieslistsComponent implements OnInit {
  page!: number;
  totalPages!: number;
  userLists$!: Observable<IListDetails[] | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userLists$ = this.store.select(selectLists).pipe(
      tap(response => {
        this.page = response.page;
        this.totalPages = response.total_pages;
      }),
      map(response => response.results)
    );
  }

  onScroll(): void {
    if (this.page + 1 <= this.totalPages) {
      this.store.dispatch(loadLists({ page: ++this.page }));
    }
  }
}
