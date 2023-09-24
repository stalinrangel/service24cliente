import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, public storage: StorageService) { }

  subir_imagen(data:any): Observable<any> {
    //return this.http.post('https://www.kangurodelivery.com/Pedido/php/subirImagenProducto.php',data)
    return this.http.post('https://service24.app/apii/public/images_uploads/upload.php',data)
    
  }  
  /* GET direcciones desde lat y lng */
  getDirections(lat:any,lng:any): Observable<any>{
    const apiKey = environment.maps;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    return this.http.get(url);
  }

  /* GET datos contacto */
  getContact(pais:any): Observable<any>{
    return this.http.get(`${environment.api}sistema/contacto?pais_id=`+pais);
  }

  /* GET id de chat con soporte */
  getId(id:any,token:any,ciudad:any): Observable<any>{
    return this.http.get(`${environment.api}chats/clientes/michat/`+id+'?ciudad_id='+ciudad+'&token='+token);
  }

  /* GET estadisticas de pedidos de usuario */
  getCount(id:any,token:any): Observable<any>{
    return this.http.get(`${environment.api}pedidos/estadisticas/`+id+'?token='+token);
  }

  /* PUT datos de usuario */
  setUser(id:any,token:any,data:any): Observable<any>{
    return this.http.put(`${environment.api}usuarios/`+id+'?token='+token, data);
  }

  /* PUT token notificacion */
  setNotify(id:any,token:any,data:any): Observable<any>{
    return this.http.put(`${environment.api}usuarios/`+id+'?token='+token, data);
  }

  /* Get lista de blogs */
  getBlogs(token:any): Observable<any>{
    return this.http.get(`${environment.api}blogs?token=`+token);
  }

  /* Post nuevo blog */
  setBlog(token:any,data:any): Observable<any>{
    return this.http.post(`${environment.api}blogs?token=`+token, data);
  }

  /* GET notificaciones */
  getNotifications(ciudad_id:any, user_id:any): Observable<any>{
    return this.http.get(`${environment.api}notificaciones_generales_t2?ciudad_id=`+ciudad_id+`&usuario_id=`+user_id);
  }

  /* Put vistos */
  visto(id:any,data:any): Observable<any>{
    return this.http.put(`${environment.api}notificaciones/`+id,data);
  }

  /* GET notificaciones */
  getCity(id:any): Observable<any>{
    return this.http.get(`${environment.api}usuario_zona/`+id);
  }

   /* GET terminos */
  getTerminos(id:any): Observable<any>{
    return this.http.get(`${environment.api}sistema/terminos?pais_id=`+id);
  }

  /* GET avisos */
  getPolice(id:any): Observable<any>{
    return this.http.get(`${environment.api}sistema/aviso?pais_id=`+1);
  }

  /* Post nuevo notificacion */
  setNotificacion(data:any): Observable<any>{
    return this.http.post(`${environment.api}notificacion`, data);
  }

  /* Post nuevo notificacion */
  error(data:any): Observable<any>{
    return this.http.post(`${environment.api}error`, data);
  }

  getChats(id:any): Observable<any>{
    return this.http.get(`${environment.api}chats/pedidos/cliente/`+id);
  }

  getZona(data:any): Observable<any>{
    return this.http.get(`${environment.api}zonas/detectar`,data);
  }
}
