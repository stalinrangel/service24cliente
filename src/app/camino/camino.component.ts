import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { OrdersService } from 'src/services/orders/orders.service';

declare var google:any;

@Component({
  selector: 'app-camino',
  templateUrl: './camino.component.html',
  styleUrls: ['./camino.component.scss'],
})
export class CaminoComponent implements OnInit{

  @Input() data: any='';
  currentUser:any;
  coordenadas:any;
  constructor(private socket: Socket, private toastController: ToastController, private orderService: OrdersService) { 
    

    
  }

  ngOnInit() {
    console.log('encaminomap')
    this.socket.connect();
    let name = this.data;
    this.currentUser=name;

    this.socket.emit('set-name', name); 
    this.listen();
    this.orderService.getPos(this.data,'').subscribe(
      data => {
        
        this.coordenadas=data;
        this.coordenadas.lat=parseInt(this.coordenadas.lat);
        this.coordenadas.lng=parseInt(this.coordenadas.lng);
        console.log(this.coordenadas)
        this.createMap_con_coordenadas();
      },
      msg => {
        this.createMap();
      }
    );
   
   
  }

  init(id:any){
    this.socket.connect();
    let name = id;
    this.currentUser=id;
    this.currentUser= name;

    this.socket.emit('set-name', name); 

  }

  

  listen = ()=>{
    let self=this;
    this.socket.fromEvent(this.currentUser).subscribe({
      next(message:any){
        self.llego(message)
      }});
  }

  llego(data:any){
    //this.presentToast(JSON.stringify(data));
    console.log(data)
    const center = {  lat: data.msg.latitude, lng: data.msg.longitude };
    this.addMarker(center);
  }

  emitEvent=async (payload={})=> {
    console.log(payload);
    //console.log(this.socket);
    this.socket.emit('aaa', payload, (response: any) => {
      console.log('Server response:', response);
    });

    
  }

  
  map:any;
  

  async createMap_con_coordenadas() {

    

		const { Map } = await google.maps.importLibrary("maps");

		this.map = new Map(document.getElementById("map"), {
		center: this.coordenadas,
		zoom: 8,
		});

		const center = {  lat: this.coordenadas.lat, lng: this.coordenadas.lng, };
		// Create a bounding box with sides ~10km away from the center point
    this.addMarker(center);
	}


  async createMap() {

    

		const { Map } = await google.maps.importLibrary("maps");

		this.map = new Map(document.getElementById("map"), {
		center: { lat: environment.lat, lng: environment.lng },
		zoom: 8,
		});

		const center = {  lat: environment.lat, lng: environment.lng, };
		// Create a bounding box with sides ~10km away from the center point
    this.addMarker(center);
	}

  markers: any[] = [];
  marker:any=null;
  async addMarker(latLng:any){
		if (this.marker!=null) {
			this.marker.setMap(null);
		}
		
		this.map.panTo(latLng);
		this.map.setZoom(15);
		this.marker = new google.maps.Marker({
		  position: latLng,
		  map: this.map,
		});
	}

  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }
		
}
