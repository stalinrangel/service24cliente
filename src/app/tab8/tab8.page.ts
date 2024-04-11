import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { StorageService } from '../servicesproveedor/storage.service';
import { UserService } from '../servicesproveedor/user.service';
//import { Facebook } from '@ionic-native/facebook/ngx';
import { ObjetcserviceService } from '../servicesproveedor/objetcservice.service';
import { OrdersService } from '../servicesproveedor/orders.service';
import { NotificationsPage } from '../proveedor/notifications/notifications.page';
import { RefreshService } from '../servicesproveedor/refresh.service';
import { Subscription } from 'rxjs';
import { LocationTrackerService } from '../servicesproveedor/location-tracker.service';
import { IonRatingStarsModule } from 'ion-rating-stars';
import { NotificationsService } from '../servicesproveedor/notifications.service';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';
import { FilterPage } from '../filter/filter.page';
import { GeneralService } from '../servicesproveedor/general.service';
import { ContactModalPage } from '../contact-modal/contact-modal.page';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page  {

  public usuario = {
		id: '',
		nombre: 'Usuario',
		imagen:'assets/profile-general.png',
		promedio_calificacion: 0,
		repartidor: {
			activo: 1
		},
		direccion: ''
	};
	public promedio_calificacion: number = 0;
	public datos: any;
	public datos1: any;
	public datos2: any;
	public datos3: any;
	public datos4: any;
	public band_chatSupport: boolean = false;
	public chat_support = {
		admin_id: '',
		chat_id: '',
		token_notificacion: '',
		ciudad_id: ''
	};
	public encurso: number = 0;
	public finalizado: number = 0;
	public direccion: string = '';
	public email: string = '';
	public telefono: string = '';
	public itemsInCart: any;
	public type: string = "track";
	public calificaciones: any;
	public status: number = 0;
	public services: any = [];
	public info: string = 'Debes iniciar sesión para comunicarte con nuestro soporte.';
	public show_notify: boolean = false;
	//private subscription1: Subscription;
	//private subscription2: Subscription;
	//private subscription3: Subscription;

	constructor(
		public navCtrl: NavController, 
		private alertController: AlertController,  
		private storage: StorageService, 
		public userService: UserService, 
		//private facebook: Facebook,
		private toastCtrl: ToastController,
		public refresh: RefreshService,
		private objService: ObjetcserviceService,
		private objService2: ObjectserviceService,
		public orderService: OrdersService,
		public cdr: ChangeDetectorRef,
		public modalController: ModalController,
		public locationTracker: LocationTrackerService,
		private noticationService: NotificationsService,
		private router: Router,
		private funciones_generales: GeneralService
	) {
		console.log(this.router.url);
    	this.objService.setruta(this.router.url); 

		this.objService.getNotify().subscribe((data:any) => {
			let items:any=this.storage.getObject('userRPSV24');
			this.getNotify(this.datos.ciudad_id,items.id);
		  });

		this.getContact();
		//this.initStatus();
		this.objService.getUser().subscribe((data:any) => {
			console.log(data)
			let items:any=this.storage.getObject('userRPSV24');
				if (items != '' && items != null) {
				  console.log('tab3')
				  console.log(items)
				  this.usuario = items;
				  this.promedio_calificacion = this.usuario.promedio_calificacion;
				}
		});
		this.objService.getsoporte().subscribe((data:any) => {
			console.log(data)
			this.initStatus2();	
	  	});  
		this.objService.get_reload_chats_pedido().subscribe((data:any) => {
		// alert('sds');
			this.getZone();
		});
		
		  setTimeout(() => {
			this.noticationService.registrar_token();
		  }, 5000);

		  this.getZone();
	}

	ionViewWillLeave() {
		//this.subscription1.unsubscribe();
		//this.subscription2.unsubscribe();
		//this.subscription3.unsubscribe();
	}

	ionViewWillEnter() { 
		this.vistos=0;
		this.getZone();
		this.objService.getUser().subscribe((data:any) => {
			console.log(data)
			let items:any=this.storage.getObject('userRPSV24');
			console.log(items)
				if (items != '' && items != null) {
				  console.log('tab3')
				  this.usuario = items;
				  this.promedio_calificacion = this.usuario.promedio_calificacion;
				}
		});
		this.initStatus();
		let items:any= this.storage.get('notifyGPROVSV24');
	      if (items == '1') {
	        this.show_notify = true;
	      } else {
	        this.show_notify = false;
	      }

	    /*this.subscription1 = this.refresh.formRefreshSource2$.subscribe((msg:any) => {
			this.initStatus();
			this.cdr.detectChanges();
		})
		this.subscription2 = this.refresh.formRefreshSource1$.subscribe((msg:any) => {
			this.initStatus();
			this.cdr.detectChanges();
		})
		this.subscription3 = this.refresh.formRefreshSource3$.subscribe((msg:any) => {
	    	this.show_notify = true;
	    });*/
  	}

  	ionViewDidLoad(){
  	}
	pedidos=0;
  	initStatus(){ 
      let items:any=this.storage.getObject('userRPSV24');
	      if (items) {
	      	console.log(items)
	      	this.usuario = items;
			this.promedio_calificacion = this.usuario.promedio_calificacion;
			if (items.registro != null) {
				if (items.registro.tipo == 2 && items.registro.logo) {
					this.usuario.imagen = items.registro.logo;
				}
			}
	      let items2:any= this.storage.get('TRPSV24');
	          if (items2) {
	            this.userService.getId(this.usuario.id,items2,items.ciudad).subscribe(
		        data => {
		        	console.log(data)   
		        	this.datos = data;
					this.pedidos=this.datos.pedidos;
			        this.chat_support.admin_id = this.datos.chat.admin_id;
			        this.chat_support.chat_id = this.datos.chat.id;
			        this.chat_support.token_notificacion = this.datos.admin[0].token_notificacion;
		          	this.chat_support.ciudad_id = this.datos.admin[0].ciudad;
			        this.band_chatSupport = true;    
			        this.promedio_calificacion = this.datos.promedio_calificacion;
			        this.calificaciones = this.datos.calificaciones;
			        this.calificaciones = this.sortByKey1(this.calificaciones,'created_at');
			        this.status = this.datos.activo;
			        if (this.datos.direccion) {
			 			this.usuario.direccion = this.datos.direccion;
			 		}
			        this.getServices();
		        },
		        msg => { 
		        console.log(msg)    
			      	if(msg.status == 404){ 
			 			if (msg.error.admin) {
			 				if (msg.error.admin.length > 0) {
			 					this.band_chatSupport = true;
			          			this.chat_support.admin_id = msg.error.admin[0].id;
			          			this.chat_support.token_notificacion = msg.error.admin[0].token_notificacion;
			          			this.chat_support.ciudad_id = msg.error.admin[0].ciudad;
				      		}
			 			}
			 			this.promedio_calificacion = msg.error.promedio_calificacion;
			 			this.calificaciones = msg.error.calificaciones; 
			 			this.calificaciones = this.sortByKey1(this.calificaciones,'created_at');
			 			this.status = msg.error.activo;
			 			if (msg.error.direccion) {
			 				this.usuario.direccion = msg.error.direccion;
			 			}
			 			this.getServices();
			        } else if(msg.status == 409){
			          	this.band_chatSupport = false;
			          	this.info = msg.error.Error;
			          	this.promedio_calificacion = msg.error.promedio_calificacion;
						this.calificaciones = msg.error.calificaciones; 
						this.calificaciones = this.sortByKey1(this.calificaciones,'created_at');
						this.status = msg.error.activo;
						if (msg.error.direccion) {
							this.usuario.direccion = msg.error.direccion;
						}
			          	this.getServices();
			        }
			        if(msg.status == 400 || msg.status == 401){ 
			        	this.storage.set('TRPSV24','');
			        	this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
		                this.navCtrl.navigateForward('login-proveedor');
		            }  
			    }
		    	);
	          }
	      }  
	}
	initStatus2(){ 
		let items:any=this.storage.getObject('userRPSV24');
			if (items) {
				console.log(items)
				this.usuario = items;
			  this.promedio_calificacion = this.usuario.promedio_calificacion;
			  if (items.registro != null) {
				  if (items.registro.tipo == 2 && items.registro.logo) {
					  this.usuario.imagen = items.registro.logo;
				  }
			  }
			let items2:any= this.storage.get('TRPSV24');
				if (items2) {
				  this.userService.getId(this.usuario.id,items2,items.ciudad).subscribe(
				  data => {
					  console.log(data)   
					  this.datos = data;
					  this.chat_support.admin_id = this.datos.chat.admin_id;
					  this.chat_support.chat_id = this.datos.chat.id;
					  this.chat_support.token_notificacion = this.datos.admin[0].token_notificacion;
						this.chat_support.ciudad_id = this.datos.admin[0].ciudad;
					  this.band_chatSupport = true;    
					  this.promedio_calificacion = this.datos.promedio_calificacion;
					  this.calificaciones = this.datos.calificaciones;
					  this.calificaciones = this.sortByKey1(this.calificaciones,'created_at');
					  this.status = this.datos.activo;
					  if (this.datos.direccion) {
						   this.usuario.direccion = this.datos.direccion;
					   }
					  this.getServices();
					  this.support();	
				  },
				  msg => { 
				  console.log(msg)    
						if(msg.status == 404){ 
						   if (msg.error.admin) {
							   if (msg.error.admin.length > 0) {
								   this.band_chatSupport = true;
									this.chat_support.admin_id = msg.error.admin[0].id;
									this.chat_support.token_notificacion = msg.error.admin[0].token_notificacion;
									this.chat_support.ciudad_id = msg.error.admin[0].ciudad;
								}
						   }
						   this.promedio_calificacion = msg.error.promedio_calificacion;
						   this.calificaciones = msg.error.calificaciones; 
						   this.calificaciones = this.sortByKey1(this.calificaciones,'created_at');
						   this.status = msg.error.activo;
						   if (msg.error.direccion) {
							   this.usuario.direccion = msg.error.direccion;
						   }
						   this.getServices();
						   this.support();	
					  } else if(msg.status == 409){
							this.band_chatSupport = false;
							this.info = msg.error.Error;
							this.promedio_calificacion = msg.error.promedio_calificacion;
						  this.calificaciones = msg.error.calificaciones; 
						  this.calificaciones = this.sortByKey1(this.calificaciones,'created_at');
						  this.status = msg.error.activo;
						  if (msg.error.direccion) {
							  this.usuario.direccion = msg.error.direccion;
						  }
							this.getServices();
							this.support();	
					  }
					  if(msg.status == 400 || msg.status == 401){ 
						  this.storage.set('TRPSV24','');
						  this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
						  this.navCtrl.navigateForward('login-proveedor');
					  }  
				  }
				  );
				}
			}  
	  }

  	getContact(){
  		let items:any=this.storage.getObject('userRPSV24');
			if (items) {
				this.userService.getContact(items.pais_id).subscribe(
			        data => {
			          this.datos4 = data;
				        this.direccion = this.datos4.contacto.direccion;
				        this.email = this.datos4.contacto.correo;
				        this.telefono = this.datos4.contacto.telefono;       
			        },
			        msg => {       
			        	console.log(msg);       
			        }
			    );
			}
	};

	getServices(){
	  	let items:any=this.storage.getObject('userRPSV24');
			if (items) {
				let items2:any=this.storage.get('TRPSV24');
		  			if (items2) {
		  				let id = items.establecimiento.id;
		  				this.orderService.getServices(id,items2).subscribe(
				        data => {
				          this.services = [];
					      this.datos = data;
					      this.services = this.datos.productos;
					      this.services = this.sortByKey(this.services,'nombre');
					    },
					    msg => {
					      if(msg.status == 400 || msg.status == 401){ 
					      	this.storage.set('TRPSV24','');
					        this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
					        this.navCtrl.navigateRoot('login-proveedor');
					      }
					    });
		  			}
			}	
	}

	salir(){
    this.logout();
		/*this.facebook.getLoginStatus()
		.then(rta => {
		  if(rta.status == 'connected'){
		  	this.facebook.logout()
		    .then(rta => {
		      this.logout();
		    })
		    .catch(error =>{
		      this.logout();
		    });
		  } else {
		  	this.logout();
		  }
		})
		.catch(error =>{
		  	this.logout();
		});*/
		this.band_chatSupport = false;	
	}

	logout(){
		this.navCtrl.navigateRoot('login-proveedor');
		let items:any=this.storage.getObject('userRPSV24');
			if (items) {
				let items2:any=this.storage.get('TRPSV24');
		  			if (items2) {
		  				let id = items.id;
		  				this.userService.logout(id,items2).subscribe(
				        data => {
				          this.storage.set('TRPSV24','');
					      this.storage.setObject('userRPSV24', '');
					      this.storage.set('idRPSV24', '');
					      this.storage.set('notify_RPSV24','');
						  this.storage.set('TUSV24','');
							this.funciones_generales.setObject('userSV24', '');
							this.funciones_generales.set('pedido_idTHLP', '');
							this.funciones_generales.set('token_notificacionUSV24','');
					      this.usuario.id = '';
					      this.usuario.imagen = 'assets/profile-general.png';
					      this.usuario.nombre = 'Usuario';
					      this.promedio_calificacion = 0;
					      this.storage.remove('formLocalRSV24');
					      this.locationTracker.stopT();
						  localStorage.setItem('userSV24', '');
					      this.navCtrl.navigateRoot('tabs/tab1');
						  setTimeout(() => {
							this.objService2.setcerrarSesion(true);
						  }, 1000); 
						  
						  
					    },
					    msg => {
					      if(msg.status == 400 || msg.status == 401){ 
					      	  this.storage.set('TRPSV24','');
						      this.storage.setObject('userRPSV24', '');
						      this.storage.set('idRPSV24', '');
						      this.storage.set('notify_RPSV24','');
						      this.usuario.id = '';
						      this.usuario.imagen = 'assets/profile-general.png';
						      this.usuario.nombre = 'Usuario';
						      this.promedio_calificacion = 0;
						      this.storage.remove('formLocalRSV24');
						      this.locationTracker.stopT();
							  localStorage.setItem('userSV24', '');
						      this.navCtrl.navigateRoot('tabs/tab1');
							  setTimeout(() => {
								this.objService2.setcerrarSesion(true);
							  }, 1000); 
					      }
					    });
		  			}
			}
	}

	editProfile(){
		this.navCtrl.navigateForward('proveedor/edit-profile');
	}

	async presentConfirm() {
	    const alert = await this.alertController.create({
		message: '¿Desea cerrar sesión de Service 24 Proveedores?',
		buttons: [
	        {
	          text: 'No',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        },
	        {
	          text: 'Si',
	          handler: () => {
	          	this.salir();
	          }
	        }
	      ]
		});
		await alert.present();
	}

	async presentAlert() {
		this.userService.getContact('1').subscribe(
			data => {
				console.log(data)
			  this.datos4 = data;
				this.direccion = this.datos4.contacto.direccion;
				this.email = this.datos4.contacto.correo;
				this.telefono = this.datos4.contacto.telefono; 
				this.alert1(this.datos4.contacto);
				     
			},
			msg => {       
			  console.log(msg);
			}
		);
	}

	async alert1(text:any){
		console.log(text)
		/*let alert =  await this.alertController.create({
		    header: text,
		    cssClass: 'mail-contact',
		   message: `
	        <p>`+this.direccion+`</p>
	        <a class="mail-contact" href="mailto:`+this.email+`?subject=`+text+`" "contacto">`+this.email+`</a>
	        <p class="mail-contact">`+this.telefono+`</p>
	      `,
			message: this.email,
		    buttons: ['Ok']
		  });
		await alert.present();*/
		  	
			const modal=await this.modalController.create({
			  component: ContactModalPage,
			  componentProps:{
				text
			  },
			  cssClass:'modal-contents'
			});
			modal.present();

	}

	async presentToast(text:any) {
		const toast = await this.toastCtrl.create({
		  message: text,
		  duration: 2000,
		  cssClass: 'toast-scheme'
		});
		toast.present();
	}

	planes(){
		this.navCtrl.navigateForward('proveedor/planes');
	}

	async support(){
		let url ='https://service24.app/FAQ/';
		await Browser.open({ url: url});
		/*if (this.band_chatSupport) {	
			this.objService.setExtras(this.chat_support);
			this.navCtrl.navigateForward('chat-support');
		} else {
			this.presentToast(this.info);
		}*/
	}

	async viewNotification() {
	    const modal = await this.modalController.create({
	      component: NotificationsPage
	    });
	    modal.onDidDismiss().then((close)=> {
	    	this.show_notify = false;    
	    });
	    return await modal.present();  
	}

	listService(){
		this.navCtrl.navigateForward('proveedor/list-services');
	}
	registro(){
		this.navCtrl.navigateForward('proveedor/complete-register');
	}

	blog(){
		//this.navCtrl.push(ListBlogPage);
	}

	policy(){
		this.navCtrl.navigateForward('proveedor/privacy-policy');
	}

	terms(){
		this.navCtrl.navigateForward('terms-conditions');
	}

	completeRegister(){
    	this.navCtrl.navigateForward('proveedor/complete-register');
  	}

  	contrat(){
  		this.navCtrl.navigateForward('proveedor/view-contrat');
  	}

  	payment(){
  		this.navCtrl.navigateForward('proveedor/payments');
  	}

  	public sortByKey(array:any, key:any) {
	    return array.sort(function (a:any, b:any) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
	    });
	}

	public sortByKey1(array:any, key:any) {
	    return array.sort(function (a:any, b:any) {
	        var x = a[key]; var y = b[key];
	        return ((x > y) ? -1 : ((x < y) ? 0 : 1));
	    });
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
			this.notifications = [];
			this.showEmpty = true;
		  }
		//});  
	  }
	
	  notifications:any;
	  showEmpty:any;
	  vistos=0;
	  
	  getNotify(ciudad_id:any, user_id:any){
		let items2:any=this.storage.get('TRPSV24');
		  if (items2) {
			this.userService.getNotifications(ciudad_id,items2, user_id).subscribe(
			data => {
			  console.log(data)
			  this.datos1 = data;
			  this.notifications = this.datos1.Notificaciones_generales;
			  if (this.notifications.length == 0) {
				this.showEmpty = true;
			  }
			  this.calcNotify();
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
	  calcNotify(){
		this.vistos=0;
		for (let i = 0; i < this.notifications.length; i++) {
		  if (this.notifications[i].visto==0) {
			this.vistos+=1;
		  }
		}
	  }
	
	zone:any=this.funciones_generales.getZone();
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
}
