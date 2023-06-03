import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.page.html',
  styleUrls: ['./list-blog.page.scss'],
})
export class ListBlogPage implements OnInit {

  loading: any;
	public create_blog = {
		tema: '',
		creador: ''
	};
	public datos: any;
	public datos1: any;
	public list_blog: any = [];

	constructor(
		public navCtrl: NavController, 
		private alertController: AlertController,  
		private storage: StorageService, 
		public userService: UserService, 
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController,
		private objService: ObjectserviceService
	) { 
		this.storage.getObject('userSV24').then(items => {
		  if (items != '' && items != null) {
			this.create_blog.creador = items.nombre;
		  }
		});
	}

	ngOnInit() {
	}

  	ionViewDidEnter() {
		this.presentLoading();
		this.list_blog = [];
		this.initList();	
	}

	initList(){
		var toArray = [];
		this.storage.get('TUSV24').then(items => {
  			if (items) {
  				this.userService.getBlogs(items).subscribe(
			        data => {
			        	this.loading.dismiss();
						this.datos = data;
						this.list_blog = this.datos.blogs;
						for (var i = 0; i < this.list_blog.length; ++i) {
							toArray = this.list_blog[i].created_at.split(" ");	
							this.list_blog[i].created_at = new Date(toArray[0]);
						}     
			        },
			        msg => {       
				    }
			    );
  			}
	    });
	};

	async presentConfirm() {
	    const alert = await this.alertController.create({
		message: 'Crear Nuevo Tema',
		inputs: [
	      {
	        name: 'Nombre',
	        placeholder: 'Título del tema'
	      }
	    ],
		buttons: [
	        {
	          text: 'Cancelar',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        },
	        {
	          text: 'Crear',
	          handler: data => {
	          	this.create_blog.tema = data.nombre;
	          	this.createBlog();
	          }
	        }
	      ]
		});
		await alert.present();
	}

	createBlog(){
		this.presentLoading();
		this.storage.get('TUSV24').then(items => {
  			if (items) {
  				this.userService.setBlog(items,this.create_blog).subscribe(
			        data => {
			        	this.datos1 = data;
						this.loading.dismiss();
						this.list_blog.unshift({id: this.datos1.blog.id, tema: this.create_blog.tema, created_at: new Date(), creador: this.create_blog.creador, count_msgs:0});
						this.presentToast('¡Tema creado con éxito!');      
			        },
			        msg => { 
			        	if(msg.status == 400 || msg.status == 401){ 
			                this.navCtrl.navigateForward('login');
			            } else {
			            	this.presentToast(msg.error.error);
			            }     
				    }
			    );
  			}
	    });
	}

	viewBlog(item:any){
		this.objService.setExtras(item);
		this.navCtrl.navigateForward('/tabs/tab3/list-blog/chat-blog');
	}

	async presentLoading() {
		this.loading = await this.loadingCtrl.create({
		  spinner: 'dots',
		  duration: 15000,
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});
		return await this.loading.present();
	}

	async presentToast(text:any) {
		const toast = await this.toastCtrl.create({
		  message: text,
		  duration: 2000
		});
		toast.present();
	}
}
