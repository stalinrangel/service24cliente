import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { Location } from "@angular/common";
import { ZonesRegisterPage } from '../zones-register/zones-register.page';
//import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-confirm-info',
  templateUrl: './confirm-info.page.html',
  styleUrls: ['./confirm-info.page.scss'],
})
export class ConfirmInfoPage implements OnInit {

  public registerUserForm: FormGroup=new FormGroup({});
  public user = {
    nombre: '',
    email: '',
    imagen: 'assets/profile-general.png',
    tipo_registro: '',
    id_facebook: '',
    id_twitter: '',
    id_instagram: '',
    token_notificacion: ''
  };
  public loading: any;
  formErrors = {
    'nombre': '',
    'telefono': '',
    'email': '',
    'zona': ''
  };

  constructor(
  	public navCtrl: NavController, 
  	private auth: AuthService, 
  	private alertController: AlertController, 
  	private loadingController: LoadingController, 
  	private builder: FormBuilder, 
  	private toastController: ToastController, 
  	public storage: StorageService,
  	private objService: ObjectserviceService,
    //public events: Events,
    private location: Location,
    public modalController: ModalController,
    //private oneSignal: OneSignal
  	) {	
  	this.user = this.objService.getExtras(); 
  }

  ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.registerUserForm = this.builder.group({
		  nombre: [this.user.nombre, [Validators.required]],
		  telefono: ['', [Validators.required]],
		  email: [this.user.email],
		  imagen: [this.user.imagen],
		  tipo_usuario: [2],
		  tipo_registro: [this.user.tipo_registro],
		  ciudad: [''],
		  estado: [''],
		  id_facebook: [this.user.id_facebook],
		  id_twitter: [this.user.id_twitter],
		  id_instagram: [this.user.id_instagram],
		  token_notificacion: [this.user.token_notificacion],
      zona: ['', [Validators.required]],
      zona_id: ['', [Validators.required]]
		});
		this.registerUserForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}

  async selectZone() {
    const modal = await this.modalController.create({
      component: ZonesRegisterPage
    });
    modal.onDidDismiss().then((close)=> {
      if (close.data) {
        this.registerUserForm.patchValue({zona: close.data.nombre});
        this.registerUserForm.patchValue({zona_id: close.data.id});
      }
    });
    return await modal.present();
  } 

  register(){
    this.registerUserForm.value.email = this.registerUserForm.value.email.toLowerCase();
    if (this.registerUserForm.valid) {
      this.presentLoading();
      //this.oneSignal.getIds().then((ids: { userId: string | null; }) => {
        //if (ids.userId != null && ids.userId != '') {
          //this.storage.set('token_notificacionUSV24',ids.userId);
          //this.registerUserForm.patchValue({token_notificacion: ids.userId});     
          this.auth.registerSocial(this.registerUserForm.value).subscribe(
            (            success: any) => {
              if (success) {
                this.login();
              } else {
                this.loading.dismiss();
                this.presentToast("Ha ocurrido un error al crear la cuenta.");
              }
            },
            (            error: { error: any; }) => {
              this.loading.dismiss();
              this.presentToast(error.error);
            }
          );
        //};
      //});
    } else {
      this.validateAllFormFields(this.registerUserForm);
      this.presentToast('¡Faltan datos para finalizar el registro!');
    }
  }

  login(){
    this.auth.loginSocial(this.registerUserForm.value).subscribe((allowed: any) => {
      if (allowed) {
        this.loading.dismiss(); 
        //this.events.publish('userAuthSV24', 'userSV');            
        this.navCtrl.pop();
      } else {
        this.loading.dismiss();
        this.presentToast("Accesso Denegado.");
      }
    },
      (    error: any) => {
    });
  }

  onValueChanged(data?: any) {
    if (!this.registerUserForm) { return; }
    const form = this.registerUserForm;
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      duration: 15000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido a Service24!',
      message: 'Usuario registrado con éxito.',
      buttons: [
 		{
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
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
}
