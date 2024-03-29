import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{

  message = '';
  messages :any= [];
  currentUser :any= '';
  items:any=this.storage.getObject('userRPSV24')

  constructor(public storage: StorageService,public userService: UserService ) { 
    //alert('entro socket')
    super({ 
      //url: 'http://localhost:3001',
      url: 'https://service24es.com:3001', 
      options: {
        /*query:{
          nameRoom: localStorage.getItem('sala')
        }*/
    } });
    //this.ioSocket.connect();


    let name = localStorage.getItem('sala');
    this.currentUser= name;

    this.ioSocket.emit('set-name', name);

//    this.listen();

    
  }

  init(id:any){
    this.ioSocket.connect();
    let name = id;
    this.currentUser=this.storage.get('idRPSV24');

    this.ioSocket.emit('set-name', name); 

  }

  listen(){
    let self=this;

    /*this.ioSocket.fromEvent('message').subscribe({
      next(message:any){
        self.messages.push(message);
      }});*/
  }

  sendMessage(payload:any) {
    console.log(payload)
   
    this.ioSocket.emit('send-message', { text: payload, id:this.items.id });

    const latLng = {
		  lat: payload.latitude,
		  lng: payload.longitude
		};
    
   
      console.log(this.items.id,latLng)
      this.userService.setPosition(this.items.id,latLng).subscribe(
        data => {
          console.log(data);
        },
        msg => {
        });

  }

  ionViewWillLeave() {
    this.ioSocket.disconnect();
  }
}
