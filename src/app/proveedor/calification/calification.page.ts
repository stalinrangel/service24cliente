import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, ModalController, LoadingController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { OrdersService } from '../../servicesproveedor/orders.service';
import { StorageService } from '../../servicesproveedor/storage.service';
import { IonRatingStarsModule } from 'ion-rating-stars';
import { Camera, CameraResultType } from '@capacitor/camera'; 
import { UserService } from '../../servicesproveedor/user.service';
//import { Camera } from '@ionic-native/camera/ngx';
//import { FilePath } from '@ionic-native/file-path/ngx';
//import { File } from '@ionic-native/file/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

//declare var cordova: any;

@Component({
  selector: 'app-calification',
  templateUrl: './calification.page.html',
  styleUrls: ['./calification.page.scss'],
})
export class CalificationPage implements OnInit {

  public Calification = {
    puntaje: 0,
    comentario: '',
    imagen: null,
    usuario_id: '',
    tipo_usuario: 3,
    pedido_id: '',
    producto_id: '',
    califique_a: '',
    token: null,
    califico: 3
  }
  loading: any;
  pedido_id: any;
  image_cal: string = '';
  lastImage: any;
  @Input() value: any;

  constructor(
    public navCtrl: NavController,
    private modalCtrl:ModalController,
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
    public orderService: OrdersService,
    public storage: StorageService,
    //private camera: Camera,
    //private filePath: FilePath,
    //private file: File,
    //private transfer: FileTransfer,
    public actionSheetController: ActionSheetController,
    private platform: Platform,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.Calification.pedido_id = this.value.id;
    this.Calification.producto_id = this.value.productos[0].id;
    this.Calification.califique_a = this.value.usuario_id;
    //cordova.plugins.backgroundMode.enable();
  }

  ionViewWillLeave(){
    /*if (cordova.plugins.backgroundMode.isEnabled()) {
      cordova.plugins.backgroundMode.disable();
    }*/
  }

  onModelChange(ev:any){
    this.Calification.puntaje = ev;
  }

  sendCalification(){
    //this.Calification.puntaje=5;
    if (this.Calification.puntaje == 0) {
      this.presentToast('Debes asignar un puntaje para enviar la calificación.')
    } else {
    this.presentLoading();
      let items:any = this.storage.getObject('userRPSV24');
        if (items) {
          this.Calification.usuario_id = items.id;
          let items2:any= this.storage.get('TRPSV24');
            if (items2) {
              this.Calification.token = items2;
              this.Calification.imagen=this.imagen_upload;
              this.orderService.sendCalification(this.Calification,items2).subscribe(
                data => {
                  this.loading.dismiss();
                  this.presentToast('¡Gracias por tu Calificación!');
                  this.value.close = 2;
                  this.modalCtrl.dismiss(this.value.close);
                },
                msg => {
                  this.loading.dismiss();
                  if(msg.status == 400 || msg.status == 401){
                    this.storage.set('TRPSV24',''); 
                    this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                    this.navCtrl.navigateRoot('login');
                  }       
                }
              );
            }
        }
    }
  }

  ratingChanged(e:any){
    console.log(e)
    this.Calification.puntaje=e;
  }
  
  async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Seleccione una Imagen',
        cssClass: 'actionCamera',
        buttons: [{
          text: 'Cargar de Imagenes',
          icon: 'images',
          handler: () => {
            this.takePicture2();
            //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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
  imagen:any;
  imagen_upload:any;
  takePicture2 = async () => {
		//alert('entro')
		const image = await Camera.getPhoto({
		quality: 30,
		allowEditing: false,
		resultType: CameraResultType.Uri,
		promptLabelPicture: 'Tomar una foto',
  		promptLabelPhoto: 'Seleccionar de galeria'
		});
		
		var imageUrl = image.webPath;
		this.imagen = imageUrl;
		console.log(this.imagen);
		//alert('gemerp')
		this.startUpload2(image);	
	}
	async startUpload2(file:any) {
		//alert('empezo a subir f')
		let blob = await fetch(file.webPath).then(r => r.blob());
		const formData = new FormData();
		formData.append('file', blob, Date.now().toString() );
		this.uploadData2(formData, file);
	}
	
	uploadData2(formData: FormData, file:any) {
		//alert('empezo a subir up')
		this.userService.subir_imagen(formData).subscribe((response:any)=>{
			console.log(response)
			
		}, (err:any)=>{
			console.log(err.error.text)
			this.imagen_upload=err.error.text;
      this.image_cal=err.error.text;
			
		});
	}

  public takePicture(sourceType:any) {
    // Create options for the Camera Dialog
    /*var options = {
      quality: 50,
      sourceType: sourceType,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
      cordova.plugins.backgroundMode.disable();
    }, (err) => {
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
      //return cordova.file.dataDirectory + img;
      return 1;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "https://service24.app/alinstanteAPI/public/images_uploads/uploadcalificaciones.php";
   
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
      this.image_cal = data.response;
      this.Calification.imagen = data.response;
    }, err => {
      this.loading.dismiss();
      this.presentToast('Error al subir la imagen');
      this.Calification.imagen = null;
    });*/
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
      duration: 2500,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  closeModal() {
    this.value.close = 1;
    this.modalCtrl.dismiss(this.value.close);
  }

}
