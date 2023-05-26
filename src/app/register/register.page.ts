import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
//import { ZonesRegisterPage } from '../zones-register/zones-register.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  password_type1: string = 'password';
  password_type2: string = 'password';
  public registerUserForm: FormGroup= new FormGroup({});
  public datos: any;
  public loading:any;
  formErrors = {
    'nombre': '',
    'telefono': '',
    'email': '',
    'password': '',
    'rpassword': '',
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
   // public event: Events,
    //private oneSignal: OneSignal,
    public modalController: ModalController
  ) {	  
	}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.registerUserForm = this.builder.group({
		  nombre: ['', [Validators.required]],
		  telefono: ['', [Validators.required]],
		  email: ['', [Validators.required, Validators.email]],
      ciudad: [''],
      estado: [''],
		  tipo_usuario: [2],
		  tipo_registro: [1],
		  imagen: ['https://service24.app/alinstanteAPI/public/images_uploads/app/profile_general.png'],
		  password: ['', [Validators.required]],
		  rpassword: ['', [Validators.required]],
		  check: [false],
		  token_notificacion: [''],
      zona: ['', [Validators.required]],
      zona_id: ['', [Validators.required]],
      pais_id: ['']
		});
		this.registerUserForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}
	
  togglePasswordMode1() {   
	   this.password_type1 = this.password_type1 === 'text' ? 'password' : 'text';
	}

	togglePasswordMode2() {   
	   this.password_type2 = this.password_type2 === 'text' ? 'password' : 'text';
	}

  async selectZone() {
    /*const modal = await this.modalController.create({
      component: ZonesRegisterPage
    });
    modal.onDidDismiss().then((close)=> {
      if (close.data) {
        this.registerUserForm.patchValue({pais_id: close.data.pais_id});
        this.registerUserForm.patchValue({ciudad: close.data.ciudad_id});
        this.registerUserForm.patchValue({zona: close.data.nombre});
        this.registerUserForm.patchValue({zona_id: close.data.id});
      }
    });
    return await modal.present();*/
  } 

	register(){
		this.registerUserForm.value.email = this.registerUserForm.value.email.toLowerCase();
    //this.oneSignal.getIds().then((ids) => {
      //if (ids.userId != null && ids.userId != '') {
        //if (this.registerUserForm.value.zona_id != 1000 && this.registerUserForm.value.zona_id != '') {          
          //this.storage.set('token_notificacionUSV24',ids.userId);
          //this.registerUserForm.patchValue({token_notificacion: ids.userId});
          if (this.registerUserForm.valid) {
            if (this.registerUserForm.value.password !== this.registerUserForm.value.rpassword) {
              this.presentToast("Contraseñas no coinciden.");
            } else {
              this.presentLoading();
              this.auth.register(this.registerUserForm.value).subscribe(
                (success: any) => {
                  if (success) {
                    this.loginR();
                  } else {
                    this.presentToast("Ha ocurrido un error al crear la cuenta.");
                  }
                },
                (error: { error: any; }) => {
                  console.log(error);
                  this.loading.dismiss();
                  this.presentToast(error.error);
                }
              );
            }
          } else {
            this.validateAllFormFields(this.registerUserForm);
            this.presentToast('¡Faltan datos para el registro!');
          }
        //} else {
          //this.presentToast('Debes estar en una zona válida')
        //}
      //};
    //});
	}

  loginR(){
    this.auth.login(this.registerUserForm.value).subscribe((allowed: any) => {
      if (allowed) {
        this.loading.dismiss();
        this.presentAlert();
      } else {
        this.loading.dismiss();
        this.presentToast("Accesso Denegado.");
      }
    },
      (error: any) => {
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
            //this.event.publish('userAuthSV24', 'userSV');            
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

  login(){
    this.navCtrl.navigateBack('login');
  }

  goBack(){
    this.navCtrl.pop();
  }
}
