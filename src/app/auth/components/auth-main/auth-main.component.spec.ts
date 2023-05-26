import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthMainComponent } from './auth-main.component';
import { AuthHttpService } from '../../services/auth-http.service';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';

describe('AuthMainComponent', () => {
  let component: AuthMainComponent;
  let fixture: ComponentFixture<AuthMainComponent>;
  let el: DebugElement;
  let loader: HarnessLoader;
  let authHttp: AuthHttpService;
  let mockHttp: any;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('authHttp', ['getToken']);
    await TestBed.configureTestingModule({
      declarations: [AuthMainComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],
      providers: [
        {
          provide: AuthHttpService,
          useValue: mockHttp,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthMainComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    authHttp = TestBed.inject(AuthHttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login button', () => {
    const button = el.queryAll(By.css('.login__button'));
    expect(button.length).toBe(1);
    const loginText = button[0].queryAll(By.css('.login__text'));
    expect(loginText[0].nativeNode.innerText).toBe('Login');
  });

  it('should show and hide spinner', async () => {
    component.loginStarted = false;
    fixture.detectChanges();
    let spinner = await loader.getAllHarnesses(MatProgressSpinnerHarness);
    expect(spinner.length).toBe(0);
    component.loginStarted = true;
    fixture.detectChanges();
    spinner = await loader.getAllHarnesses(MatProgressSpinnerHarness);
    expect(spinner.length).toBe(1);
  });

  it('should disable login button', () => {
    component.loginStarted = true;
    fixture.detectChanges();
    const button = el.queryAll(By.css('.login__button'));
    const disabled = button[0].nativeElement.disabled;
    expect(disabled).toBeTrue();
  });

  it('should navigate and set started to true', () => {
    mockHttp.getToken.and.returnValue(of(true));
    component.loginClick();
    fixture.detectChanges();
    expect(component.loginStarted).toBeTrue();
    expect(mockHttp.getToken).toHaveBeenCalledTimes(1);
  });
});
