import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let mockSnack: any;
  beforeEach(() => {
    mockSnack = jasmine.createSpyObj('_snack', ['open']);
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        SnackbarService,
        {
          provide: MatSnackBar,
          useValue: mockSnack,
        },
      ],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar', () => {
    service.openSnackBar('message', true);
    expect(mockSnack.open).toHaveBeenCalledTimes(1);
  });
});
