import { SpyObject } from './test.helpers';
import { ProductService } from '../src/app/product.service';

export class MockProductService extends SpyObject {
  mockObservable: any;
  fakeResponse: any;
  getAll: any;

  constructor() {
    super(ProductService);
    this.fakeResponse = undefined;
    this.getAll = this.spy('getAll').and.returnValue(this);
  }

  subscribe(callback: Function): void {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): any[] {
    return [
      {
        provide: ProductService,
        useValue: this
      }
    ];
  }
}
