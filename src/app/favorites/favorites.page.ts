import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { CategoriesService } from '../../services/categories/categories.service';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../../services/storage/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public data: any;
  public datos: any;
  public providers: any;
  public results: number = 0;
  public myLocation = {
    lat: 0,
    lng: 0
  }
  public searchTerm: string = '';
  public items: any = [];
  public loading:any;
  public show_notify: boolean = false;

  constructor(
  	private nav: NavController,
  	private objService: ObjectserviceService,
    private catService: CategoriesService,
    //private geolocation: Geolocation,
    private platform: Platform,
    public storage: StorageService,
    private toastController: ToastController,
    private alertController: AlertController,
    private translate: TranslateService,
    private loadingController: LoadingController,
    public modalController: ModalController
  ) { 
  }

  ngOnInit() {
    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    });
  }

  ionViewWillEnter() {
    this.getServices();
  }

  getServices(){
  	this.storage.getObject('userSV24').then(items => {
      if (items != '' && items != null) {
  		  this.storage.get('TUSV24').then(items2 => {
    			if (items2) {
    				this.catService.getFavorites(items.id).subscribe(
  			      data => {
  			        this.datos = data;
                console.log(this.datos )  
  			        this.providers = this.datos.Favoritos; 
  			        this.items = this.providers;  
                console.log(this.providers)  
  			      },
  			      msg => {       
  			        console.log(msg);
  			        if(msg.status == 400 || msg.status == 401){
  		            	this.storage.set('TUSV24','');  
  		                this.nav.navigateForward('login');
  		            } else if (msg.status == 404){
  		            	this.providers = [];
  		            	this.items = [];
  		            }  
  			      }
  			    );
    			};
  	    });
  	  } else {
        this.providers = [];
      }
    });
  }

  deleteFavorite(item:any){
  	this.presentLoading();
  	this.catService.deleteFavorites(item.favorito_id).subscribe(
      data => {
        this.loading.dismiss();
        this.presentToast('Proveedor Favorito eliminado con éxito.')
		this.getServices();    
      },
      msg => {       
        console.log(msg);
        this.loading.dismiss();
        if(msg.status == 400 || msg.status == 401){
        	this.storage.set('TUSV24','');  
            this.nav.navigateForward('login');
        } 
      }
    );
  };

  setProvider(item:any){
    this.objService.setExtras(item.id);
    this.objService.setCat(item.subcategoria);
    this.nav.navigateForward('detail-provider');
  }

	async presentLoading() {
		this.loading = await this.loadingController.create({
		  spinner: 'dots',
		  duration: 15000,
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});
		return await this.loading.present();
	}

  	async presentConfirm(item:any) {
		this.translate.get('FAVORITES.delete').subscribe((res: string) => {           
			this.translate.get('PROFILE.yes').subscribe((res1: string) => {           
				this.alert(res, res1, item);
			});	
		});	    
	}

  	async alert(text:any, text1:any, item:any){
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
	          	this.deleteFavorite(item);
	          }
	        }
	      ]
		});
		await alert.present();	
	}

  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  setFilteredItems() {
    this.items = this.providers; 
    let val = this.searchTerm;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item:any) => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
      this.results = this.items.length; 
    }
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
