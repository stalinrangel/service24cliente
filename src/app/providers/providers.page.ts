import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ModalController, ToastController, LoadingController } from '@ionic/angular';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { CategoriesService } from '../../services/categories/categories.service';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilterPage } from '../filter/filter.page';
import { StorageService } from '../../services/storage/storage.service';
import { LanguageService } from './../../services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Geolocation } from '@capacitor/geolocation';
import { GeneralService } from '../services/general.service';


@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {

  public data: any;
  public datos: any;
  public providers: any;
  public loading: any;
  public results: number = 0;
  public myLocation = {
    lat: 0,
    lng: 0
  }
  public searchTerm: string = '';
  public items: any = [];
  public languages: any = 'es';
  zona:any;
  public zone: any = {
    nombre: '',
    id: 1000,
    coordenadas: ''
  }
  public showItem: boolean = false;
  public show_notify: boolean = false;
  
  constructor(
  	private nav: NavController,
  	private objService: ObjectserviceService,
    private catService: CategoriesService,
    //private geolocation: Geolocation,
    private platform: Platform,
    public modalController: ModalController,
    public storage: StorageService,
    private languageService: LanguageService,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    //private events: Events,
    private loadingController: LoadingController,
    private generales: GeneralService
  ) { 
    this.languages = this.languageService.getLan();
  	this.data = this.objService.getCat();
    console.log(this.data)
    this.platform.ready().then(()=>{
      this.getCurrentPosition();
    })

    /*this.events.subscribe('changeZoneSV24', (userData: any) => {
      this.getServices(this.myLocation);
    }); */

    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    }); 
  }

  ionPageWillLeave() {
    //this.events.unsubscribe('changeZoneSV24');
  }

  ngOnInit() {
    
    //this.getServices({})
    this.geolocate();
    //this.getServices({})
  }
  async geolocate(){
		console.log('geolocate')
		const options = { enableHighAccuracy: true };
		const coordinates = await Geolocation.getCurrentPosition(options);
		
		console.log('Current position:', coordinates);
	
		const latLng = {
		  lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
		};
	
    console.log(latLng)
    this.getServices(latLng)
	  }

  getServices(location:any){
    console.log('get')
    this.storage.getObject('ZONESV24').then(items => {
      console.log(items)
      //if (items != '' && items != null) {
        //this.zone = items;
        //if (this.zone.id == '') {
        if (true) {
          this.zona=this.generales.getZone();
          console.log(this.zona);
        }
        this.items = []; 
        this.providers = []; 
        //this.presentLoadingWithOptions();    
        console.log('cat') 
        this.catService.getServices(this.data.id, this.zona.id).subscribe(
          data => {
            console.log('data')
          //  this.loading.dismiss();
            this.datos = data;
            this.providers = this.datos.productos; 
            console.log(this.providers)
            for (var i = 0; i < this.providers.length; ++i) {
              console.log(location,this.providers[i].establecimiento.lat,this.providers[i].establecimiento.lng);
              this.providers[i].distance = this.getDistance(location,this.providers[i].establecimiento.lat,this.providers[i].establecimiento.lng);
              if (this.providers[i].establecimiento.usuario != null) {
                if (this.providers[i].establecimiento.usuario.repartidor != null) {
                  this.providers[i].status = this.providers[i].establecimiento.usuario.repartidor.activo;
                  this.providers[i].plan = JSON.parse(this.providers[i].establecimiento.usuario.repartidor.plan);
                  //this.providers[i].promedio_calificacion=3;
                  if (this.providers[i].establecimiento.usuario.repartidor.activo != 4) {
                    this.items.push(this.providers[i])
                  }
                }
              }        
            } 
            //this.items = this.sortByKey1(this.items,'distance');
            //this.sort();
            console.log(this.items)
            this.results = this.items.length; 
            if (this.results == 0) {
              this.showItem = true;
            }    
          },
          msg => {      
            console.log(msg);
            this.loading.dismiss();
          }
        );
      //}
    });
  }

  getCurrentPosition(){
    /*let optionsGPS:any = {timeout: 7000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(optionsGPS)
    .then((position: { coords: { latitude: number; longitude: number; }; }) => {
      this.myLocation.lat = position.coords.latitude;
      this.myLocation.lng = position.coords.longitude;
      this.getServices(this.myLocation);
    })
    .catch((error: any) => {
      this.getServices(this.myLocation);
    })*/
  }

  rad(x:any) {
    return x * Math.PI / 180;
  };

  mToMiles(m:any) {return (m / 1000).toFixed(2);}

  getDistance = (p1:any, p2Lat:any, p2Lng:any) => {

    console.log(p1, p2Lat, p2Lng);
    var R = 6378137;
    var dLat = this.rad(p2Lat - p1.lat);
    var dLong = this.rad(p2Lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2Lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return this.mToMiles(d);
  };

  setProvider(item:any){
    if (item.status == 1) {
      this.objService.setExtras(item.id);
      this.objService.setCat(this.data);
      this.nav.navigateForward('detail-provider');
    } else {
      this.translate.get('SEARCH.notdisp').subscribe((res1: string) => {           
        this.presentToast(res1);
      });
    }
  }

  setSearch(){
    
  }

  setFilteredItems() {
    this.items = this.providers; 
    let val = this.searchTerm;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item: { nombre: string; }) => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
      this.results = this.items.length; 
    }
  }

  goFilter() {
    this.storage.getObject('ZONESV24').then(items => {
      if (items) {
        this.presentModal(items)
      }   
    });  
  }

  async presentModal(zone:any){
    const modal = await this.modalController.create({
      component: FilterPage,
      componentProps: { value: zone }
    });
    modal.onDidDismiss().then((close)=> {
          
    });
    return await modal.present();
  }

  async presentToast(text:any) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      duration: 15000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  async viewNotification() {
      const modal = await this.modalController.create({
        component: NotificationsComponent
      });
      modal.onDidDismiss().then((close)=> {  
        this.show_notify = false;  
      });
      return await modal.present();  
  }

  public sortByKey1(array:any, key:any) {
    console.log(array,key)
    return array.sort(function (a:any, b:any) {
        var x = parseFloat(a[key]); var y = parseFloat(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
  }

  sort(){
    /*this.items.sort((a:any, b:any) => {
      if (a.title.distance > b.title.distance) {
        return -1;
      }
      if (a.title.distance < b.title.distance) {
        return 1;
      }
      return 0;
    });*/
  }

  searchText: string = "";
  get filteredItems() {
    //return this.chats;
    return this.providers
    .filter((item:{establecimiento:any}) => item.establecimiento.nombre.toLowerCase().includes(this.searchText.toLowerCase()))
    .sort((a:any, b:any) => {
      return a.distance - b.distance;
    });
  }

}
