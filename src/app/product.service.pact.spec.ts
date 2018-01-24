import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import * as Pact from 'pact-web';
import { ProductService } from './product.service';
import { eachLike, somethingLike, term } from 'pact-web/dsl/matchers';

describe('ProductService', () => {
  let provider: Pact.PactWebProvider;
  let productService: ProductService;

  beforeAll((done) => {
    provider = Pact({
      consumer: 'product-service-ui',
      provider: 'product-service-api'
    });
    setTimeout(done, 200);
    provider.removeInteractions();
  });

  afterAll((done) => {
    provider.finalize().then(done, e => done.fail(e));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpModule]
    });
    productService = getTestBed().get(ProductService);
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('getAll Products', () => {

    const productBody = {
      '$type' : somethingLike('MyServices.Product, MyServices'),
      Name : somethingLike('Coke Light'),
      Price : somethingLike(10.95),
      Id : somethingLike('3c9815eb-b649-4b22-877a-c27b153a0bd6')
    };
    const productExpectation = eachLike(productBody);

    beforeAll((done) => {
      provider.addInteraction({
        state: 'Get products',
        uponReceiving: 'A request for all products',
        withRequest: {
          method: 'GET',
          path : '/api/product/all'
      },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: productExpectation
      }}).then(done, e => done.fail(e));
    });

    it('should All product from webApi', (done) => {
      const products: any[] = [{
        '$type' : 'MyServices.Product, MyServices',
        Name : 'Coke Light',
        Price : 10.95,
        Id : '3c9815eb-b649-4b22-877a-c27b153a0bd6'
      }];

      productService.getAll().subscribe((response) => {
        expect(response).toEqual(products);
        done();
      });
    });


  });


});
