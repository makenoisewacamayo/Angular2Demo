/* tslint:disable forin */
declare var jasmine: any;
import {DebugElement} from '@angular/core/src/debug/debug_node';
import {Response, ResponseOptions} from '@angular/http';
import {By} from '@angular/platform-browser';

class MockResponse extends Response {
  private _json: any;

  constructor(json: any) {
    super(new ResponseOptions());
    this._json = json;
  }

  json(): any { return this._json; }
}

export class TestHelper {
  /** Gets a child DebugElement by tag name. */
  static getChildByTagName(parent: DebugElement, tagName: string): DebugElement {
    return parent.query((debugEl: DebugElement) => debugEl.nativeElement.tagName.toLowerCase() === tagName);
  }

  /**
   * Gets a child DebugElement by css selector.
   *
   * The child of DebugElement are other elements that are "known" to
   * Angular.
   */
  static getChildrenBySelector(parent: DebugElement, selector: string): DebugElement[] {
    const results: DebugElement[] = [];

    parent
      .queryAll(By.css(selector))
      .forEach((el: DebugElement) => results.push(el));
    parent
      .children
      .forEach((de: DebugElement) => {
        TestHelper
          .getChildrenBySelector(de, selector)
          .forEach((el: DebugElement) => results.push(el));
      });

    return results;
  }

  static isPhantomJS(): boolean {
    return navigator && navigator.userAgent && navigator
      .userAgent
      .indexOf('PhantomJS') > -1;
  }

  static mockJSONResponse(payload: any): MockResponse { return new MockResponse(payload); }
}

export class SpyObject {
  constructor(type?: any) {
    if (type) {
      for (const prop in type.prototype) {
        // tslint:disable-next-line:no-null-keyword
        let m: any = null;
        try {
          m = type.prototype[prop];
        } catch (e) {
          // As we are creating spys for abstract classes, these classes might have
          // getters that throw when they are accessed. As we are only auto creating spys
          // for methods, this should not matter.
        }
        if (typeof m === 'function') {
          this.spy(prop);
        }
      }
    }
  }

  spy(name: string): any {
    if ( !(this as any)[name] ) {
      (this as any)[name] = jasmine.createSpy(name);
    }
    return (this as any)[name];
  }

  prop(name: string, value: any): void {
    (this as any)[name] = value;
  }

}
