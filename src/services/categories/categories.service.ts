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
  getCategory(id:any): Observable<any>{
    return this.http.get(`${environment.api}catprincipales/categorias?ciudad_id=`+id);
  }

  /* GET services */
  getServices(id:any, zona_id:any): Observable<any>{
    return this.http.get(`${environment.api}subcategorias/`+id+`/productos?zona_id=`+zona_id);
  }

  /* GET services en curso */
  getTracking(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}usuarios/`+id+`/pedidos/encurso?token=`+token);
  }

  /* GET services en historial */
  getHistory(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}usuarios/`+id+`/pedidos/finalizados?token=`+token);
  }

  getProviders(zona_id:any): Observable<any>{
    return this.http.get(`${environment.api}productos?zona_id=`+zona_id);
  }

  getDetailProviders(id:any): Observable<any>{
    return this.http.get(`${environment.api}productos/`+id);
  }

  getFavorites(id:any): Observable<any>{
    return this.http.get(`${environment.api}favoritos/`+id);
  }

  deleteFavorites(id:any): Observable<any>{
    return this.http.delete(`${environment.api}favoritos/`+id);
  }

  addFavorites(data:any,token:any): Observable<any>{
    console.log(data);
    return this.http.post(`${environment.api}favoritos?token=`+token,data);
  }

  checkFavorites(data:any,token:any): Observable<any>{
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

  getHorario(id:any): Observable<any>{
    return this.http.get(`${environment.api}horarios/`+id);
  }

}
