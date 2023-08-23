import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

declare var google:any;

@Component({
  selector: 'app-camino',
  templateUrl: './camino.component.html',
  styleUrls: ['./camino.component.scss'],
})
export class CaminoComponent implements OnInit{

  @Input() data: any='';
  constructor(private socket: Socket) { 
    

    
  }

  ngOnInit() {
    this.socket.connect();
    this.listen();

    //setTimeout(() => {
      this.createMap();
      //}, 500);
    console.log(this.data);

    setTimeout(() => {
      console.log('5')
      this.emitEvent('asd');
    }, 5000);
    setTimeout(() => {
      console.log('10')
      this.emitEvent('asd');
    }, 15000);
    setTimeout(() => {
      console.log('15')
      this.emitEvent('asd');
    }, 10000);
    setTimeout(() => {
      console.log('diconnect')
      this.socket.disconnect();
    }, 20000);
  }

  listen = ()=>{
    this.socket.fromEvent('myEvent').pipe(map((data) => console.log(data)));

    //this.ioSocket.on('event', res => this.outEven.emit(res))
  }

  emitEvent=async (payload={})=> {
    console.log(payload);
    //console.log(this.socket);
    this.socket.emit('aaa', 'aaa', (response: any) => {
      console.log('Server response:', response);
    });

    this.socket.emit('myEvent', 'myEvent', (response: any) => {
      console.log('Server response:', response);
    });
  }


  map:any;
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
		this.map.setZoom(19);
		this.marker = new google.maps.Marker({
		  position: latLng,
		  map: this.map,
		});
		
		
	}
		
}
