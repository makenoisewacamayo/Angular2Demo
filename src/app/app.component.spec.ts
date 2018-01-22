import { async, TestBed, fakeAsync, inject, tick, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductService } from './product.service';
import { MockProductService } from '../../test/product.service.mock';


const products = {
  '3c9815eb-b649-4b22-877a-c27b153a0bd6': {
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

describe('AppComponent', () => {
  const mockProductService: MockProductService = new MockProductService();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        mockProductService.getProviders()
      ]
    }).compileComponents();
  }));

  it('should create the app', fakeAsync(
    inject([ProductService], (productService: MockProductService)  => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
  })));

  it(`should have as title 'app'`, fakeAsync(
    inject([ProductService], (productService: MockProductService) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('app');
  })));

  it('should render title in a h1 tag', fakeAsync(
    inject([ProductService], (productService: MockProductService) => {
      const fixture = TestBed.createComponent(AppComponent);
      productService.setResponse(products);
      tick();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(productService.getAll).toHaveBeenCalled();
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  })));
});
