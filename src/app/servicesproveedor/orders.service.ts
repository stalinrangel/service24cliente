import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) { }

  /* Get pedidos en espera */
  getInput(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}repartidores/`+id+'/pedido/enespera?token='+token);
  }

  /* Get pedidos en curso */
  getTracking(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}repartidores/`+id+'/pedido/encurso?token='+token);
  }

  /* Get pedidos finalizados */
  getHistory(id:any,month:any,year:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}repartidores/`+id+`/historial/pedidos?mes=`+month+`&anio=`+year+`&token=`+token);
  }

  /* Get categorias */
  getCategoriesP(token:any,ciudad:any): Observable<any>{
    return this.http.get(`${environment.api}catprincipales?ciudad_id=`+ciudad+`&token=`+token);
  }

  /* Get subcategorias */
  getSubcategories(token:any,ciudad:any): Observable<any>{
    return this.http.get(`${environment.api}categsub?ciudad_id=`+ciudad+`&token=`+token);
  }

  /* Get detalle de pedido */
  getOrderId(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}pedidos/`+id+'?token='+token);
  }

  /* Get servicios */
  getServices(id:any,token?:any): Observable<any>{
    return this.http.get(`${environment.api}establecimientos/`+id+`/productos?token=`+token);
  }

  /* Post servicios */
  addService(data:any,token?:any): Observable<any>{
    return this.http.post(`${environment.api}productos`,data);
  }

  /* Post de imagen de servicios */
  imageService(data:any,token:any): Observable<any>{
    return this.http.post(`${environment.api}imagenes?token=`+token,data);
  }

  /* Put aceptar servicios */
  acceptService(id:any,pedido_id:any,hora:any,token:any): Observable<any>{
    return this.http.put(`${environment.api}notificaciones/`+id+`/aceptar/pedido?pedido_id=`+pedido_id+`&hora_aceptado=`+hora+`&token=`+token,{});
  }

  /* Put finalizar servicios */
  finishService(id:any,data:any,token:any): Observable<any>{
    return this.http.put(`${environment.api}notificaciones/`+id+`/finalizar/pedido?token=`+token,data);
  }

  /* Enviar calificacion del servicio */
  sendCalification(data:any,token:any): Observable<any>{
    return this.http.post(`${environment.api}calificaciones?token=`+token,data);
  }

  /* Get subcategorias listas */
  getSubcategoriesID(token:any): Observable<any>{
    return this.http.get(`${environment.api}subcategorias?token=`+token);
  }

  /* Delete servicios */
  deleteService(id:any,token?:any): Observable<any>{
    return this.http.delete(`${environment.api}productos/`+id+`?token=`+token);
  }

  /* Put servicios */
  editService(data:any,id:any,token:any): Observable<any>{
    return this.http.put(`${environment.api}productos/`+id+`?token=`+token,data);
  }

  /* Cancelar servicio */
  cancelOrder(data:any,id:any,token:any): Observable<any>{
    return this.http.post(`${environment.api}cancelar_pedidos/`+id+`?token=`+token,data);
  }

  getZones(): Observable<any>{
    return this.http.get(`${environment.api}zonas`);
  }

  getCity(pais:any): Observable<any>{
    return this.http.get(`${environment.api}ciudad?pais_id=`+pais);
  }

  getCountries(): Observable<any>{
    return this.http.get(`${environment.api}pais`);
  }

  

}

