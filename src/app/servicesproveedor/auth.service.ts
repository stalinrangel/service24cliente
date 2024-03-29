import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';
//import { StorageService } from './storage.service';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;

  constructor(public http: HttpClient/*, public storage: StorageService*/) {}
 
  login(model: any): Observable<any> {
    console.log(model)
    //this.doGet();
    //this.get(`${environment.api}login/repartidores`);
    return this.http.post(`${environment.api}login/repartidores`, model)
  }

  register(model: any): Observable<any> {
    console.log(model)
    return this.http.post(`${environment.api}establecimientos`, model)
  }
  
  
  public verifySms(number: any, data: any): Observable<any>{
    return this.http.post(`${environment.api}verificar_numero/`+number, data);
  }

  public sendCode(email: any): Observable<any>{
    return this.http.get(`${environment.api}password/cliente/`+email);
  }

  public verifyCode(code: any): Observable<any>{
    return this.http.get(`${environment.api}password/codigo/`+code);
  }

  public updatePassword(id: any,data: any,token: any): Observable<any>{
    return this.http.put(`${environment.api}usuarios/`+id+`?token=`+token, data);
  }
 
  public getUserInfo() {
    return //this.storage.getObject('userSV24');
  }
 
  public logout() {
    //return Observable.create(observer => {
      //observer.next(true);
      //observer.complete();
    //});
  }
  get(url:any){
    /*if (isPlatform('capacitor')) {
      alert('capacitor')
      const { Http } = Plugins;
      return from(Http.request({
        method: 'GET',
      })
      ).pipe(map=>result.data);
    }else{
      alert('no capcitor')
    }*/
  }
  // Example of a GET request
 /* doGet = async () => {
    const options = {
      url: 'https://service24.app/apii/public/categorias',
      headers: { 'X-Fake-Header': 'Max was here' },
      params: { size: 'XL' },
    };
    alert('https://service24.app/apii/public/categorias')
    const response: HttpResponse = await Http.get(options);
    alert(JSON.stringify(response))
    
    let data:any=response;
    console.log(data.data.categorias)
    alert(JSON.stringify(data.data.categorias))
    // or...
    // const response = await Http.request({ ...options, method: 'GET' })
  }*/
}


