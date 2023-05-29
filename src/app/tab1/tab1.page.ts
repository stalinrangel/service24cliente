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



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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
    private languageService: LanguageService
  ) {
    this.platform.ready().then(()=>{
      //this.presentLoadingWithOptions();
      //this.tryGeolocation();
    });

    //this.events.subscribe('changeZoneSV24', (userData: any) => {
        this.zone = this.objService.getExtras();
        this.items = [];
        this.initCategory(1);
        this.showZone = true;
        var x:any = document.getElementById("toast");
        //x.className = "show";
        var y:any = document.getElementById("showZ");
        setTimeout(()=>{ 
          x.className = x.className.replace("show", ""); 
          setTimeout(()=>{ 
            this.zonen.run(()=>{  
              y.className = "desc";
              this.showZone = false; 
            })
          });  
        }, 5000);
    //});    
  }

  ngOnInit() {
  }

  ionPageWillLeave() {
    //this.events.unsubscribe('changeZoneSV24');
  }

  ionViewWillEnter() {
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
  }

  ionViewDidLoad(){
    this.languages = this.languageService.getLan();
    if (this.languages == 'undefined') {
      this.languages = 'es';
    } 
  }

  initCategory(id:any){
    this.catService.getCategory(id).subscribe(
        resp => {
          console.log(resp)
          this.empty = false;
          this.items = resp.catprincipales;        
        },
        error => {       
          console.log(error);
          this.items = [];
          this.empty = true;
        }
    );
  };

  doRefresh(event:any) {
    this.catService.getCategory(this.zone.ciudad_id).subscribe(
      resp => {
        this.items = resp.catprincipales;
        event.target.complete();        
      },
      error => {       
        this.items = [];
        event.target.complete();
      }
    );
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
    this.nav.navigateForward('/service-form');
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
}

