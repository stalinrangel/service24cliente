import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Observer, throwError } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
import { NotificationsService } from 'src/app/services/notifications.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;

  constructor(public http: HttpClient, public storage: StorageService, private noticationService: NotificationsService) {}
 
  public login(credentials:any) {
    if (credentials.email === null || credentials.password === null) {
      return throwError("Please insert credentials");
    } else {
      return Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void; error: (arg0: any) => void; }) => {
        this.http.post(`${environment.api}login/app`, credentials)
        .toPromise()
        .then(
          data => {
            this.usuario = data;
            console.log(data);
            this.storage.set('TUSV24',this.usuario.token);
            this.storage.setObject('userSV24', this.usuario.user);
            localStorage.setItem('userSV24', JSON.stringify(this.usuario.user));
            setTimeout(() => {
              this.noticationService.registrar_token();
            }, 6000);
            
            observer.next(true);
            observer.complete();
          },
          msg => {
            observer.error(msg.error);
            observer.complete();
          }); 
      });
    }
  }

  public loginSocial(credentials: { email: null; }) {
    if (credentials.email === null) {
      return throwError("Please insert credentials");
    } else {
      return Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void; error: (arg0: any) => void; }) => {
        this.http.post(`${environment.api}login/app`, credentials)
        .toPromise()
        .then(
          data => {
            this.usuario = data;
            
            this.storage.set('TUSV24',this.usuario.token);
            this.storage.setObject('userSV24', this.usuario.user);
            setTimeout(() => {
              this.noticationService.registrar_token();
            }, 6000);
            observer.next(true);
            observer.complete();
          },
          msg => {
            observer.error(msg.error);
            observer.complete();
          }); 
      });
    }
  }

  public registerSocial(credentials: { nombre: null; email: null; }) {
    if (credentials.nombre === null || credentials.email === null) {
      return throwError("Please insert credentials");
    } else {
      return Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void; error: (arg0: any) => void; }) => {
      	this.http.post(`${environment.api}usuarios`, credentials)
    		.toPromise()
    		.then(
    		data => {
          this.usuario = data;
          this.storage.set('TUSV24',this.usuario.token);
          this.storage.setObject('userSV24', this.usuario.usuario);
    			observer.next(true);
    			observer.complete();
    		},
    		msg => {
    			observer.error(msg.error);
    			observer.complete();
    		});
      });
    }
  }

  public register(credentials: { nombre: null; email: null; telefono: null; password: null; rpassword: null; }) {
    if (credentials.nombre === null || credentials.email === null  || credentials.telefono === null || credentials.password === null || credentials.rpassword === null) {
      return throwError("Please insert credentials");
    } else {
      return Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void; error: (arg0: any) => void; }) => {
      	this.http.post(`${environment.api}usuarios`, credentials)
    		.toPromise()
    		.then(
    		data => {
          this.usuario = data;
          this.storage.set('TUSV24',this.usuario.token);
          this.storage.setObject('userSV24', this.usuario.usuario);
          observer.next(true);
          observer.complete();
    			/*this.http.get(`${environment.api}usuarios/email/validar/`+credentials.email)
          .toPromise()
          .then(
          data => {
            observer.next(true);
            observer.complete();
          },
          msg => {
            observer.error(msg.error);
            observer.complete();
          });*/
    		},
    		msg => {
    			observer.error(msg.error);
    			observer.complete();
    		});
      });
    }
  }

  public sendCode(email: string): Observable<any>{
    return this.http.get(`${environment.api}password/cliente/`+email);
  }

  public verifyCode(code: string): Observable<any>{
    return this.http.get(`${environment.api}password/codigo/`+code);
  }

  public updatePassword(id: string,data: any,token: string): Observable<any>{
    return this.http.put(`${environment.api}usuarios/`+id+`?token=`+token, data);
  }
 
  public getUserInfo() {
    return this.storage.getObject('userSV24');
  }
 
  public logout() {
    return Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void; }) => {
      observer.next(true);
      observer.complete();
    });
  }
}
