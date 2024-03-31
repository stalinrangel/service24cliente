import { Component, OnInit, forwardRef, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';
import { StorageService } from '../../servicesproveedor/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
//import { Camera } from '@ionic-native/camera/ngx';
//import { FilePath } from '@ionic-native/file-path/ngx';
//import { File } from '@ionic-native/file/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserService } from '../../servicesproveedor/user.service';
//import { Crop } from '@ionic-native/crop/ngx';
import { RefreshService } from '../../servicesproveedor/refresh.service';
import { Camera, CameraResultType } from '@capacitor/camera'; 
import { GeneralService } from '../../servicesproveedor/general.service';
declare var cordova: any;
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public usuario = {
		id: '',
		nombre: 'Usuario',
		imagen:'https://service24.app/alinstanteAPI/public/images_uploads/app/profile_general.png',
		email: '',
		promedio_calificacion: 0
	};
	public data: any;
	public userForm: FormGroup= new FormGroup({});

	formErrors = {
		'nombre': '',
		'email': ''
	};
	public lastImage: any = null;
	public image_user: any = 'assets/profile-servicio.png';
	public image_uploads = {
		imagen: '',
		token: ''
	};
	loading: any;
	datosU: any;
	public subscription: any;
	plan:any;
	
	constructor(
		private navCtrl: NavController,
		private storage: StorageService,
		private objService: ObjetcserviceService,
		private builder: FormBuilder,
		public actionSheetController: ActionSheetController,
		private platform: Platform,
		//private camera: Camera,
		//private filePath: FilePath,
		//private file: File,
		public refresh: RefreshService,
		//private transfer: FileTransfer,
		private toastController: ToastController,
		public loadingController: LoadingController,
		public userService: UserService,
		//private crop: Crop,
		public funciones_generales: GeneralService
	) { 
		this.plan=this.funciones_generales.getPlan();
		console.log(this.plan);
	}
	tk:any=undefined;
	ngOnInit() {
		this.tk=localStorage.getItem('PushNotifications');
	    this.userForm = this.builder.group({
			nombre: [this.usuario.nombre, [Validators.required]],
			email: [this.usuario.email, [Validators.required, Validators.email]],
			imagen: [this.usuario.imagen],
			token: [null]
		});
		let items:any= this.storage.getObject('userRPSV24');
	      if (items != '' && items != null) {
	      	console.log(items);
	      	this.usuario = items;
	      	this.userForm.patchValue({nombre: items.nombre});
		  	this.userForm.patchValue({email: items.email});
		  	
        if (this.usuario.imagen != null) {
		    	this.image_user = this.usuario.imagen;
		    	this.userForm.patchValue({imagen: items.imagen});
		    }
		    if (items.registro != null) {
				if (items.registro.tipo == 2 && items.registro.logo) {
					this.image_user = items.registro.logo;
		    		this.userForm.patchValue({imagen: items.registro.logo});
				}
			}
		  }	  
	    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
	    this.onValueChanged();
	    //cordova.plugins.backgroundMode.setDefaults({ silent: true });
	    //cordova.plugins.backgroundMode.enable();
	}

	setUIBackButtonAction() {
		this.subscription = this.platform.backButton.subscribeWithPriority(0, () => {
		  this.navCtrl.pop();
		});
	}

	ionViewDidEnter() {
		this.setUIBackButtonAction();
	}

	ionPageWillLeave(){
		this.subscription.unsubscribe();
		//if (cordova.plugins.backgroundMode.isEnabled()) {
		//	cordova.plugins.backgroundMode.disable();
	//	}
	}

	onValueChanged(data?: any) {
	    if (!this.userForm) { return; }
	    const form = this.userForm;

	    for (const field in this.formErrors) { 
	      const control = form.get(field);
	      //this.formErrors[field] = '';
	      if (control && control.dirty && !control.valid) {
	        for (const key in control.errors) {
	          //this.formErrors[field] += true;
	          console.log(key);
	        }
	      } 
	    }
	}

	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
		  const control = formGroup.get(field);
		  if (control instanceof FormControl) {
		    control.markAsDirty({ onlySelf:true });
		    this.onValueChanged();
		  } else if (control instanceof FormGroup) {
		    this.validateAllFormFields(control);
		  }
		});
	}

	async presentActionSheet() {
	    const actionSheet = await this.actionSheetController.create({
	      header: 'Seleccione una Imagen',
	      buttons: [/*{
	        text: 'Cargar de Librería',
	        icon: 'images',
	        handler: () => {
	          this.takePicture();
	        }
	      }, */{
	        text: 'Cargar Imagen',
	        icon: 'camera',
	        handler: () => {
				this.takePicture();
	        }
	      }, {
	        text: 'Cancelar',
	        icon: 'close',
	        role: 'cancel',
	        handler: () => {
	          console.log('Cancel clicked');
	        }
	      }]
	    });
	    await actionSheet.present();
	}

	public imagen:any='';
	public imagen_upload:any='';
	takePicture = async () => {
		//alert('entro')
		const image = await Camera.getPhoto({
		quality: 30,
		allowEditing: true,
		resultType: CameraResultType.Uri,
		promptLabelPicture: 'Tomar una foto',
  		promptLabelPhoto: 'Seleccionar de galeria'
		});
		
		var imageUrl = image.webPath;
		this.imagen = imageUrl;
		this.image_user=imageUrl;
		console.log(this.imagen);
		//alert('gemerp')
		this.startUpload(image);
		};
		
		async startUpload(file:any) {
			//alert('empezo a subir f')
		let blob = await fetch(file.webPath).then(r => r.blob());
		const formData = new FormData();
		formData.append('file', blob, Date.now().toString() );
		this.uploadData(formData, file);
		}
		
		uploadData(formData: FormData, file:any) {
			//alert('empezo a subir up')
		this.userService.subir_imagen(formData).subscribe((response:any)=>{
		console.log(response)
		//this.editPhoto(response);
		}, (err:any)=>{
		console.log(err.error.text)
		this.imagen_upload=err.error.text;
		this.editProfile();
			
		  });
		
		
	}

	// Create a new name for the image
	private createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}
	 
	// Copy the image to a local folder
	private copyFileToLocalDir(namePath:any, currentName:any, newFileName:any) {
	  /*this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    this.lastImage = newFileName;
	    this.uploadImage();
	  }, error => {
	    this.presentToast('Error al guardar la imagen');
	  });*/
	}
	 
	// Always get the accurate path to your apps folder
	public pathForImage(img:any) {
	  if (img === null) {
	    return '';
	  } else {
	   // return cordova.file.dataDirectory + img;
     return 1;
	  }
	}

	public uploadImage() {
	  // Destination URL
	  var url = "https://service24.app/alinstanteAPI/public/images_uploads/upload.php";
	 
	  // File for Upload
	  var targetPath = this.pathForImage(this.lastImage);
	 
	  // File name only
	  var filename = this.lastImage;
	 
	  var options = {
	    fileKey: "file",
	    fileName: filename,
	    chunkedMode: false,
	    mimeType: "multipart/form-data",
	    params : {'fileName': filename},
	    headers : {
           Connection: "close"
        }
	  };
	 
	  //const fileTransfer: FileTransferObject = this.transfer.create();
	 
	  this.presentLoading();
	  // Use the FileTransfer to upload the image
	  /*fileTransfer.upload(targetPath, url, options).then(data => {
	    this.loading.dismiss();
	    this.image_user = data.response;
	    this.userForm.patchValue({imagen: data.response});
	    this.image_uploads.imagen = data.response;
	    this.editImage();
	  }, err => {
	    this.loading.dismiss();
	    this.presentToast('Error al subir la imagen');
	    this.image_user = this.usuario.imagen;
	  });*/
	}

	editProfile(){
		//alert('editando')
		this.userForm.patchValue({email: this.userForm.value.email.toLowerCase()});
	    if (this.userForm.valid) {
			
			this.sendData();
	    } else {
	      	this.validateAllFormFields(this.userForm);
	     	this.presentToast('Debes completar los campos.');
	    }		
	}

	sendData(){
		//alert('senddata')
		let items:any=this.storage.getObject('userRPSV24');
	      if (items != '' && items != null) {
			
	      	let items2:any=this.storage.get('TRPSV24');
	  			if (items2 != '' && items2 != null) {
	  				this.userForm.patchValue({token: items2});//alert('senddata2')
					this.userForm.patchValue({imagen: this.imagen_upload});//alert('senddata2')
	  				this.userService.setUsuario(items.id,items2,this.userForm.value).subscribe(
				        data => {
						    this.datosU = data;
							//alert('senddata llego')
							console.log(data)
						    items.nombre = this.datosU.usuario.nombre;
						    items.email = this.datosU.usuario.email;
						    items.imagen = this.datosU.usuario.imagen;
						  	this.storage.setObject('userRPSV24', items);
						    setTimeout(()=>{
						    	
							    this.refresh.publishFormRefresh1('userSV');
							    this.presentToast('Perfil actualizado con éxito.');
								setTimeout(() => {
									this.objService.setUser(items);
								}, 2000);
							    this.navCtrl.pop(); 
						    },500)			         
				        },
				        msg => {
				        	this.loading.dismiss();
						    if(msg.status == 400 || msg.status == 401){ 
						    	this.storage.set('TRPSV24','');
				                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
				                this.navCtrl.navigateForward('login');
				            } else {
				            	this.presentToast(msg.error.error);
				            }     
					    }
				    );
	  			}
		  }
	}

	editImage(){
		let items:any=this.storage.getObject('userRPSV24');
	      if (items != '' && items != null) {
	      	this.storage.get('TRPSV24').then(items2 => {
	  			if (items2 != '' && items2 != null) {
	  				this.image_uploads.token = items2;
	  				this.userService.setUsuario(items.id,items2,this.image_uploads).subscribe(
				        data => {
						    this.datosU = data;
						  	items.imagen = this.datosU.usuario.imagen;
						  	this.storage.setObject('userRPSV24', items);
						    this.presentToast('Imagen actualizada con éxito.');      
				        },
				        msg => {
				        	this.loading.dismiss();
						    if(msg.status == 400 || msg.status == 401){ 
						    	this.storage.set('TRPSV24','');
				                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
				                this.navCtrl.navigateForward('login');
				            } else {
				            	this.presentToast(msg.error.error);
				            }     
					    }
				    );
	  			}
		    });
		  }		
	}

	async eliminar(){

		let url ='https://service24.app/solicitudes/';
		await Browser.open({ url: url});


	}

	async presentToast(text:any) {
		const toast = await this.toastController.create({
		  message: text,
		  duration: 2000,
		  cssClass: 'toast-scheme'
		});
		toast.present();
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


	

}

