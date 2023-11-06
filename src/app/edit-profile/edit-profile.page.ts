import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, Platform, ToastController, LoadingController } from '@ionic/angular';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { StorageService } from '../../services/storage/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
//import { Camera } from '@ionic-native/camera/ngx';
//import { FilePath } from '@ionic-native/file-path/ngx';
//import { File } from '@ionic-native/file/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserService } from '../../services/user/user.service';
import { Camera, CameraResultType } from '@capacitor/camera'; 
import { Router } from '@angular/router';
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
	public image_user: any = 'assets/profile-general.png';
	public image_uploads = {
		imagen: '',
		token: ''
	};
	loading: any;
	datosU: any;
	
	constructor(
		private navCtrl: NavController,
		private storage: StorageService,
		private objService: ObjectserviceService,
		private builder: FormBuilder,
		public actionSheetController: ActionSheetController,
		private platform: Platform,
		//private camera: Camera,
		//private filePath: FilePath,
		//private file: File,
		//private transfer: FileTransfer,
		private toastController: ToastController,
		public loadingController: LoadingController,
		public userService: UserService,
		//public event: Events,
		private router: Router
	) { 
	}
	tk:any=undefined;
	ngOnInit() {
		this.tk=localStorage.getItem('PushNotifications');
	    this.userForm = this.builder.group({
			nombre: [this.usuario.nombre, [Validators.required]],
			email: [this.usuario.email, [Validators.required, Validators.email]],
			imagen: [this.usuario.imagen],
			token: [null],
			id: [null],
		});
		this.storage.getObject('userSV24').then(items => {
	      if (items != '' && items != null) {
			console.log(this.usuario)
	      	this.usuario = items;
	      	this.userForm.patchValue({id: items.id});
			this.userForm.patchValue({nombre: items.nombre});
		  	this.userForm.patchValue({email: items.email});
		  	if (this.usuario.imagen != null) {
		    	this.image_user = this.usuario.imagen;
		    	this.userForm.patchValue({imagen: items.imagen});
		    }
		  }	  
	    });
	    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
	    this.onValueChanged();
	}

	onValueChanged(data?: any) {
	    if (!this.userForm) { return; }
	    const form = this.userForm;

	    for (const field in this.formErrors) { 
	      const control = form.get(field);
	      //this.formErrors[field] = '';
	      if (control && control.dirty && !control.valid) {
	        for (const key in control.errors) {
	         // this.formErrors[field] += true;
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
	      buttons: [{
	        text: 'Cargar Imagen',
	        icon: 'images',
	        handler: () => {
	         // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
			 this.takePicture();
	        }
	      }, /*{
	        text: 'Usar Camara',
	        icon: 'camera',
	        handler: () => {
	         // this.takePicture(this.camera.PictureSourceType.CAMERA);
	        }
	      }, */{
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
	takePicture = async () => {
		console.log('entro')
		const image = await Camera.getPhoto({
		quality: 70,
		allowEditing: false,
		resultType: CameraResultType.Uri
		});
		
		var imageUrl = image.webPath;
		this.imagen = imageUrl;
		this.image_user=imageUrl;
		console.log(this.imagen);
		this.startUpload(image);
		};
		
		async startUpload(file:any) {
		let blob = await fetch(file.webPath).then(r => r.blob());
		const formData = new FormData();
		formData.append('file', blob, Date.now().toString() );
		this.uploadData(formData, file);
		}
		
		uploadData(formData: FormData, file:any) {
		this.userService.subir_imagen(formData).subscribe((response:any)=>{
		console.log(response)
		//this.editPhoto(response);
		}, (err:any)=>{
		console.log(err.error.text)
		this.userForm.patchValue({imagen: err.error.text});
		this.storage.getObject('userSV24').then(items => {
			if (items != '' && items != null) {
				items.imagen=err.error.text;
				this.storage.set('userSV24',items);
				
			}
		  });
		this.editProfile();
		
		});
		}

	public takePicture2(sourceType: any) {
	  // Create options for the Camera Dialog
	  var options = {
	    quality: 60,
	    sourceType: sourceType,
	    saveToPhotoAlbum: true,
	    correctOrientation: true
	  };
	 
	  // Get the data of an image
	  /*this.camera.getPicture(options).then((imagePath: string) => {
	    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
	      	this.filePath.resolveNativePath(imagePath)
	        .then((filePath: string) => {
	          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
	          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
	          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	        });
	    } else {
	      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	    }
	  }, (err: any) => {
	    this.presentToast('Error al seleccionar la imagen');
	  });*/
	}

	// Create a new name for the image
	private createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}
	 
	// Copy the image to a local folder
	private copyFileToLocalDir(namePath: any, currentName: any, newFileName: string) {
	  /*this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then((success: any) => {
	    this.lastImage = newFileName;
	    this.uploadImage();
	  }, (error: any) => {
	    this.presentToast('Error al guardar la imagen');
	  });*/
	}
	 
	// Always get the accurate path to your apps folder
	public pathForImage(img: string | null) {
	  /*if (img === null) {
	    return '';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }*/
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
	  /*fileTransfer.upload(targetPath, url, options).then((data: { response: string; }) => {
	    this.loading.dismiss();
	    this.image_user = data.response;
	    this.userForm.patchValue({imagen: data.response});
	    this.image_uploads.imagen = data.response;
	    this.editImage();
	  }, (err: any) => {
	    this.loading.dismiss();
	    this.presentToast('Error al subir la imagen');
	    this.image_user = this.usuario.imagen;
	  });*/
	}

	editProfile(){
		
		this.userForm.patchValue({email: this.userForm.value.email.toLowerCase()});
	    if (this.userForm.valid) {
			this.presentLoading();
			this.sendData();
	    } else {
	      	this.validateAllFormFields(this.userForm);
	     	this.presentToast('Debes completar los campos.');
	    }		
	}

	sendData(){
		this.storage.getObject('userSV24').then(items => {
	      if (items != '' && items != null) {
	      	this.storage.get('TUSV24').then(items2 => {
	  			if (items2 != '' && items2 != null) {
	  				this.userForm.patchValue({token: items2});
	  				this.userService.setUser(items.id,items2,this.userForm.value).subscribe(
				        data => {
						    this.datosU = data;
						    console.log(data);
						  	this.storage.setObject('userSV24', this.datosU.usuario);
						    this.loading.dismiss();
						    //this.event.publish('userAuthSV24', 'userSV');
						    this.presentToast('Perfil actualizado con éxito.');
							setTimeout(() => {
								this.objService.setUser(items);
							  }, 2000);
						    this.navCtrl.pop();
							
				        },
				        msg => {
				        	this.loading.dismiss();
						    if(msg.status == 400 || msg.status == 401){ 
						    	this.storage.set('TUSV24','');
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
	    });
	}

	editImage(){
		this.storage.getObject('userSV24').then(items => {
	      if (items != '' && items != null) {
	      	this.storage.get('TUSV24').then(items2 => {
	  			if (items2 != '' && items2 != null) {
	  				this.image_uploads.token = items2;
	  				this.userService.setUser(items.id,items2,this.image_uploads).subscribe(
				        data => {
						    this.datosU = data;
						  	this.storage.setObject('userSV24', this.datosU.usuario);
						    this.presentToast('Imagen actualizada con éxito.');      
				        },
				        msg => {
				        	this.loading.dismiss();
						    if(msg.status == 400 || msg.status == 401){ 
						    	this.storage.set('TUSV24','');
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
	    });		
	}

	atras(){
		
		this.router.navigate(['/tabs/tab3']);         
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

	async eliminar(){

			let url ='https://service24.app/solicitudes/';
			await Browser.open({ url: url});


	}
}
