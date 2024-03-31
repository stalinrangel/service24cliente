import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ModalController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UserService } from '../../servicesproveedor/user.service';
import { StorageService } from '../../servicesproveedor/storage.service';
import { RefreshService } from '../../servicesproveedor/refresh.service';
import { Subscription } from 'rxjs';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  
  public datos: any;
  public datos1: any;
  public notifications:any;
  public showEmpty: boolean = false;
  //private subscription: Subscription;
  public loaded = false;

  constructor(
  	public modalCtrl: ModalController,
    public userService: UserService, 
    private storage: StorageService, 
    public refresh: RefreshService,public navCtrl: NavController, private objService: ObjetcserviceService
    
  ) { 
    /*this.subscription = this.refresh.formRefreshSource3$.subscribe((msg:any) => {
      this.getZone();
    });*/
   // this.getZone();
    this.storage.set('notifyGPROVSV24', '0');
  }

  ngOnInit() {
    console.log('notifi')
    this.getZone();
  }

  ionViewWillLeave() {
    //this.subscription.unsubscribe();
  }

  getZone(){
    let items:any=this.storage.getObject('userRPSV24');
      
      if (items) {
        let items2:any=this.storage.get('TRPSV24');
          if (items2) {
            this.userService.getCity(items.id,items2).subscribe(
            data => {
              this.datos = data;
              this.getNotify(this.datos.ciudad_id, items.id);
            },
            msg => {
              this.notifications = [];
              this.showEmpty = true;
            });
          }
      } else {
        this.notifications= [];
        this.showEmpty = true;
      }
    //});  
  }

  getNotify(ciudad_id:any, user_id:any){
    let items2:any=this.storage.get('TRPSV24');
      if (items2) {
        this.userService.getNotifications(ciudad_id,items2, user_id).subscribe(
        data => {
          
          this.datos1 = data;
          this.notifications = this.datos1.Notificaciones_generales;
          for (let i = 0; i < this.notifications.length; i++) {
            if (this.notifications[i].data) {
              this.notifications[i].data2=JSON.parse(this.notifications[i].data);
              if (this.notifications[i].data2.obj) {
                this.notifications[i].data2.obj=JSON.parse(this.notifications[i].data2.obj);
                this.notifications[i].obj= this.notifications[i].data2.obj;
              }
             
            }
            
            
          }
          console.log(this.notifications)
          this.ordenar();
          if (this.notifications.length == 0) {
            this.showEmpty = true;
          }
        },
        msg => {
          this.notifications = [];
          this.showEmpty = true;
        });
      } else {
        this.notifications = [];
        this.showEmpty = true;
      }
  }

  ordenar(){
    for (let i = 0; i < this.notifications.length; i++) {
      this.notifications[i].date=new Date(this.notifications[i].created_at);
    }
    setTimeout(() => {
      this.notifications.sort((a:any, b:any) => b.date.getTime() - a.date.getTime());
    }, 100);

   
  }

  closeModal() {
    this.modalCtrl.dismiss();
    this.objService.setNotify({});
  }

  get(notifi:any){
    let data:any='';
    try {
      console.log(notifi)
      let data=JSON.parse(notifi.data);
      console.log(notifi);
      this.visto(notifi.id);
      console.log(data);
      this.accions(notifi.accion,data)
    } catch (error) {
      console.log('no tiene data');
      console.log(notifi);
      if (notifi.data=="") {
        this.visto(notifi.id);
        console.log(data);
      }else{
        this.visto_general(notifi.id);
      }
    }

   this.objService.setNotify(notifi);
    //data.obj=JSON.parse(data.obj)
   
  }

  accions(i:any,data:any){

    if (i=='6') {
      this.navCtrl.navigateForward('/tabs/tab6');//creado
      setTimeout(() => {
        this.objService.setCreado(data);
        }, 100);
    }
    if (i=='7') {
      this.navCtrl.navigateForward('/tabs/tab7');//Aceptado
      setTimeout(() => {
        this.objService.setAceptado(data);
        }, 100);
    }
    if (i=='4') {
      this.navCtrl.navigateForward('/tabs/tab7');//En Camino
      setTimeout(() => {
        this.objService.setEncamino(data);
        }, 100);
    }
    if (i=='3') {
      this.navCtrl.navigateForward('/tabs/tab7'); //finalizados
      setTimeout(() => {
        this.objService.setfinalizados(data);
        }, 100);
    }
    if (i=='5') {
      this.navCtrl.navigateForward('/tabs/tab7'); //cancelados
      setTimeout(() => {
        this.objService.setcancelado(data);
        }, 100);
    }
    if (i=='8') {
      this.navCtrl.navigateForward('/tabs/tab7'); //chat pedido
      setTimeout(() => {
        this.objService.setchatpedido(data);
        }, 100);
    }
    if (i=='2') {
      this.navCtrl.navigateForward('/tabs/tab10');//char soporte
      setTimeout(() => {
        this.objService.setsoporte(data);
        }, 100);
    }
    if (i=='17') {
      this.navCtrl.navigateForward('/tabs/tab6'); //notificaciones generales 
      setTimeout(() => {
        this.objService.setgenerales(data);
        }, 100);
    }
    this.closeModal();
  }

  visto(id:any){
    let data={
      visto:1
    };
    this.userService.visto(id,data).subscribe(
      data => {
        console.log(data)
        this.getZone();
    },
    msg => {
      
    });  
  }  

  visto_general(id:any){
    let data={
      visto:1
    };
    this.userService.visto_generales(id,data).subscribe(
      data => {
        console.log(data)
        this.getZone();
    },
    msg => {
      
    });  
  }
}
