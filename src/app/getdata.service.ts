import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Puesto } from './puestos';
import { map } from 'rxjs/operators';

const localUrl = "../assets/data/puestos.json";

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

  getData(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(localUrl).pipe(
      map((data: Puesto[]) =>
        data.map(
          (item: Puesto) =>
            new Puesto(item.puestoId, item.puestoIdOficial, item.tipoVinculoNombre, item.puestoTipoNombre,
              item.catalogoNombre, item.adscripcionNombre, item.grupo1Id, item.grupo2Id, item.escala,
              item.disponibilidadPlena, new Date(item.fechaVigenciaInicio))
        )
      )
    );
  }
}


