import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { CategoriesService } from '../../services/categories/categories.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { FormControl } from '@angular/forms';
// { OneSignal } from '@ionic-native/onesignal/ngx';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';
import { FilterPage } from '../filter/filter.page';
//import { Diagnostic } from '@ionic-native/diagnostic/ngx';
//import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
//import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../services/language/language.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Geolocation } from '@capacitor/geolocation';
import { NotificationsService } from '../services/notifications.service';
import { register } from 'swiper/element/bundle';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';

register();


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public config: SwiperOptions={
    zoom: {
      maxRatio: 5,
    },
  };

  public items: any;
  public loading: any;
  public token = {
    token_notificacion: null,
    token: null
  }
  areaTriangle: any = [];
  datosC: any;
  coordenates: any = [];
  triangleCoords = [];
  public inside: boolean=false;
  public showText: boolean = false;
  public zone: any = {
    nombre: '',
    id: 1000,
    coordenadas: ''
  }
  public showZone: boolean = false;
  public languages: any = 'es';
  public empty: boolean = false;
  public show_notify: boolean = false;

  constructor(
  	private nav: NavController,
  	private catService: CategoriesService,
    private storage: StorageService, 
  	private objService: ObjectserviceService,
    public loadingController: LoadingController,
    //private oneSignal: OneSignal,
    public userService: UserService,
    public modalController: ModalController,
    //public locationAccuracy: LocationAccuracy,
    private platform: Platform,
    //private geolocation: Geolocation,
    //private diagnostic: Diagnostic,
    private zonen: NgZone,
    //public events: Events,
    private translate: TranslateService,
    private languageService: LanguageService, 
    private noticationService: NotificationsService,
    private router: Router,
    private funciones_generales: GeneralService

  ) {

    this.objService.getNotify().subscribe((data:any) => {
      let items:any=this.storage.getObject('userRPSV24');
      this.getNotify(this.datos.ciudad_id,items.id);
    });

    console.log(this.router.url);
    this.objService.setruta(this.router.url);

    this.platform.ready().then(()=>{
      //this.presentLoadingWithOptions();
      //this.tryGeolocation();
    });

    //this.events.subscribe('changeZoneSV24', (userData: any) => {
        //this.zone = this.objService.getExtras();
        
        this.items = [];
        this.initCategory(1);
        this.showZone = true;
        var x:any = document.getElementById("toast");
        //x.className = "show";
        var y:any = document.getElementById("showZ");
        setTimeout(()=>{ 
          //x.className = x.className.replace("show", ""); 

          console.log(this.zone);
          setTimeout(()=>{ 
            this.zonen.run(()=>{  
              //y.className = "desc";
              this.showZone = false; 
            })
          });  
        }, 5000);
    //});    

    this.objService.getgenerales().subscribe((data:any) => {
			console.log(data)
      //alert('llego generales');
      this.viewNotification();
	  }); 
    this.getZone();
    this.objService.get_reload_chats_pedido().subscribe((data:any) => {
      this.getZone();
    });

    const mySwiper = new Swiper('.swiper-container', {
      zoom: true
    });
  }

  ngOnInit() {
    this.funciones_generales.iniciar();
    this.geolocate();
    setTimeout(() => {
      this.zone=this.funciones_generales.getZone();
      this.noticationService.registrar_token();
    }, 5000);

    this.objService.get_zona().subscribe((data:any) => {
			console.log(data)
      this.zone=data;
	  	});  
  }
  iniciar(){
    this.funciones_generales.iniciar();
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
    let geo=JSON.stringify(latLng);
    localStorage.setItem('geo',geo);
    
	}

  ionPageWillLeave() {
    //this.events.unsubscribe('changeZoneSV24');
  }

  ionViewWillEnter() {
    this.vistos=0;
    this.getZone();
    this.getIds();
    this.storage.getObject('ZONESV24').then(items => {
      if (items) {
        this.initCategory(items.ciudad_id);
      }
    });
    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      7} else {
        this.show_notify = false;
      }
    });
    this.geolocate();
  }

  ionViewDidLoad(){
    this.languages = this.languageService.getLan();
    if (this.languages == 'undefined') {
      this.languages = 'es';
    } 
  }
  publicidad:any;
  initCategory(id:any){
    this.catService.getCategory(id).subscribe(
        resp => {
          console.log(resp)
          this.empty = false;
          this.items = resp.catprincipales;       
          this.publicidad = resp.publicidad;    
        },
        error => {       
          console.log(error);
          this.items = [];
          this.empty = true;
        }
    );
  };

  usuario:any={
    nombre:''
  };
  datos:any;
  chat_support:any={
    admin_id:'',
    chat_id:'',
    token_notificacion:'',    
    ciudad_id:'',
  };
  public band_chatSupport: boolean = false;
  getIds(){
    this.storage.getObject('userSV24').then(items => {
      console.log(items)
      if (items != '' && items != null) {
    this.usuario = items;
    console.log(this.usuario)
    this.storage.get('TUSV24').then(items2 => {
        if (items2) {
        console.log(items2);
          //this.storage.getObject('ZONESV24').then(items3 => {
          //	if (items3) {
          //		console.log(items3);
              //this.userService.getId(this.usuario.id,items2,items3.ciudad_id).subscribe(
            this.userService.getId(this.usuario.id,items2,'1').subscribe(
                  data => {
                    console.log(data)
                    this.datos = data;
                    this.chat_support.admin_id = this.datos.chat.admin_id;
                    this.chat_support.chat_id = this.datos.chat.id;
                    this.chat_support.token_notificacion = this.datos.admin[0].token_notificacion;
                      this.chat_support.ciudad_id = this.datos.admin[0].ciudad;
                    this.band_chatSupport = true; 
                  },
                  msg => { 
                    console.log(msg);
                    if(msg.status == 404){ 
                   if (msg.error.admin) {
                     if (msg.error.admin.length > 0) {
                       this.band_chatSupport = true;
                            this.chat_support.admin_id = msg.error.admin[0].id;
                            this.chat_support.token_notificacion = msg.error.admin[0].token_notificacion;
                            this.chat_support.ciudad_id = msg.error.admin[0].ciudad;
                        }
                   }
                    } else if(msg.status == 409){
                      this.band_chatSupport = false;
                    }
                    if(msg.status == 400 || msg.status == 401){ 
                      this.storage.set('TUSV24','');
                         
                      }  
                   
                }
              );
          //	};
          //});
        };
      });
    }
    });
  }

  doRefresh(event:any) {
    this.geolocate();
    this.funciones_generales.iniciar();
    this.catService.getCategory('1').subscribe(
      resp => {
        this.items = resp.catprincipales;
        event.target.complete();        
      },
      error => {       
        this.items = [];
        event.target.complete();
      }
    );
    this.getZone();
  }

  setCategory(item:any){
  	this.objService.setExtras(item);
  	this.nav.navigateForward('category');
  }

  setSearch(){
    this.objService.setExtras(this.items);
    this.nav.navigateForward('search-filter');
  }

  goBack(){
    this.nav.navigateRoot('/init');
  }

  goForm(){
    //this.nav.navigateForward('/service-form');
    if (this.band_chatSupport) {		
			this.objService.setExtras(this.chat_support);
			this.nav.navigateForward('/chat-support');
		} else {
			
		}
    
  }

  /*async getCoordinates(end){
    await this.catService.getZones().subscribe(
      resp => {
        this.datosC = resp;
        this.triangleCoords = this.datosC.coordenadas;
        let band = 0;
        for (var i = 0; i < this.triangleCoords.length; ++i) {
          this.areaTriangle.push(new google.maps.Polygon({
            paths: JSON.parse(this.triangleCoords[i].coordenadas)
          }));
          this.inside = google.maps.geometry.poly.containsLocation(end, this.areaTriangle[i]);         
          if (this.inside) {
            this.zone = this.triangleCoords[i];
            console.log(this.zone)
            this.initCategory(this.zone.ciudad_id);
            this.storage.setObject('ZONESV24',this.zone);
            this.showZone = true;
            var x = document.getElementById("toast");
            x.className = "show";
            var y = document.getElementById("showZ");
            setTimeout(()=>{ 
              x.className = x.className.replace("show", ""); 
              setTimeout(()=>{ 
                this.zonen.run(()=>{  
                  y.className = "desc";
                  this.showZone = false; 
                })
              });  
            }, 5000); 
          } else {
            band += 1;
          }
        }
        if (this.areaTriangle.length == band) {
          console.log('no');
          this.translate.get('HOME.zone').subscribe((res1: string) => {           
             this.zone.nombre = res1;
          });   
          this.showZone = true;
          this.storage.setObject('ZONESV24',this.zone);
          var x = document.getElementById("toast");
          x.className = "show";
          var y = document.getElementById("showZ");
          setTimeout(()=>{ 
            x.className = x.className.replace("show", ""); 
            setTimeout(()=>{ 
              this.zonen.run(()=>{  
                y.className = "desc";
                this.showZone = false; 
              })
            });  
          }, 5000); 
        } else {
          console.log('si') 
        }; 
        
      },
      error => {       
        console.log(error);
       
      }
    );
  }*/

  /*tryGeolocation() {
    this.getUserPosition().then(
      data => {
        console.log(data.coords)
        var position = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
        this.getCoordinates(position);
      },
      msg => {   
             
      }
    );
  }*/

  /*getUserPosition() {
    return new Promise<any>(resolve => {
      const HIGH_ACCURACY = 'high_accuracy';
      if (this.platform.is('cordova')) {
        this.platform.ready().then(() => {
          this.diagnostic.isLocationEnabled().then(enabled => {
            if (enabled) {
              if (this.platform.is('android')) {
                this.diagnostic.getLocationMode().then(locationMode => {
                  if (locationMode === HIGH_ACCURACY) {
                    this.geolocation.getCurrentPosition({timeout: 30000, maximumAge: 0, enableHighAccuracy: true}).then(pos => {
                      resolve({
                        coords: {
                          latitude: pos.coords.latitude,
                          longitude: pos.coords.longitude
                        }
                      });
                    }).catch(error => resolve(error));
                  } else {
                   
                    this.askForHighAccuracy().then(available => {
                      if (available) {
                        this.getUserPosition().then(a => resolve(a), e => resolve(e));
                      }
                    }, error => resolve(error));
                  }
                });
              } else {
               
                this.geolocation.getCurrentPosition({timeout: 30000, maximumAge: 0, enableHighAccuracy: true}).then(pos => {
                  resolve({
                    coords: {
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude
                    }
                  });
                }).catch(error => resolve(error));
              }
            } else {
             
              this.locationAccuracy.request(1).then(result => {
                if (result) {
                  this.getUserPosition().then(result => resolve(result), error => resolve(error));
                }
              }, error => {
                resolve(error)
              });
            }
          }, error => {
            resolve(error)
          });
        });
      } else {
       
        this.geolocation.getCurrentPosition({timeout: 30000}).then(
          position => {
            resolve(position);
          }, error => resolve(error)
        );
      }
    });
  }*/

  /*askForHighAccuracy(): Promise<Geoposition> {
    return new Promise(resolve => {
      this.locationAccuracy
        .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
        this.geolocation.getCurrentPosition({timeout: 30000}).then(
          position => {
            resolve(position);
          }, error => resolve(error)
        );
      }, error => resolve(error));
    });
  }*/

  async goFilter() {
    console.log(this.zone);
    const modal = await this.modalController.create({
      component: FilterPage,
      componentProps: { value: this.zone }
    });
    modal.onDidDismiss().then((close)=> {
          
    });
    return await modal.present();
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

  getZone(){
    this.storage.getObject('userSV24').then(items => {
      if (items) {
        this.userService.getCity(items.id).subscribe(
        data => {
          this.datos = data;
          this.getNotify(this.datos.ciudad_id, items.id);
        },
        msg => {
          this.notifications = [];
          this.showEmpty = true;
        });
      } else {
        this.notifications = [];
        this.showEmpty = true;
      }
    });  
  }
  datos1:any;
  notifications:any;
  showEmpty:any;
  vistos=0;
  getNotify(ciudad_id:any, user_id:any){
    console.log(ciudad_id,user_id);
    this.userService.getNotifications(ciudad_id, user_id).subscribe(
      data => {
        console.log(data)
        this.datos1 = data;
        this.notifications = this.datos1.Notificaciones_generales;
        if (this.notifications.length == 0) {
          this.showEmpty = true;
        }
        this.notifications.sort((a:any, b:any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
        this.calcNotify();
    },
    msg => {
      this.notifications = [];
      this.showEmpty = true;
    });  
  }
  calcNotify(){
    this.vistos=0;
    for (let i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].visto==0) {
        this.vistos+=1;
      }
    }
  }

  async openPreview(img:any){
    const modal=await this.modalController.create({
      component: ImageModalPage,
      componentProps:{
        img
      },
      cssClass:'modal-contents'
    });
    modal.present();
  }

  proveedor(id:any){
    let ruta='detail-provider/'+id;
    this.nav.navigateForward(ruta);
  }

}

