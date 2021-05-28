import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Puestos } from './puestos';

const localUrl = "./puestos.json";

@Injectable({
  providedIn: 'root'
})
export class GetdataService {


  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getData(): Observable<Puestos> {
    return this.http.get<Puestos>(localUrl)
  }
}


