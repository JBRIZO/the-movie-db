import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { ProfileComponent } from './profile.component';
import { mockUser } from 'src/app/auth/test/mock-user';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of<IUser>(mockUser));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userLoggedIn$ with the correct value from the store', () => {
    component.userLoggedIn$.subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });
});
