import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { NavController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ObjetcserviceService } from './objetcservice.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  repartidor:any={
    repartidor:{
      plan:'{}'
    }
  };
  latLng:any;
  tipo_empresa:any;
  
  constructor(public storage: StorageService,private objService: ObjetcserviceService,private toastController: ToastController, public userService: UserService,public navCtrl: NavController, ) { 

    this.iniciar();
  }

  iniciar(){
    this.geolocate({});
    let items:any=this.storage.get('idRPSV24');
      if (items) {
          let items2:any=this.storage.get('TRPSV24');
          if (items2) {
            ////console.log('sd');
            this.userService.getStatus(items,items2).subscribe(
            data => {
              console.log(data);
             
              this.repartidor = data;
              localStorage.setItem('tipo_registro',this.repartidor.repartidor.usuario.registro.tipo);
              this.tipo_empresa=this.repartidor.repartidor.usuario.registro.tipo;
              this.getPlans();
            },
            msg => {
              //this.loading.dismiss();
              if(msg.status == 400 || msg.status == 401){ 
                this.storage.set('TRPSV24','');
                this.navCtrl.navigateRoot('login');
              }
            });
          }
      }
  }
  setTipo_empresa(tipo:any){
    this.tipo_empresa=tipo;
  }
  async geolocate(usuario_id:any){

		const options = { enableHighAccuracy: true };
		const coordinates = await Geolocation.getCurrentPosition(options);
		
		//console.log('Current position:', coordinates);
	
		this.latLng = {
		  lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
		};
    this.detectZone(coordinates);
  }
  public zona:any= {
    nombre: 'Desconocida',
    id: 1000,
    coordenadas: ''
  };
  detectZone(coordinates:any){
    let datos={
      lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
    }
    //console.log(datos);
    this.userService.getZona(datos).subscribe(
      data => {
        //console.log(data);
        if(data==-1){
          this.presentToast('Estas fuera del rango de alcance de Service24.');
          this.zona={
            id:-1,
            nombre:'No estas en una area de Service24'
          }
        }else{
          this.zona=data;
          this.presentToast('Estas en la zona: '+this.zona.nombre);
        }
        
        
      },
      msg => {
        //console.log(msg)
    })
  }

  getZone(){
    if (this.zona==undefined) {
      this.zona=localStorage.getItem('zona');
    }
    return this.zona;
  }
  
    
  setZone(zona:any){
    this.zona=zona;
    localStorage.setItem('zona',this.zona);
  }
  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000
    });
    toast.present();
  }
  getRepartidor(){
    return this.repartidor.repartidor;
  }

  getPlan(){
    return JSON.parse(this.repartidor.repartidor.plan);
  }


  data2:any;
	plans:any=[];
  getPlans(){
		let items1:any= this.storage.getObject('userRPSV24');
  			if (items1) {
  				let items:any=this.storage.get('TRPSV24');
		  			if (items) {
		  				this.userService.getPlans(items, items1.pais_id,this.tipo_empresa).subscribe(
					        data => {
					        	//console.log(data);
					       		this.data2 = data;
					       		this.plans = this.data2.Planes;
					       		//console.log(this.plans);
					        },
					        msg => {  
					        	//console.log(msg);
						    }
					    );
		  			}
  			}
	}

  miPlan(){
    let id=JSON.parse(this.repartidor.repartidor.plan);
    id=id.id;
    console.log(id,this.plans)
    for (let i = 0; i < this.plans.length; i++) {
      if(this.plans[i].id==id){
        return this.plans[i];
      }
    }
  }

  TRPSV24:any;
  idRPSV24:any;
  userRPSV24:any;
  get_TRPSV24(){
    if (this.TRPSV24==undefined) {
      this.TRPSV24=localStorage.getItem('TRPSV24');
    }
    return this.TRPSV24;
  }
  set_TRPSV24(data:any){
    console.log(data);
    this.TRPSV24=data;
    localStorage.setItem('TRPSV24',this.TRPSV24);
  }
  get_idRPSV24(){
    if (this.idRPSV24==undefined) {
      this.idRPSV24=localStorage.getItem('idRPSV24');
    }
    return this.idRPSV24;
  }
  set_idRPSV24(data:any){
    console.log(data);
    this.idRPSV24=data;
    localStorage.setItem('idRPSV24',this.idRPSV24);
  }
  get_userRPSV24(){
    if (this.userRPSV24==undefined) {
      this.userRPSV24=localStorage.getItem('userRPSV24');
    }
    return JSON.parse(this.userRPSV24);
  }
  set_userRPSV24(data:any){
    console.log(data);
    this.userRPSV24=JSON.stringify(data);
    localStorage.setItem('userRPSV24',this.userRPSV24);
  }

}
