import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { NewListComponent } from './new-list.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('NewListComponent', () => {
  let component: NewListComponent;
  let fixture: ComponentFixture<NewListComponent>;

  const snackBarSpy = jasmine.createSpyObj('SnackbarService', ['openSnackBar']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [NewListComponent],
      providers: [
        { provide: SnackbarService, useValue: snackBarSpy },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
