import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';

import { ProductService } from './product.service';

const products = {
  '3c9815eb-b649-4b22-877a-c27b153a0bd6' : {
    '$type': 'MyServices.Product, MyServices',
    Name: 'Coke Light',
    Price: 10.95,
    Id: '3c9815eb-b649-4b22-877a-c27b153a0bd6'
  },
  'f6409d0f-38ad-43a2-a5d4-ecf16351bf92': {
    '$type': 'MyServices.Product, MyServices',
    Name: 'Fanta',
    Price: 8.95,
    Id: 'f6409d0f-38ad-43a2-a5d4-ecf16351bf92'
  }
};

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        ProductService, {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });
  });

  it('ProductService.getAll method should return Observable<any>', inject([ProductService, MockBackend],
      fakeAsync((productService: ProductService, mockBackend: MockBackend) => {
        let res: any;
        mockBackend.connections.subscribe( (conn: MockConnection) => {
          expect(conn.request.url).toBe('/api/product/all');
          expect(conn.request.method).toEqual(RequestMethod.Get);
          expect(conn.request.headers.get('Access-Control-Allow-Origin')).toBe('*');
          const response: ResponseOptions = new ResponseOptions({
           body: JSON.stringify(products),
          });
          conn.mockRespond(new Response(response));
        });
        productService
          .getAll()
          .subscribe((_res: any) => {
            res = _res;
          });
        tick();
        expect(res).toEqual(jasmine.objectContaining({
          'f6409d0f-38ad-43a2-a5d4-ecf16351bf92' : {
            '$type' : 'MyServices.Product, MyServices',
            Name: 'Fanta',
            Price: 8.95,
            Id : 'f6409d0f-38ad-43a2-a5d4-ecf16351bf92'
        }}));
    }),
  ));
});
