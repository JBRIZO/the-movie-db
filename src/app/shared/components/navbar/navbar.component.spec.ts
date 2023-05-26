import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/store/app.store';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let el: DebugElement;
  let loader: HarnessLoader;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    store.overrideSelector(selectCurrentUserLogged, false);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the logo', () => {
    const logo = el.queryAll(By.css('#header-logo'));
    expect(logo.length).toBe(1);
  });

  it('should have the Available routes', () => {
    const routes = el.queryAll(By.css('#header-routes'))[0];
    const singleRoutes = routes.queryAll(By.css('#header-route'));
    expect(singleRoutes.length).toBe(4);
  });

  describe('Check Mobile UI', () => {
    beforeEach(() => {
      window.innerWidth = 320;
      window.innerHeight = 480;
      component.loggedIn$ = of(false);
    });

    afterAll(() => {
      window.innerWidth = window.innerWidth;
      window.innerHeight = window.innerHeight;
    });

    it('should have a button for mobile view', async () => {
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons.length).toBe(1);
    });

    it('should toggle on menu button click', async () => {
      component.optionsOpen = false;
      fixture.detectChanges();
      component.toggleOptions();
      expect(component.optionsOpen).toBeTrue();
      component.toggleOptions();
      expect(component.optionsOpen).toBeFalse();
    });

    it('should display not display dropdown for mobile menu button click', async () => {
      component.optionsOpen = false;
      fixture.detectChanges();
      let options = el.queryAll(By.css('#header-mobile'));
      expect(options.length).toBe(0);
    });

    it('should display dropdown with routes for mobile', async () => {
      component.optionsOpen = true;
      fixture.detectChanges();
      const newOptions = el.queryAll(By.css('#header-mobile'));
      expect(newOptions.length).toBe(1);
      const routes = newOptions[0].queryAll(By.css('#header-routes'))[0]
        .nativeElement;
      expect(routes.childNodes.length).toBe(6);
    });

    it('should close options when route click', async () => {
      component.optionsOpen = true;
      component.routeClick();
      fixture.detectChanges();
      expect(component.optionsOpen).toBeFalse();
    });
  });
});
