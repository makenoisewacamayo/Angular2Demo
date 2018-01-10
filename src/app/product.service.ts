import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductService {
  constructor(private http: Http ) { }

  getAll(): Observable<any> {
    const headers: Headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.get(`api/product/all`,  {headers: headers})
      .map(response => response.json());
  }

}
