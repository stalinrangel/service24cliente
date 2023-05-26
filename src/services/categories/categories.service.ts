import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(public http: HttpClient) { }

  /* GET categories */
  getCategory(id): Observable<any>{
    return this.http.get(`${environment.api}catprincipales/categorias?ciudad_id=`+id);
  }

  /* GET services */
  getServices(id, zona_id): Observable<any>{
    return this.http.get(`${environment.api}subcategorias/`+id+`/productos?zona_id=`+zona_id);
  }

  /* GET services en curso */
  getTracking(id,token): Observable<any>{
    return this.http.get(`${environment.api}usuarios/`+id+`/pedidos/encurso?token=`+token);
  }

  /* GET services en historial */
  getHistory(id,token): Observable<any>{
    return this.http.get(`${environment.api}usuarios/`+id+`/pedidos/finalizados?token=`+token);
  }

  getProviders(zona_id): Observable<any>{
    return this.http.get(`${environment.api}productos?zona_id=`+zona_id);
  }

  getDetailProviders(id): Observable<any>{
    return this.http.get(`${environment.api}productos/`+id);
  }

  getFavorites(id): Observable<any>{
    return this.http.get(`${environment.api}favoritos/`+id);
  }

  deleteFavorites(id): Observable<any>{
    return this.http.delete(`${environment.api}favoritos/`+id);
  }

  addFavorites(data,token): Observable<any>{
    return this.http.post(`${environment.api}favoritos?token=`+token,data);
  }

  checkFavorites(data,token): Observable<any>{
    return this.http.post(`${environment.api}esfavoritos?token=`+token,data);
  }

  getZones(): Observable<any>{
    return this.http.get(`${environment.api}zonas`);
  }

  getCity(): Observable<any>{
    return this.http.get(`${environment.api}ciudad`);
  }

  getCountries(): Observable<any>{
    return this.http.get(`${environment.api}pais`);
  }

}
