import { Component, OnInit, NgZone, ChangeDetectorRef, forwardRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ToastController, ActionSheetController, ModalController, IonicModule } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StorageService } from '../../servicesproveedor/storage.service';
import { OrdersService } from '../../servicesproveedor/orders.service';
/*import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';*/
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';
import { ZonesServicePage } from '../zones-service/zones-service.page';
import { Camera, CameraResultType } from '@capacitor/camera'; 
import { UserService } from '../../servicesproveedor/user.service';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../servicesproveedor/general.service';

declare var cordova: any;

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss'],
})
export class EditServicePage implements OnInit {

  
  public registerServiceForm!: FormGroup;
  public data: any;
public datos: any;
public datosU: any;
public categories: any = [];
public subcategories: any = [];
public loading!: HTMLIonLoadingElement;
formErrors = {
'nombre': '',
'precio': '',
'imagen': '',
'descripcion': '',
'subcategoria_id': '',
'categoria_id': '',
'zona':''
};
public lastImage: string = '';
public image_user: string = 'assets/imagen-proveedor.png';
public image_uploads = {
  imagen: '',
  token: ''
};

customActionSheetOptions1: any = {
    header: 'Seleccione una categoría'
};

customActionSheetOptions2: any = {
    header: 'Seleccione una sub categoría'
};
public images_upload: any = [];

public datos1: any;
public datos2: any;
public zones: any = [];
public selecZones: any = [];
public cities: any = [];
plan: any={
  restricciones:[]
};
restricciones:any;
constructor(
  public navCtrl: NavController,  
  private alertController: AlertController, 
  private loadingController: LoadingController, 
  private builder: FormBuilder, 
  private toastController: ToastController,
  public actionSheetController: ActionSheetController, 
  public storage: StorageService,
  public orderService: OrdersService,
  //private camera: Camera,
//private filePath: FilePath,
//private file: File,
private platform: Platform,
//private transfer: FileTransfer,
private objService: ObjetcserviceService,
private zone: NgZone,
public modalController: ModalController,
private change: ChangeDetectorRef,
public userService: UserService,
public funciones_generales: GeneralService
  ) {	 
    this.data = this.objService.getExtras(); 
    console.log(this.data);
}

ngOnInit() {
  this.initForm();
  this.plan=this.funciones_generales.miPlan();
  this.restricciones=this.plan.restricciones[0];
  console.log(this.plan,this.restricciones);
}

initForm() {
  this.registerServiceForm = this.builder.group({
    nombre: ['', [Validators.required]],
    precio: ['0'],
    imagen: ['https://service24.app/alinstanteAPI/public/images_uploads/app/imagen-proveedor.png'],
    //estado: ['ON'],
      descripcion: ['', [Validators.required]],
      subcategoria_id: ['', [Validators.required]],
      categoria_id: [''],
      establecimiento_id: [''],
      fotos: [''],
      ciudad: [''],
      zona: [''],
      zona_id: ['']
  });
  this.registerServiceForm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged();
  this.getSubcategories();
  this.registerServiceForm.controls['categoria_id'].valueChanges.subscribe(
      (selectedValue) => {
        for (var i = 0; i < this.categories.length; ++i) {
          if (this.categories[i].id == selectedValue) {
            this.subcategories = this.categories[i].subcategorias;
            this.subcategories = this.sortByKey(this.subcategories,'nombre');
          }
        }
      }
    );
    this.image_user = this.data.imagen;
    this.registerServiceForm.patchValue({precio: this.data.precio});
    this.registerServiceForm.patchValue({imagen: this.data.imagen});
    this.registerServiceForm.patchValue({descripcion: this.data.descripcion});
    this.registerServiceForm.patchValue({establecimiento_id: this.data.establecimiento_id});
  console.log(this.data);
  this.horario=this.data.horarios[0];
  console.log(this.horario)
    this.selecZones = this.data.zonas2;	
    if (this.data.fotos) {
      this.images_upload = JSON.parse(this.data.fotos);
    }
    /*this.registerServiceForm.controls['ciudad'].valueChanges.subscribe(
      (selectedValue) => {
        this.zone.run(()=>{
          this.zones = [];
          this.registerServiceForm.patchValue({zona: ''});
          this.zones = selectedValue.zonas;  
          for (var i = 0; i < this.zones.length; ++i) {
               for (var j = 0; j < this.selecZones.length; ++j) {
                 if (this.zones[i].id == this.selecZones[j].id) {
                   this.zones[i].isChecked = true;
                 }
               }
          }   
        })
      }
    );*/

  
}

getSubcategories(){
  let items:any=this.storage.get('TRPSV24');
      if (items) {
      let items1:any=this.storage.getObject('userRPSV24');
          if (items1) {
            this.orderService.getSubcategories(items, items1.ciudad).subscribe(
              (				        data: any) => {
              this.datos = data;
              this.categories = this.datos.categoria;
              this.categories = this.sortByKey(this.categories,'nombre');
              this.registerServiceForm.patchValue({subcategoria_id: this.data.subcategoria_id});
              this.registerServiceForm.patchValue({categoria_id: this.data.subcategoria.categoria_id});
              this.registerServiceForm.patchValue({nombre: this.data.nombre});
              this.change.detectChanges();
              this.getCity(items1.pais_id);
            },
              (					    msg: { status: number; error: { error: string; }; }) => {
              this.getCity(items1.pais_id);
              if(msg.status == 400 || msg.status == 401){ 
                this.storage.set('TRPSV24','');
                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                this.navCtrl.navigateRoot('login');
              }
            }); 
          }
      }
}

getCity(pais_id: any){
  this.orderService.getCity(pais_id).subscribe(
    (		  resp: any) => {
      console.log(resp);
      this.datos2 = resp;
      this.cities = this.datos2.coordenadas;
      this.cities = this.sortByKey(this.cities,'nombre');
    this.zones = this.datos2.coordenadas[0].zonas;
      for (var i = 0; i < this.cities.length; ++i) {
        if (this.data.subcategoria.ciudad_id == this.cities[i].id) {
          this.registerServiceForm.patchValue({ciudad: this.cities[i]});
        }
      }
    },
    (		  error: any) => {       
      console.log(error);
    }
  ); 
}

async selectZone() {
  console.log(this.selecZones.length);

  if (this.restricciones.zonas>=this.registerServiceForm.value.zona.length) {
    this.selecZones=this.registerServiceForm.value.zona;
    console.log(this.selecZones);
  }else{
    this.selecZones=[];
    this.presentToast('Puedes agregar un máximo de '+this.restricciones.zonas+' zonas por servicio');
  }
    /*if (this.zones.length > 0) {
    const modal = await this.modalController.create({
        component: ZonesServicePage,
        componentProps: {data: this.zones}
      });
      modal.onDidDismiss().then((close)=> {
        console.log(close.data)
        if (close.data != null) {
          this.selecZones = close.data;
        }
      });
      return await modal.present();
  }*/
}

deleteLanguage(item: { id: any; }){
  let index = this.selecZones.findIndex((item1: { id: any; }) => item1.id === item.id);
  if(index !== -1){
    this.selecZones.splice(index, 1);
    console.log(this.selecZones);
    for (var i = 0; i < this.zones.length; ++i) {
      if (this.zones[i].id == item.id) {
        this.zones[i].isChecked = false;
      }
    }
  }
}


async presentActionSheet(type: any) {
    if (type==1) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione una Imagen',
      buttons: [{
        text: 'Cargar Imagenes',
        icon: 'images',
        handler: () => {
        console.log(this.restricciones.fotos,this.images_upload.length)
        if (true) {
          this.takePicture();
        }else{
          this.presentToast('Puedes agregar un máximo de '+this.restricciones.fotos+' imagenes por servicio');
        }
        }
      },/* {
        text: 'Usar Camara',
        icon: 'camera',
        handler: () => {
        this.takePicture(this.camera.PictureSourceType.CAMERA, type);
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
  }else if(type==2){
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione una Imagen',
      buttons: [{
        text: 'Cargar Imagenes',
        icon: 'images',
        handler: () => {
        console.log(this.restricciones.fotos,this.images_upload.length)
        if (this.restricciones.fotos>this.images_upload.length) {
          this.takePicture2();
        }else{
          this.presentToast('Puedes agregar un máximo de '+this.restricciones.fotos+' imagenes por servicio');
        }
        }
      },/* {
        text: 'Usar Camara',
        icon: 'camera',
        handler: () => {
        this.takePicture(this.camera.PictureSourceType.CAMERA, type);
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
   
}

public imagen:any='';
public imagen_upload:any='';
takePicture = async () => {
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
  this.startUpload(image);	
}

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
    
  }, (err:any)=>{
    console.log(err.error.text)
    this.imagen_upload=err.error.text;
    this.image_user=err.error.text;
  });
}
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
    this.images_upload.push({
      url:err.error.text
    });
  });
}

public takePicture3(sourceType: any, type: any) {
  // Create options for the Camera Dialog
 /* var options = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: true,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath: string) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
        .then((filePath: string) => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), type);
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), type);
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
/*private copyFileToLocalDir(namePath: any, currentName: any, newFileName: string, type: string) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then((success: any) => {
    this.lastImage = newFileName;
    if (type == '1') {
      this.uploadImage();
    } else {
      this.uploadImage1();
    }
  }, (error: any) => {
    this.presentToast('Error al guardar la imagen');
  });
}*/
 
// Always get the accurate path to your apps folder
public pathForImage(img: string | null) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
  var url = "https://service24.app/alinstanteAPI/public/images_uploads/uploadproductos.php";
 
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
 
  /*const fileTransfer: FileTransferObject = this.transfer.create();
 
  this.presentLoading();
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then((data: { response: string; }) => {
    this.loading.dismiss();
    this.image_user = data.response;
    this.registerServiceForm.patchValue({imagen: data.response});
    this.image_uploads.imagen = data.response;
  }, (err: any) => {
    this.loading.dismiss();
    this.presentToast('Error al subir la imagen');
    this.image_user = 'assets/imagen-proveedor.png';
  });*/
}

public uploadImage1() {
  // Destination URL
  var url = "https://service24.app/alinstanteAPI/public/images_uploads/uploadproductosfotos.php";
 
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
 
  /*const fileTransfer: FileTransferObject = this.transfer.create();
 
  this.presentLoading();
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then((data: { response: string; }) => {
    this.loading.dismiss();
    this.image_user = data.response;
    this.images_upload.push({url: data.response});
  }, (err: any) => {
    this.loading.dismiss();
    this.presentToast('Error al subir la imagen');
    this.image_user = 'assets/imagen-servicio.png';
  });*/
}

register(){
  if (this.registerServiceForm.valid) {
    this.presentLoading();
    let items:any=this.storage.get('userRPSV24');
        if (items) {
        let items2:any=this.storage.get('TRPSV24');
            if (items2) {
              let id = JSON.parse(items).establecimiento.id;
              //this.registerServiceForm.patchValue({establecimiento_id: id});
              this.registerServiceForm.patchValue({zona_id: JSON.stringify(this.selecZones)});
              if (this.images_upload.length > 0) {
              this.registerServiceForm.patchValue({imagen: this.image_user});
                this.registerServiceForm.patchValue({fotos: JSON.stringify(this.images_upload)});
              } else {
                this.registerServiceForm.patchValue({fotos: []});
              }
              console.log(this.registerServiceForm.value);
              this.orderService.editService(this.registerServiceForm.value,this.data.id,items2).subscribe(
                (					        data: any) => {
                console.log(data);
                this.loading.dismiss();
                this.presentToast1('El servicio que editó se encuentra en revisión, en pocos minutos sera aprobado');
                this.navCtrl.pop();
              },
                (						    msg: { status: number; error: { error: string; }; }) => {
                this.loading.dismiss();
                if(msg.status == 400 || msg.status == 401){ 
                  this.storage.set('TRPSV24','');
                  this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                  this.navCtrl.navigateRoot('login');
                } else {
                  this.presentToast(msg.error.error);
                }
              });
            }
        }
  } else {
    this.validateAllFormFields(this.registerServiceForm);
    this.presentToast('Debe completar todos los campos');
  }
}

delete_image(item:any){
  let index = this.images_upload.findIndex((itemN: { url: any; }) => itemN.url === item.url);
  if(index !== -1){
    this.images_upload.splice(index, 1);
  }
}

async presentConfirmDelete(item:any) {
    const alert = await this.alertController.create({
  message: '¿Desea eliminar la imagen?',
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
            this.delete_image(item);
          }
        }
      ]
  });
  await alert.present();
}

onValueChanged(data?: any) {
  if (!this.registerServiceForm) { return; }
  const form = this.registerServiceForm;
  for (const field in this.formErrors) { 
    const control = form.get(field);
    //this.formErrors[field] = '';
    if (control && control.dirty && !control.valid) {
      for (const key in control.errors) {
      //  this.formErrors[field] += true;
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

async presentLoading() {
  this.loading = await this.loadingController.create({
    spinner: 'dots',
    duration: 15000,
    translucent: true,
    cssClass: 'custom-class custom-loading'
  });
  return await this.loading.present();
}

async presentToast(text:any) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000,
    cssClass: 'toast-scheme'
  });
  toast.present();
}

async presentToast1(text:any) {
  const toast = await this.toastController.create({
    message: text,
    duration: 4500,
    cssClass: 'toast-scheme'
  });
  toast.present();
}

  public sortByKey(array:any, key:any) {
    return array.sort(function (a: { [x: string]: any; }, b: { [x: string]: any; }) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
}

public horario = {
  lunes: true,
  lunes_i: '08:00',
  lunes_f: '18:00',
  martes: true,
  martes_i: '08:00',
  martes_f: '18:00',
  miercoles: true,
  miercoles_i: '08:00',
  miercoles_f: '18:00',
  jueves: true,
  jueves_i: '08:00',
  jueves_f: '18:00',
  viernes: true,
  viernes_i: '08:00',
  viernes_f: '18:00',
  sabado: true,
  sabado_i: '08:00',
  sabado_f: '18:00',
  domingo: true,
  domingo_i: '08:00',
  domingo_f: '18:00',
  producto_id:'0',
  id:0
};

setDay(dia:any){

}
availableDay(day:any){
  if (day == 'lunes') {
    this.horario.lunes=true;
  }
  if (day == 'martes') {
    this.horario.martes=true;
  }
  if (day == 'miercoles') {
    this.horario.miercoles=true;
  }
  if (day == 'jueves') {
    this.horario.jueves=true;
  }
  if (day == 'viernes') {
    this.horario.viernes=true;
  }
  if (day == 'sabado') {
    this.horario.sabado=true;
  }
  if (day == 'domingo') {
    this.horario.domingo=true;
  }
}

disabledDay(day:any){
  if (day == 'lunes') {
    this.horario.lunes=false;
  }
  if (day == 'martes') {
    this.horario.martes=false;
  }
  if (day == 'miercoles') {
    this.horario.miercoles=false;
  }
  if (day == 'jueves') {
    this.horario.jueves=false;
  }
  if (day == 'viernes') {
    this.horario.viernes=false;
  }
  if (day == 'sabado') {
    this.horario.sabado=false;
  }
  if (day == 'domingo') {
    this.horario.domingo=false;
  }
}

enviarHorario(){
  console.log(this.horario)
  this.userService.updateHorario(this.horario.id,this.horario).subscribe((response:any)=>{
    console.log(response)
    
  }, (err:any)=>{
    console.log(err.error.text)
    
  });
}

}

