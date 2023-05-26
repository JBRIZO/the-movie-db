import { NgOptimizedImage } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { fetchPlayingNowStart } from '../../../home/store/home/home.actions';
import { selectHomePopular } from '../../../home/store/home/home.selectors';
import { mockCarrouselResponse } from '../../../home/test/mock-selector';
import { CardComponent } from '../card/card.component';
import { CircleComponent } from '../card/components/circle/circle.component';
import { CarrouselComponent } from './carrousel.component';

describe('CarrouselComponent', () => {
  let component: CarrouselComponent;
  let fixture: ComponentFixture<CarrouselComponent>;
  let el: DebugElement;
  let mockStore: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrouselComponent, CardComponent, CircleComponent],
      imports: [
        InfiniteScrollModule,
        MatIconModule,
        NgOptimizedImage,
        MatProgressSpinnerModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrouselComponent);
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectHomePopular, mockCarrouselResponse);
    component = fixture.componentInstance;
    component.carrouselSelector = selectHomePopular;
    component.storeSubscription = of(true).subscribe();

    el = fixture.debugElement;
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    component.sectionTitle = 'title';
    component.cards = [];
    fixture.detectChanges();
    const title = el.queryAll(By.css('.carrousel-title'));
    const titleText = title[0].nativeNode.innerText;
    expect(titleText).toBe('title');
  });

  it('should render the cards', () => {
    fixture.detectChanges();
    const cards = el.queryAll(By.css('.carrousel__card'));
    expect(cards.length).toBe(20);
  });

  it('should Trigger on scroll', () => {
    spyOn(mockStore, 'dispatch');
    component.actionToPerform = fetchPlayingNowStart;
    component.page = 1;
    component.totalPages = 1;
    component.onScroll();
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    component.page = 1;
    component.totalPages = 10;
    component.onScroll();
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
