import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/store/app.store';
import { MovieDetailsReviewsComponent } from './movie-details-reviews.component';

describe('MovieDetailsReviewsComponent', () => {
  let component: MovieDetailsReviewsComponent;
  let fixture: ComponentFixture<MovieDetailsReviewsComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsReviewsComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
