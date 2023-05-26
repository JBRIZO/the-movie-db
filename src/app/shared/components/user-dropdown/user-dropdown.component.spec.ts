import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/store/app.store';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { mockUser } from 'src/app/auth/test/mock-user';

import { UserDropdownComponent } from './user-dropdown.component';
import { MatDividerModule } from '@angular/material/divider';

describe('UserDropdownComponent', () => {
  let component: UserDropdownComponent;
  let fixture: ComponentFixture<UserDropdownComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDropdownComponent],
      imports: [MatIconModule, MatMenuModule, MatDividerModule],
      providers: [provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectCurrentUser, mockUser);
    fixture = TestBed.createComponent(UserDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  dipatch logout', () => {
    spyOn(store, 'dispatch');
    component.handleLogout();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
