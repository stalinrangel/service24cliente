import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, IonicModule} from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    //public events: Events
  ) { 
    /*this.events.subscribe('prov:notify', msg => {
      this.getZone();
    });*/
   
    this.storage.set('notifyGPROVSV24', '0');
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
    },
    msg => {
      this.notifications = [];
      this.showEmpty = true;
    });  
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}