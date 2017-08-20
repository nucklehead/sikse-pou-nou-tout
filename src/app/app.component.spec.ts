import { inject, async, TestBed } from '@angular/core/testing';

import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


import { ConferenceApp } from './app.component';
import { UserData } from '../providers/user-data';
import { ConferenceData } from '../providers/conference-data';
import { Storage } from '@ionic/storage';


import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  StorageMock
} from '../../test-config/mocks-ionic';

// TODO: Need to mock http
// https://www.joshmorony.com/test-driven-development-in-ionic-2-http-and-mocks/
describe('ConferenceApp Component', () => {
  let fixture;
  let component: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConferenceApp],
      imports: [
        IonicModule.forRoot(ConferenceApp),
        HttpModule
      ],
      providers: [
        UserData,
        ConferenceData,
        MockBackend,
        BaseRequestOptions,
        {
            provide: Http, 
            useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
                return new Http(mockBackend, options);
            },
            deps: [MockBackend, BaseRequestOptions]
        },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Storage, useClass: StorageMock },
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceApp);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ConferenceApp).toBe(true);   
  });

  it('should have two pages', () => {
    expect(component.appPages.length).toBe(4);
  });

});
