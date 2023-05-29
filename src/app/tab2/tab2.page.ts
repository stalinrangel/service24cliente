import { Component, NgZone } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { CategoriesService } from '../../services/categories/categories.service';
import { StorageService } from '../../services/storage/storage.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { CalificationPage } from '../calification/calification.page';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsComponent } from '../notifications/notifications.component';

import * as moment from 'moment';

export interface OnEnter {
    onEnter(): Promise<void>;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public type: string = 'track';
	public rate = 5;
	public rate1 = 3;
	datos: any;
  	datos2: any;
  	orders: any;
  	history: any;
  	//private subscription: Subscription;
  	public califico: boolean = false;
  	public id: any;
  	public data: any;
  	public band = 0;
  	public show_notify: boolean = false;

	constructor(
		private nav: NavController,
		private catService: CategoriesService,
		private objService: ObjectserviceService,
		private storage: StorageService,
		private router: Router,
		//public events: Events,
		public modalController: ModalController,
		public zone: NgZone,
		private translate: TranslateService,
		private toastCtrl: ToastController
	){
		/*this.events.subscribe('viewOrder', (userData: string) => {
	    	this.type = userData;
	    	this.initOrder();
	    });
	    this.events.subscribe('trackingOrder', (userData: any) => {
	    	this.type = 'track';
	    	this.objService.setExtras(userData);
			this.nav.navigateForward('detail-order');
	    });
		this.events.subscribe('finishOrder', userData => {
	    	this.type = 'history';
	    	this.initHistory(); 
	    	this.id = userData;
	    });*/
	    this.initOrder();
	}

	ionPageWillLeave() {
	    /*this.events.unsubscribe('viewOrder');
	    this.events.unsubscribe('finishOrder');
	    this.events.unsubscribe('trackingOrder');*/
	} 
 
    ionViewWillEnter(){
    	this.initOrder();
    	this.storage.get('notifyGSV24').then(items => {
	      if (items == '1') {
	        this.show_notify = true;
	      } else {
	        this.show_notify = false;
	      }
	    });
    }

	async initOrder(){
    console.log('ini')
		await this.storage.getObject('userSV24').then(items => {
	      if (items != '' && items != null) {
	      	this.storage.get('TUSV24').then(items2 => {
	  			if (items2 != '' && items2 != null) {
	  				this.catService.getTracking(items.id,items2).subscribe(
				        data => {
						    this.datos = data;
						    this.zone.run(()=>{
						    	this.orders = this.datos.pedidos;
							    for (var i = 0; i < this.orders.length; ++i) {
							    	this.orders[i].tiempo = moment(this.orders[i].tiempo).format('DD/MM/YYYY');
							    }
							    this.orders = this.sortByKey(this.orders,'id');
						    })
						    this.initHistory();      
				        },
				        msg => {
				        	this.initHistory();
				            if(msg.status == 400 || msg.status == 401){
				            	this.storage.set('TUSV24','');  
				                this.nav.navigateForward('login');
				            } else if (msg.status == 404){
				            	this.orders = [];
				            }      
					    }
				    );
	  			}
		    });
		  } else {
		  	this.orders = [];
		  	this.initHistory();
		  }
	    });
	}

	async initHistory(){
		await this.storage.getObject('userSV24').then(items => {
	      if (items != '' && items != null) {
	      	this.storage.get('TUSV24').then(items2 => {
	  			if (items2 != '' && items2 != null) {
	  				this.catService.getHistory(items.id,items2).subscribe(
				        data => {
						    this.datos2 = data;
						    this.zone.run(()=>{
						    	this.history = this.datos2.pedidos; 
		    					for (var i = 0; i < this.history.length; ++i) {
							    	this.history[i].tiempo = moment(this.history[i].tiempo).format('DD/MM/YYYY');
							    	if (this.history[i].calificacion) {
					                  let index1 = this.history[i].calificacion.findIndex((item1:any) => item1.usuario_id === this.history[i].usuario_id);
					                  if(index1 !== -1){
					                    this.history[i].califico = true;
					                    this.history[i].puntaje = this.history[i].calificacion[index1].puntaje;
					                  } else {
					                    this.history[i].califico = false;
					                    if (this.history[i].id == this.id) {
						                  this.data = this.history[i];
						                  this.presentModal();
						                }
					                  }
					                }
					                
							    }
							    this.history = this.sortByKey(this.history,'id');   	
						    }) 
				        },
				        msg => {
				        	if(msg.status == 400 || msg.status == 401){ 
				                this.history = [];
				                this.storage.set('TUSV24','');
				                this.nav.navigateForward('login'); 
				            } else if (msg.status == 404){
				            	this.history = [];
				            }       
					    }
				    );
	  			}
		    });
		  } else {
		  	this.history = [];
		  }
	    });
	}

	viewDetails(item:any){
		if (item.estado != 5) {
			this.objService.setExtras(item.id);
			this.nav.navigateForward('detail-order');
		} else {
			this.translate.get('LISORDER.ordencancel').subscribe((res: string) => {           
				this.presentToast(res);
			});		
		}
	}

	doRefresh(event:any) {
	    this.initOrder();
	    setTimeout(()=> {
	      event.target.complete();
	    },300);
	}

	async presentModal() {
		if (this.band == 0) {
			this.id = null;
      		this.band = 1;
			const modal = await this.modalController.create({
			  component: CalificationPage,
			  componentProps: { value: this.data },
			  cssClass: 'calification-modal-css'
			});
			modal.onDidDismiss().then((close)=> {
			  if (close.data == 2) {
			    //this.events.unsubscribe('finishOrder');
			  	this.id = null;
			    this.initHistory(); 
			  }     
			});
			return await modal.present();
		}
	}

	public sortByKey(array:any, key:any) {
	    return array.sort(function (a:any, b:any) {
	        var x = a[key]; var y = b[key];
	        return ((x > y) ? -1 : ((x < y) ? 0 : 1));
	    });
	}

	async presentToast(text:any) {
	    const toast = await this.toastCtrl.create({
	      message: text,
	      duration: 2000
	    });
	    toast.present();
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

