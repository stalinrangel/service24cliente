import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
//import { ZonesRegisterPage } from '../zones-register/zones-register.page';
import { initializeApp } from "@firebase/app";
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithCredential, signInWithRedirect } from "@firebase/auth";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { environment } from '../../environments/environment';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';


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
    'telefono': '+598',
    'email': '',
    'password': '',
    'rpassword': '',
    'zona': ''
  };
  firebase: any;

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
    public modalController: ModalController,
    private router: Router,
    private objService2: ObjectserviceService,
  ) {	  
    this.firebase = initializeApp(environment.firebaseConfig);
    GoogleAuth.initialize({
      clientId: '233380787537-rb13b0bgnjv1jltfjl77hm0euqc51685.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
	}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.registerUserForm = this.builder.group({
		  nombre: ['', [Validators.required]],
		  telefono: ['+598'],
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
      zona: ['1', [Validators.required]],
      zona_id: ['1', [Validators.required]],
      pais_id: ['1']
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
              console.log('register')
              this.presentLoading();
              this.auth.register(this.registerUserForm.value).subscribe(
                (success: any) => {
                  if (success) {
                    console.log('exito')
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
    console.log('loginr')
    this.auth.login(this.registerUserForm.value).subscribe((allowed: any) => {
      if (allowed) {
        console.log('allowed')
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
      duration: 2000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  login(){
    this.navCtrl.navigateBack('login');
  }

  goBack(){
    this.navCtrl.pop();
  }

  terms(){
		this.navCtrl.navigateForward('terms-conditions');
	}

  async loginViaGoogle() {
    this.presentLoading();
    try {
        const user = await GoogleAuth.signIn();
        console.log(user)
        if (user) {
          let credentials:any={
            email:null,
            nombre:null,
            imagen:null,
            confirmado:'no',
            tipo_registro:2,
            tipo_usuario:2
          }
          credentials.email=user.email;
          credentials.nombre=user.name;
          credentials.imagen=user.imageUrl;
          console.log(credentials)
          this.registerSocial(credentials);
          
        }   
      } catch (error) {
          console.log(error);
          this.presentToast("Ha ocurrido un error al iniciar sesion con Google.");
          this.loading.dismiss();
        }
  }
  registerSocial(credentials:any){
    let self=this;
    
    this.auth.register(credentials).subscribe({
      next(data: any){
        console.log(data);
        if (data) {
          
          //self.navCtrl.navigateRoot('/login');
          setTimeout(() => {
            self.navCtrl.navigateRoot(['login']); 
            self.objService2.setLoginCliente(credentials.email);
          }, 1500); 
          self.presentToast('¡Registrado con éxito!');
          //self.loading.dismiss();
        }
      },error(err: { error: { error: any; }; }){
          console.log(err)
          setTimeout(() => {
            self.navCtrl.navigateRoot(['login']); 
            self.objService2.setLoginCliente(credentials.email);
          }, 1500); 
          //self.loading.dismiss();
          self.presentToast(err.error.error);
      }
      });
  }
}
