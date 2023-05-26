import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';

import {
  fetchPlayingNowStart,
  fetchTopRatedStart,
  fetchUpcomingStart,
  fetchPopularStart,
} from '../../store/home/home.actions';
import {
  selectHomePlayingNow,
  selectHomePopular,
  selectHomeTopRated,
  selectHomeUpcoming,
} from '../../store/home/home.selectors';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
})
export class HomeMainComponent implements OnInit {
  playingStart = fetchPlayingNowStart;
  topRatedStart = fetchTopRatedStart;
  upcomingStart = fetchUpcomingStart;
  popularStart = fetchPopularStart;

  playingMovies = selectHomePlayingNow;
  topRatedMovies = selectHomeTopRated;
  upcomingMovies = selectHomeUpcoming;
  popularMovies = selectHomePopular;

  constructor(private store: Store<AppState>, private titleService: Title) {
    this.titleService.setTitle('Home');
  }

  ngOnInit(): void {
    this.store.dispatch(this.topRatedStart({ payload: 1 }));
    this.store.dispatch(this.playingStart({ payload: 1 }));
    this.store.dispatch(this.upcomingStart({ payload: 1 }));
    this.store.dispatch(this.popularStart({ payload: 1 }));
  }
}
