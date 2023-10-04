import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, IonicModule, NavController} from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class NotificationsComponent  implements OnInit {

  public datos: any;
  public datos1: any;
  public notifications: any;
  public showEmpty: boolean = false;

  constructor(
  	public modalCtrl: ModalController,
    public userService: UserService, 
    private storage: StorageService, 
    private objService: ObjectserviceService,
    public navCtrl: NavController
    //public events: Events
  ) { 
    /*this.events.subscribe('prov:notify', msg => {
      this.getZone();
    });*/
   
    this.storage.set('notifyGPROVSV24', '0');

    this.objService.getnotificaciones().subscribe((data:any) => {
			console.log(data)
      //alert('nnottifi');
      //this.getZone();
	  }); 
  } 

  ngOnInit() {
    this.getZone();
  }

  ionViewWillLeave() {
    //this.events.unsubscribe('prov:notify');
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
    },
    msg => {
      this.notifications = [];
      this.showEmpty = true;
    });  
  }

  closeModal() {
    this.objService.setNotify({});
    this.modalCtrl.dismiss();
  }

  get(notifi:any){
    this.visto(notifi.id);
    let data=JSON.parse(notifi.data);
    //data.obj=JSON.parse(data.obj)
    console.log(notifi);
    console.log(data);
    this.accions(notifi.accion,data)

    this.objService.setNotify(notifi);
  }

  accions(i:any,data:any){
   
    if (i=='7') {
      this.navCtrl.navigateForward('/tabs/tab2');//Aceptado
      setTimeout(() => {
        this.objService.setAceptado(data);
        }, 300);
    }
    if (i=='4') {
      this.navCtrl.navigateForward('/tabs/tab2');//En Camino
      setTimeout(() => {
        this.objService.setEncamino(data);
        }, 300);
    }
    if (i=='3') {
      this.navCtrl.navigateForward('/tabs/tab2'); //finalizados
      setTimeout(() => {
        this.objService.setfinalizados(data);
        }, 300);
    }
    if (i=='5') {
      this.navCtrl.navigateForward('/tabs/tab2'); //cancelados
      setTimeout(() => {
        this.objService.setcancelado(data);
        }, 300);
    }
    if (i=='8') {
      this.navCtrl.navigateForward('/tabs/tab2'); //chat pedido
      setTimeout(() => {
        this.objService.setchatpedido(data);
        }, 300);
    }
    if (i=='2') {
      this.navCtrl.navigateForward('/tabs/tab3');//char soporte
      setTimeout(() => {
        this.objService.setsoporte(data);
        }, 300);
    }
    if (i=='17') {
      this.navCtrl.navigateForward('/tabs/tab1'); //notificaciones generales 
      setTimeout(() => {
        this.objService.setgenerales(data);
        }, 300);
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
        
    },
    msg => {
      
    });  
  }

}