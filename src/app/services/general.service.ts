import { Injectable } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public latLng:any;
  public zona:any;

  constructor(public userService: UserService,private toastController: ToastController,) { 

    this.geolocate();
  }

  async geolocate(){
		console.log('geolocate')
		const options = { enableHighAccuracy: true };
		const coordinates = await Geolocation.getCurrentPosition(options);
		
		console.log('Current position in general:', coordinates);
	
		this.latLng = {
		  lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
		};
    this.detectZone(coordinates);
	}

  detectZone(coordinates:any){
    let datos={
      lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
    }
    this.userService.getZona(datos).subscribe(
      data => {
        console.log(data);
        if(data==0){
          this.presentToast('Estas fuera del rango de alcance de Service24.');
          this.zona={
            id:0
          }
        }else{
          this.zona=data;
          this.presentToast('Estas en la zona: '+this.zona.nombre);
        }
        
        
      },
      msg => {
        console.log(msg)
    })
  }
  
  getZone(){
    return this.zona;
  }

  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000
    });
    toast.present();
  }
}
