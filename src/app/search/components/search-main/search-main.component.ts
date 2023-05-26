import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { clearSearch, searchStart } from '../../store/search.actions';
import {
  selectSearchLoading,
  selectSearchMeta,
  selectSearchResults,
} from '../../store/search.selectors';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
})
export class SearchMainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  page!: number;
  totalPages!: number;
  totalResults!: number;
  movies$!: Observable<IMovie[]>;
  loading$!: Observable<boolean>;
  searchQuery!: string;

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select(selectSearchMeta).subscribe(value => {
      this.page = value.page;
      this.totalPages = value.total_pages;
      this.totalResults = value.total_results;
    });
    this.loading$ = this.store.select(selectSearchLoading);
    this.movies$ = this.store.select(selectSearchResults);

    this.route.queryParamMap.subscribe(params => {
      const searchQuery = params.get('search');
      if (searchQuery) {
        this.store.dispatch(clearSearch());
        this.searchQuery = searchQuery;
        this.searchForm.setValue({ search: searchQuery });
        this.store.dispatch(
          searchStart({ payload: { page: 1, query: searchQuery } })
        );
      }
    });
  }

  handleSubmit() {
    const search = this.searchForm.value.search;
    this.router.navigate(['/search'], {
      queryParams: {
        search,
      },
    });
  }

  onScroll() {
    if (this.page + 1 <= this.totalPages) {
      this.store.dispatch(
        searchStart({ payload: { page: ++this.page, query: this.searchQuery } })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(clearSearch());
  }
}
