import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
//import { Facebook } from '@ionic-native/facebook/ngx';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any = {};
  private apiResponse: any;
  public datos: any;
  public response: any;
  public loading: any;
  public loginUserForm: FormGroup= new FormGroup({});
  public apiuser = {
    nombre: '',
    email: null,
    imagen: 'https://service24.app/alinstanteAPI/public/images_uploads/app/profile_general.png',
    telefono: '',
    id_facebook: null,
    id_twitter: null,
    id_instagram: null,
    tipo_registro: 0,
    token_notificacion: null
  };

  constructor(
    public nav: NavController, 
    private loadingController: LoadingController, 
    //private facebook: Facebook, 
    private builder: FormBuilder, 
    public alertController: AlertController, 
    public storage: StorageService,
    public auth: AuthService, 
    //private oneSignal: OneSignal,
    private toastController: ToastController,
    private objService: ObjectserviceService,
    //private googlePlus: GooglePlus,
    //public events: Events,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginUserForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      token_notificacion: ['']
    });
  }

  //LOGIN
  login(){
    localStorage.clear();
    setTimeout(() => {
      if (this.loginUserForm.valid) {
        this.presentLoading();
        //this.oneSignal.getIds().then((ids:any) => {
          //this.storage.set('token_notificacionUSV24',ids.userId);
          //if (ids.userId != null && ids.userId != '') {
            //this.loginUserForm.patchValue({token_notificacion: ids.userId});
            this.auth.login(this.loginUserForm.value).subscribe((allowed: any) => {
              if (allowed) {
                console.log('exito')
                this.loading.dismiss();
                this.router.navigate
                //this.events.publish('userAuthSV24', 'userSV'); 
                
                this.router.navigate(['/tabs/tab1']);       
                //this.nav.pop();
              } else {
                this.loading.dismiss();
                this.presentToast("Accesso Denegado.");
              }
            },
              (error: { error: any; }) => {
              this.loading.dismiss();
              this.presentToast(error.error);
            });
          //};
        //});
      } else {
        this.presentToast("Por favor, verifica los datos.");
      }
    }, 1000);  
  }

  // LOGIN FACEBOOK
  /*loginFacebook(){
    this.oneSignal.getIds().then((ids) => {
      this.storage.set('token_notificacionUSV24',ids.userId);
      if (ids.userId != null && ids.userId != '') {
        this.apiuser.token_notificacion = ids.userId;
        this.facebook.login(['public_profile', 'email'])
        .then(rta => {
          this.presentLoading();
          if(rta.status == 'connected'){
            this.getInfoFacebook();
          };
        })
        .catch(error =>{
          this.presentToast('Ha ocurrido un error al iniciar sesión con Facebook.')
        });
      };
    });
  }*/

  /*getInfoFacebook(){
    this.facebook.api('/me?fields=id,name,email,picture.type(large)',['public_profile','email'])
    .then(data=>{     
      this.user = data;
      if (this.user.name != null || this.user.name != '') {
        this.apiuser.nombre = this.user.name;
      }
      if (this.user.email != null || this.user.email != '') {
        this.apiuser.email = this.user.email;
      }
      if (this.user.picture != null || this.user.picture != '') {
        this.apiuser.imagen = this.user.picture.data.url;
      }
      if (this.user.id != null || this.user.id != '') {
        this.apiuser.id_facebook = this.user.id;
      }
      this.apiuser.tipo_registro = 2;
      this.auth.loginSocial(this.apiuser).subscribe(allowed => {
        if (allowed) {
          this.loading.dismiss();
          this.events.publish('userAuthSV24', 'userSV');          
          this.nav.pop();
        } else {
          this.loading.dismiss();
          this.presentToast("Accesso Denegado.");
        }
      },
      error => {
        this.loading.dismiss();
        this.objService.setExtras(this.apiuser);
        this.nav.navigateForward('confirm-info');
      });
    })
    .catch(error =>{
      this.loading.dismiss();
      this.presentToast('Ha ocurrido un error al iniciar sesión con Facebook.')
    });
  }*/

  /*async doGoogleLogin(){
    this.oneSignal.getIds().then((ids:any) => {
      if (ids.userId != null && ids.userId != '') {
        this.storage.set('token_notificacionUSV24',ids.userId);
        this.apiuser.token_notificacion = ids.userId;
        this.presentLoading();
        this.googlePlus.login({
          'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': '1093458311561-a1ide4jabn610d8036bvqrps17ueq1hu.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': false // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        })
        .then(user =>{
          this.user = user;
          if (this.user.displayName != null || this.user.displayName != '') {
            this.apiuser.nombre = this.user.displayName;
          }
          if (this.user.email != null || this.user.email != '') {
            this.apiuser.email = this.user.email;
          }
          if (this.user.imageUrl != null || this.user.imageUrl != '') {
            this.apiuser.imagen = this.user.imageUrl;
          }
          if (this.user.userId != null || this.user.userId != '') {
            this.apiuser.id_twitter = this.user.userId;
          }
          this.apiuser.tipo_registro = 3;
          this.auth.loginSocial(this.apiuser).subscribe(allowed => {
            if (allowed) {
              this.loading.dismiss();
              this.events.publish('userAuthSV24', 'userSV');          
              this.nav.pop();
            } else {
              this.loading.dismiss();
              this.presentToast("Accesso Denegado.");
            }
          },
          error => {
            this.loading.dismiss();
            this.objService.setExtras(this.apiuser);
            this.nav.navigateForward('confirm-info');
          });
        });
      };
    }, err =>{
      this.loading.dismiss();
    });
  }*/

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
      duration: 2000
    });
    toast.present();
  }

  register(){
  	this.nav.navigateForward('register');
  }

  resetPassword(){
    this.nav.navigateForward('email-password');
  }

  goBack(){
    this.nav.pop();
  }

}
