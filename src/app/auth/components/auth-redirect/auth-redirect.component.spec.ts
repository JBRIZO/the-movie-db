import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthRedirectComponent } from './auth-redirect.component';
import { DebugElement } from '@angular/core';
import { AppState } from 'src/app/store/app.store';
import { selectCurrentUserLoading } from '../../store/auth.selectors';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AuthRedirectComponent', () => {
  let component: AuthRedirectComponent;
  let fixture: ComponentFixture<AuthRedirectComponent>;
  let el: DebugElement;
  let store: MockStore<AppState>;
  let paramValue = { request_token: 'asdfasd' };
  let queryParam = new BehaviorSubject<ParamMap>(convertToParamMap(paramValue));
  let mockRouter: any;

  beforeEach(async () => {
    (mockRouter = jasmine.createSpyObj('router', ['navigate'])),
      await TestBed.configureTestingModule({
        declarations: [AuthRedirectComponent],
        imports: [MatProgressSpinnerModule],
        providers: [
          provideMockStore(),
          {
            provide: Router,
            useValue: mockRouter,
          },
          {
            provide: ActivatedRoute,
            useValue: {
              queryParamMap: queryParam,
            },
          },
        ],
      }).compileComponents();
  });

  describe('AuthRedirectComponent with queryParams', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(AuthRedirectComponent);
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectCurrentUserLoading, true);
      queryParam.next(convertToParamMap(paramValue));
      spyOn(store, 'dispatch');
      component = fixture.componentInstance;
      fixture.detectChanges();
      el = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render content on loading', () => {
      component.currentUserLoading$ = of(true);
      fixture.detectChanges();
      const elements = el.queryAll(By.css('.auth-redirect'));
      expect(elements.length).toBe(1);
    });

    it('should not render content on loading', () => {
      component.currentUserLoading$ = of(false);
      fixture.detectChanges();
      const elements = el.queryAll(By.css('.auth-redirect'));
      expect(elements.length).toBe(0);
    });

    it('should dispatch if request Token', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe('AuthRedirectComponent with no queryParams', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(AuthRedirectComponent);
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectCurrentUserLoading, true);
      queryParam.next(convertToParamMap({}));
      spyOn(store, 'dispatch');
      component = fixture.componentInstance;
      fixture.detectChanges();
      el = fixture.debugElement;
    });

    it('should navigate if !request token', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(0);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    });
  });
});
