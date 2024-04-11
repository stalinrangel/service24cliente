import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IonTabs, Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage/storage.service';
import { UserService } from 'src/services/user/user.service';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public currentTab: string = "tab1";
	@ViewChild(IonTabs) public tabs: any;
	public subscription: any;
	public isCliente:any=true;
	public cliente:any='Modo Cliente';
	isLogin=false;
	constructor(private translate: TranslateService,private changeDetector: ChangeDetectorRef,private platform: Platform,public navCtrl: NavController, public router: Router,private userService: UserService,private objService: ObjectserviceService,private storage: StorageService){

	this.isCliente=localStorage.getItem('isCliente');
	this.objService.isCliente$.subscribe((isClienteValue: boolean) => {
		console.log(isClienteValue)
		this.isCliente = isClienteValue;
		this.changeDetector.detectChanges();
	  });
	this.objService.getcerrarSesion().subscribe((data:any) => {
	console.log(data)
	this.isLoginCheck();
	});
	this.isLoginCheck();

	}

	isLoginCheck(){
		this.storage.getObject('userSV24').then(items => {
		  let user:any=items;
		  console.log(user)
		  if (user==undefined||user=='') {
			console.log(false)
			  this.isLogin=false;
			  this.usuario={
				nombre:''
			  };
		  }else{
			console.log(true)
			this.isLogin=true;
			this.usuario = items;
		}
		});
	  }

	changeRol(){
		if (this.isCliente) {
			this.isCliente=false;
			this.cliente='Modo proveedor';
			this.navCtrl.navigateRoot('/tabs/tab6');
		}else{
			this.isCliente=true;
			this.cliente='Modo cliente';
			this.navCtrl.navigateRoot('/tabs/tab1');
		}
	}
	
	setTab(evt:any) {
    	this.currentTab = this.tabs.getSelected();
    	this.openTab(this.currentTab,evt);
	}

	ionViewDidEnter(){
	    this.subscription = this.platform.backButton.subscribe(()=>{
	    	if (this.router.url == '/tabs/tab1' || this.router.url == '/tabs/tab2' || this.router.url == '/tabs/tab3') {
			    //navigator['app'].exitApp();
		    }   
	    });
		this.initStatus();
	}

	ionViewWillLeave(){
		this.subscription.unsubscribe();
	}

	openTab(tab: string, evt: MouseEvent) {
	    const tabSelected = this.tabs.getSelected();
	    if (this.router.url == '/tabs/tab1/category/subcategory/providers/detail-provider/order') {
		    return tabSelected !== tab
		    ? this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
		    : this.tabs.select(tab);
	    }   
	}

	public chat_support = {
		admin_id: '',
		chat_id: '',
		token_notificacion: '',
		ciudad_id: ''
	};
	usuario:any;
	datos:any;
	band_chatSupport=false;
	initStatus(){ 

		
		this.storage.getObject('userSV24').then(items => {
			//console.log(items)
			if (items != '' && items != null) {
				this.usuario = items;
				this.storage.get('TUSV24').then(items2 => {
					console.log(items2)
					if (items2) {
						this.userService.getId(this.usuario.id,items2,'1').subscribe(
							data => {
								//console.log(data)
								this.datos = data;
								this.chat_support.admin_id = this.datos.chat.admin_id;
								this.chat_support.chat_id = this.datos.chat.id;
								this.chat_support.token_notificacion = this.datos.admin[0].token_notificacion;
								  this.chat_support.ciudad_id = this.datos.admin[0].ciudad;
								this.band_chatSupport = true; 
								this.objService.setExtras(this.chat_support); 
							},
							msg => { 
								//console.log(msg);
								  if(msg.status == 404){ 
									 if (msg.error.admin) {
										 if (msg.error.admin.length > 0) {
											 this.band_chatSupport = true;
											  this.chat_support.admin_id = msg.error.admin[0].id;
											  this.chat_support.token_notificacion = msg.error.admin[0].token_notificacion;
											  this.chat_support.ciudad_id = msg.error.admin[0].ciudad;
											  this.objService.setExtras(this.chat_support); 
										  }
									 }
								} else if(msg.status == 409){
								  this.band_chatSupport = false;
								}
								if(msg.status == 400 || msg.status == 401){ 
									this.storage.set('TUSV24','');
									this.navCtrl.navigateForward('login');
								}  

					}
					);
					}
				});
			} 
		});
	  }
	support(){
		/*this.navCtrl.navigateForward('/tabs/tab5');*/
		//this.objService.setsoporte({});
		//console.log('support')
	}

}


