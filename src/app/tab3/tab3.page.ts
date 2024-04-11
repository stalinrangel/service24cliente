import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';
//import { Facebook } from '@ionic-native/facebook/ngx';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageAlertPage } from '../language-alert/language-alert.page';
import { TutorialPage } from '../tutorial/tutorial.page';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Router } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { Browser } from '@capacitor/browser';
import { ContactModalPage } from '../contact-modal/contact-modal.page';
import { GeneralService } from '../services/general.service';
import { FilterPage } from '../filter/filter.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public usuario = {
		id: '',
		nombre: '',
		imagen:'assets/profile-general.png',
		promedio_calificacion: 0
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
	public info: string = 'Debes iniciar sesión para comunicarte con nuestro soporte.';
	public show_notify: boolean = false;
	pedidos=0;
	public type: string = "track";
	constructor(
		public navCtrl: NavController, 
		private alertController: AlertController,  
		private storage: StorageService, 
		public userService: UserService, 
		//private facebook: Facebook,
		private toastCtrl: ToastController,
		//public events: Events,
		private objService: ObjectserviceService,
		private ngZone: NgZone,
		private translate: TranslateService,
		public modalController: ModalController,
		private router: Router,
		private noticationService: NotificationsService,
		private funciones_generales: GeneralService
	) {
		console.log(this.router.url);
		this.objService.setruta(this.router.url);	

		this.objService.getNotify().subscribe((data:any) => {
			let items:any=this.storage.getObject('userRPSV24');
			this.getNotify(this.datos.ciudad_id,items.id);
		  });

		this.translate.get('PROFILE.user').subscribe((res1: string) => {           
			this.usuario.nombre = res1;
		});
		this.translate.get('PROFILE.required').subscribe((res: string) => {           
			this.info = res;
		});
		this.storage.getObject('userSV24').then(items => {
	      if (items != '' && items != null) {
			console.log('tab3')
			this.usuario = items;
			this.promedio_calificacion = this.usuario.promedio_calificacion;
		  }
	    });
		/*this.events.subscribe('userAuthSV24', (userData: any) => {
	      this.storage.getObject('userSV24').then(items => {
		      if (items != '' && items != null) {
		      	this.ngZone.run(()=>{
		      		this.usuario = items;
					this.promedio_calificacion = this.usuario.promedio_calificacion;
					this.getIds();
		      	});	
			  }
		    });
	    });	*/
	    this.getContact();
		this.objService.getUser().subscribe((data:any) => {
			console.log(data)
			this.storage.getObject('userSV24').then(items => {
				if (items != '' && items != null) {
				  console.log('tab3')
				  this.usuario = items;
				  this.promedio_calificacion = this.usuario.promedio_calificacion;
				}
			  });
	 	});
		this.objService.getsoporte().subscribe((data:any) => {
			console.log(data)
			this.getIds2();	
	  	});  
		this.objService.get_reload_chats_pedido().subscribe((data:any) => {
			this.getZone();
		});

		  setTimeout(() => {
			this.noticationService.registrar_token();
		  }, 5000);

		  this.getZone();
	}
	
  

	

	ionViewWillEnter() { 
		this.vistos=0;
		this.getZone();
		this.getIds();
		this.storage.get('notifyGSV24').then(items => {
	      if (items == '1') {
	        this.show_notify = true;
	      } else {
	        this.show_notify = false;
	      }
	    });
		this.storage.getObject('userSV24').then(items => {
			if (items != '' && items != null) {
			  console.log('tab32')
			  this.usuario = items;
			  this.promedio_calificacion = this.usuario.promedio_calificacion;
			}
		  });
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

  	getContact(){
  		this.storage.getObject('ZONESV24').then(items => {
	      if (items != '' && items != null) {
	        this.userService.getContact(items.pais_id).subscribe(
		        data => {
		        	console.log(data)
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
	    });
	};

	openLang(){
		this.storage.get('SELECTED_LANGUAGE').then(val => {
	      console.log(val)
	      this.openLanguagePopover();
	    });
	}

	async openLanguagePopover() {
	    const modal = await this.modalController.create({
	      component: LanguageAlertPage,
	      backdropDismiss: false,
	      cssClass: 'language-modal-css'
	    });
	    return await modal.present();
	}

  	getIds(){
  		this.storage.getObject('userSV24').then(items => {
  			console.log(items)
	      if (items != '' && items != null) {
			this.usuario = items;
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
									this.pedidos=this.datos.pedidos;
							        this.chat_support.admin_id = this.datos.chat.admin_id;
							        this.chat_support.chat_id = this.datos.chat.id;
							        this.chat_support.token_notificacion = this.datos.admin[0].token_notificacion;
						          	this.chat_support.ciudad_id = this.datos.admin[0].ciudad;
							        this.band_chatSupport = true; 
							        this.getCounts();
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
							          this.info = msg.error.Error;
							        }
							        if(msg.status == 400 || msg.status == 401){ 
							        	this.storage.set('TUSV24','');
						                this.navCtrl.navigateForward('login');
						            }  
							        this.getCounts();
							    }
						    );
			  		//	};
				    //});
	  			};
		    });
		  }
	    });
	}
	getIds2(){
		this.storage.getObject('userSV24').then(items => {
			console.log(items)
		if (items != '' && items != null) {
		  this.usuario = items;
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
								  this.getCounts();
								  this.support();	
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
									this.info = msg.error.Error;
								  }
								  if(msg.status == 400 || msg.status == 401){ 
									  this.storage.set('TUSV24','');
									  this.navCtrl.navigateForward('login');
								  }  
								  this.getCounts();
								  this.support();	
							  }
						  );
					//	};
				  //});
				};
		  });
		}
	  });
  }

	getCounts(){
		this.storage.get('TUSV24').then(items => {
  			if (items) {
  				this.userService.getCount(this.usuario.id,items).subscribe(
			        data => {
			        	console.log(data);
			        	this.datos3 = data;
				        this.encurso = this.datos3.enCurso;
				        this.finalizado = this.datos3.enFinalizados; 
				        this.promedio_calificacion = this.datos3.promedio_calificacion;     
			        },
			        msg => {       
				    }
			    );
  			}
	    });
	}

	salir(){
		/*this.facebook.getLoginStatus()
		.then((rta: { status: string; }) => {
		  if(rta.status == 'connected'){
		  	this.facebook.logout()
		    .then((rta: any) => {
		      this.storage.set('TUSV24','');
		      this.storage.setObject('userSV24', '');
		      this.storage.set('pedido_idSV24', '');
		      this.storage.set('token_notificacionUSV24','');
		      this.usuario.id = '';
		      this.usuario.imagen = 'assets/profile-general.png';
		      this.usuario.nombre = 'Usuario';
		      this.promedio_calificacion = 0;
		      this.encurso = 0;
		      this.finalizado = 0;
		    })
		    .catch((error: any) =>{
		      this.storage.set('TUSV24','');
		      this.storage.setObject('userSV24', '');
		      this.storage.set('pedido_idSV24', '');
		      this.storage.set('token_notificacionUSV24','');
		      this.usuario.id = '';
		      this.usuario.imagen = 'assets/profile-general.png';
		      this.usuario.nombre = 'Usuario';
		      this.promedio_calificacion = 0;
		      this.encurso = 0;
		      this.finalizado = 0;
		    });
		  } else {
		  	this.storage.set('TUSV24','');
		  	this.storage.setObject('userSV24', '');
		  	this.storage.set('pedido_idSV24', '');
		  	this.storage.set('token_notificacionUSV24','');
		  	this.usuario.id = '';
		    this.usuario.imagen = 'assets/profile-general.png';
		    this.usuario.nombre = 'Usuario';
		    this.promedio_calificacion = 0;
		    this.encurso = 0;
		    this.finalizado = 0;
		  }
		})
		.catch((error: any) =>{
		  	this.storage.set('TUSV24','');
		  	this.storage.setObject('userSV24', '');
		  	this.storage.set('pedido_idTHLP', '');
		  	this.storage.set('token_notificacionUSV24','');
		  	this.usuario.id = '';
		    this.usuario.imagen = 'assets/profile-general.png';
		    this.usuario.nombre = 'Usuario';
		    this.promedio_calificacion = 0;
		    this.encurso = 0;
		    this.finalizado = 0;
		});*/

		localStorage.setItem('TRPSV24','');
		localStorage.setItem('userRPSV24', '');
		localStorage.setItem('idRPSV24', '');
		localStorage.setItem('notify_RPSV24','');
		localStorage.setItem('TUSV24','');
		localStorage.setItem('userSV24','');
		localStorage.setItem('token_notificacionUSV24','');
		localStorage.setItem('pedido_idTHLP','');
		
    this.storage.set('TUSV24','');
    this.storage.setObject('userSV24', '');
    this.storage.set('pedido_idTHLP', '');
    this.storage.set('token_notificacionUSV24','');
    this.usuario.id = '';
    this.usuario.imagen = 'assets/profile-general.png';
    this.usuario.nombre = 'Usuario';
    this.promedio_calificacion = 0;
    this.encurso = 0;
    this.finalizado = 0;
		this.band_chatSupport = false;	
	this.navCtrl.navigateForward('/tabs/tab1');
	localStorage.setItem('userSV24', '');
	setTimeout(() => {
		this.objService.setcerrarSesion(true);
		this.storage.getObject('userSV24').then(items => {
			let user:any=items;
			console.log(user)
			
		  });
	}, 500);
	
	}

	editProfile(){
		this.navCtrl.navigateForward('/edit-profile');
		//this.router.navigate(['/edit-profile]);   
	}

	async presentConfirm() {
		this.translate.get('PROFILE.msglog').subscribe((res: string) => {           
			this.translate.get('PROFILE.yes').subscribe((res1: string) => {           
				this.alert(res, res1);
			});	
		});	    
	}

	async alert(text:any, text1:any){
		const alert = await this.alertController.create({
		message: text,
		buttons: [
	        {
	          text: 'No',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        },
	        {
	          text: text1,
	          handler: () => {
	          	this.salir();
	          }
	        }
	      ]
		});
		await alert.present();	
	}

	async presentAlert() {
		//this.storage.getObject('ZONESV24').then(items => {
	      //if (items != '' && items != null) {
	        //this.userService.getContact(items.pais_id).subscribe(
			this.userService.getContact('1').subscribe(
		        data => {
		        	console.log(data)
		          this.datos4 = data;
			        this.direccion = this.datos4.contacto.direccion;
			        this.email = this.datos4.contacto.correo;
			        this.telefono = this.datos4.contacto.telefono; 
					this.alert1(this.datos4.contacto);
			        this.translate.get('PROFILE.contact').subscribe((res: string) => {           
						
						
					});       
		        },
		        msg => {       
		          console.log(msg);
		        }
		    );
	      //}
	   //});
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

	viewOrder(item:any){
		//this.events.publish('viewOrder', item);
		this.navCtrl.navigateForward('/tabs/tab2');
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
	
	login(){
		this.storage.remove('modeOrderSV');
		this.navCtrl.navigateForward('login');
	}

	blog(){
		//this.navCtrl.navigateForward('/tabs/tab3/list-blog');
	}

	policy(){
		this.navCtrl.navigateForward('/privacy-policy');
	}
	favoritos(){
		this.navCtrl.navigateForward('/favorites');
	}

	terms(){
		this.navCtrl.navigateForward('/terms-conditions');
	}

	goFavourites(){
		this.navCtrl.navigateForward('/tabs/tab2');
	}

	async openTutorialPopover() {
	    /*const modal = await this.modalController.create({
	      component: TutorialPage,
	      backdropDismiss: false,
	      cssClass: 'tutorial-modal-css'
	    });
	    return await modal.present();*/
		this.navCtrl.navigateForward('/tutorial');
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

	  ngOnInit(){
		this.objService.unsuscribe();
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
}
