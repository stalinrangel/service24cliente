import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) { }

  /* Post order */
  setOrder(order:any): Observable<any>{
    return this.http.post(`${environment.api}pedidos`,order);
  }

  /* Get detalle de pedido */
  getOrderId(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}pedidos/`+id+'?token='+token);
  }

  /* Put finalizar servicios */
  finishService(id:any,data:any,token:any): Observable<any>{
    return this.http.put(`${environment.api}notificaciones/`+id+`/finalizar/pedido?token=`+token,data);
  }

  /* Enviar calificacion del servicio */
  sendCalification(data:any,token:any): Observable<any>{
    return this.http.post(`${environment.api}calificaciones?token=`+token,data);
  }

  /* Cancelar servicio */
  cancelOrder(data:any,id:any,token:any): Observable<any>{
    return this.http.post(`${environment.api}cancelar_pedidos/`+id+`?token=`+token,data);
  }

  /* Obtener ubicación */
  getPos(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}rep_pos/`+id+`?token=`+token);
  }

}
