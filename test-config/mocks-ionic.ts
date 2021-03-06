import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(_fn: Function, _priority?: number): Function {
    return (() => true);
  }

  public hasFocus(_ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(_container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(_ele: any, _eventName: string, _callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(_callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(_id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavMock {
 
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }
 
  public setRoot(): any {
    return true;
  }

  public registerChildNav(_nav: any): void {
    return ;
  }

}

export class DeepLinkerMock {

}

export class StorageMock {
    mockStorage: any;
    
    constructor(){
        this.mockStorage = {};
    }
    
    public get(name: string): Promise<any>  {
        return new Promise(resolve => {
          resolve(this.mockStorage[name]);
        });
    }
    public set(name: string, value: any) {
        this.mockStorage[name] = value;
        return;
    }
    public remove(name: string) {
        delete this.mockStorage[name];
        return;
    }
}