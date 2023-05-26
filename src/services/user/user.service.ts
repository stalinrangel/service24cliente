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

  /* GET datos contacto */
  getContact(pais): Observable<any>{
    return this.http.get(`${environment.api}sistema/contacto?pais_id=`+pais);
  }

  /* GET id de chat con soporte */
  getId(id,token,ciudad): Observable<any>{
    return this.http.get(`${environment.api}chats/clientes/michat/`+id+'?ciudad_id='+ciudad+'&token='+token);
  }

  /* GET estadisticas de pedidos de usuario */
  getCount(id,token): Observable<any>{
    return this.http.get(`${environment.api}pedidos/estadisticas/`+id+'?token='+token);
  }

  /* PUT datos de usuario */
  setUser(id,token,data): Observable<any>{
    return this.http.put(`${environment.api}usuarios/`+id+'?token='+token, data);
  }

  /* PUT token notificacion */
  setNotify(id,token,data): Observable<any>{
    return this.http.put(`${environment.api}usuarios/`+id+'?token='+token, data);
  }

  /* Get lista de blogs */
  getBlogs(token): Observable<any>{
    return this.http.get(`${environment.api}blogs?token=`+token);
  }

  /* Post nuevo blog */
  setBlog(token,data): Observable<any>{
    return this.http.post(`${environment.api}blogs?token=`+token, data);
  }

  /* GET notificaciones */
  getNotifications(ciudad_id, user_id): Observable<any>{
    return this.http.get(`${environment.api}notificaciones_generales_t2?ciudad_id=`+ciudad_id+`&usuario_id=`+user_id);
  }

  /* GET notificaciones */
  getCity(id): Observable<any>{
    return this.http.get(`${environment.api}usuario_zona/`+id);
  }

   /* GET terminos */
  getTerminos(id): Observable<any>{
    return this.http.get(`${environment.api}sistema/terminos?pais_id=`+id);
  }

  /* GET avisos */
  getPolice(id): Observable<any>{
    return this.http.get(`${environment.api}sistema/aviso?pais_id=`+id);
  }
}
