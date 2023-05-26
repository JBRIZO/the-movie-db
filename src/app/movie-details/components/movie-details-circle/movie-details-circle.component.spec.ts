import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsCircleComponent } from './movie-details-circle.component';

describe('MovieDetailsCircleComponent', () => {
  let component: MovieDetailsCircleComponent;
  let fixture: ComponentFixture<MovieDetailsCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsCircleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
