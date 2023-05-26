import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { ListsActions } from '../../store/list-actions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lists-main',
  templateUrl: './lists-main.component.html',
})
export class ListsMainComponent implements OnInit {
  constructor(private store: Store<AppState>, private titleService: Title) {
    this.titleService.setTitle('My lists');
  }

  ngOnInit(): void {
    this.store.dispatch(ListsActions.loadLists({ page: 1 }));
  }
}
