import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, LoadingController, AlertController, ToastController, Platform, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../servicesproveedor/storage.service';
import { AuthService } from '../servicesproveedor/auth.service';
import { ObjetcserviceService } from '../servicesproveedor/objetcservice.service';
//import { TutorialPage } from '../tutorial/tutorial.page';
//import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../servicesproveedor/notifications.service';
import { GeneralService } from '../servicesproveedor/general.service';
import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
import { registerPlugin, Plugin } from '@capacitor/core';
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
import { Geolocation, GeolocationPluginPermissions, PermissionStatus } from '@capacitor/geolocation';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';


@Component({
  selector: 'app-login-proveedor',
  templateUrl: './login-proveedor.page.html',
  styleUrls: ['./login-proveedor.page.scss'],
})
export class LoginProveedorPage implements OnInit {

  user: any = {};
  private apiResponse:any;
  public datos:any;
  public response:any;
  public loading:any;
  public loginUserForm:any;
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
  public subscription: any;
  public btnApple: boolean = false;
  recordarme=false;

  constructor(
    public nav: NavController, 
    private loadingController: LoadingController,  
    private builder: FormBuilder, 
    public alertController: AlertController, 
    public storage: StorageService,
    public storagecliente: StorageService,
    public auth: AuthService, 
    private toastController: ToastController,
    private objService: ObjetcserviceService,
    private objService2: ObjectserviceService,
    private platform: Platform,
    public modalController: ModalController,
    private noticationService: NotificationsService,
    public funciones_generales: GeneralService
  ) {
  }

  ngOnInit() {
    this.haypermisos();
    this.initForm();
    //this.storage.get('TUTORIALPV').then(val => {
      //if (val == null || val == 'undefined') {
        //this.openTutorialPopover();
      //}
    //});
    if (this.platform.is('ios')) {
      this.btnApple = true;
    }
    //this.preguntar();
    
  }

  async haypermisos(){
    const permiso = await Geolocation.checkPermissions();
    console.log('hay permiso')
    console.log('hay permiso',permiso)
    if(permiso.location=='denied'){
      //this.preguntar();
    }
  }

  ionViewDidEnter(){
      this.subscription = this.platform.backButton.subscribe(()=>{
       // navigator['app'].exitApp();
      });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  initForm() {
    this.loginUserForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      token_notificacion: [''],
      recordarme: [false]
    });
    console.log(Boolean(localStorage.getItem('recordar')));
    if (Boolean(localStorage.getItem('recordar'))==true) {
      console.log('true')
      this.loginUserForm.patchValue({
        recordarme: localStorage.getItem('recordar'),
        email:localStorage.getItem('email'),
        password:localStorage.getItem('password'),
      });
    }
  }

  recordar(){
    if (this.loginUserForm.value.recordarme==true) {
      console.log(this.loginUserForm.value.recordarme,'true')
      //this.loginUserForm.value.recordarme=false;
      localStorage.setItem('recordar','');
      localStorage.setItem('email','');
      localStorage.setItem('password','');
    }else{
      console.log(this.loginUserForm.value.recordarme,'false')
      //this.loginUserForm.value.recordarme=true;
      localStorage.setItem('recordar',this.recordarme.toString());
      localStorage.setItem('email',this.loginUserForm.value.email);
      localStorage.setItem('password',this.loginUserForm.value.password);
    }
  }

  //LOGIN
  login(){ 
    //localStorage.clear();
    setTimeout(() => {
      
      
      if (this.loginUserForm.valid) {
        let self=this;
        this.auth.login(this.loginUserForm.value).subscribe({
          next(data){
            console.log(data);
            //alert(JSON.stringify(data))
            if (data) {
              
              self.data(data);
              
              
              

            }
          },error(err){
              console.log(err)
              self.presentToast('Datos inválidos.');
              //alert(JSON.stringify(err))
          }
          });
      } 
    }, 1000);  
  }
  data(data:any){
    this.storage.set('TRPSV24',data.token);
    this.funciones_generales.set_TRPSV24(data.token);
    this.storage.set('idRPSV24',data.user.repartidor.id);
    this.funciones_generales.set_idRPSV24(data.user.repartidor.id);
    this.storage.setObject('userRPSV24', data.user);
    this.funciones_generales.set_userRPSV24(data.user)
    this.funciones_generales.set('TUSV24',data.token);
    this.funciones_generales.setObject('userSV24', data.user);
    this.presentToast('Inicio de sesión exitoso. Espere unos segundos...');
    setTimeout(() => {
      this.objService2.setcerrarSesion(true);
    }, 500);
    setTimeout(() => {
      //self.funciones_generales.iniciar();
      this.noticationService.registrar_token();
    }, 6000);
    setTimeout(() => {
      this.nav.navigateRoot('/tabs/tab6');
      this.objService.setInit('setInit');
      this.objService2.updateIsCliente(true);
    }, 2500);
  }
  //LOGIN Apple
 

  // LOGIN FACEBOOK
  

  

  

  async presentLoading() {
   // this.loading = await this.loadingController.create({
    //  spinner: 'dots',
    //  duration: 25000,
    //  translucent: true,
    //  cssClass: 'custom-class custom-loading'
    //});
    //return await this.loading.present();
  }

  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  async preguntar(){
    const alert = await this.alertController.create({
      header: '¿Deseas compartir tu ubicación con nosotros?',
      message: 'Necesitamos información de tu ubicación para tener todas las funciones y en algunos casos ver tu ubicación en tiempo real. Incluso si colocas la app en segundo plano.',
      buttons: [
            {
              text: 'Dar permisos de ubicación',
              handler: () => {
                this.openSettings();
              }
            },
            {
              text: 'Si',
              handler: () => {
                this.requestLocationPermissions();
              }
            },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
               
              }
            }
          ]
      });
      await alert.present();
  }

  openSettings(){
    BackgroundGeolocation.openSettings();
  }

  async requestLocationPermissions(): Promise<void> {
    const permiso = await Geolocation.requestPermissions();
    console.log('requestLocationPermissions',permiso)
    console.log('requestLocationPermissions')
    if(permiso.location=='denied'){
      this.openSettings();
    }
  }
  
  home(){
    this.nav.navigateRoot('/tabs/tab1');
    this.objService2.updateIsCliente(false);
  }
  register(){
  	this.nav.navigateForward('register-proveedor');
  }

  resetPassword(){
    this.nav.navigateForward('proveedor/email-password');
  }

  goBack(){
    this.nav.pop();
  }
  password_type1: string = 'password';
  togglePasswordMode1() {   
    this.password_type1 = this.password_type1 === 'text' ? 'password' : 'text';
  }  

  /*async openTutorialPopover() {
    const modal = await this.modalController.create({
      component: TutorialPage,
      backdropDismiss: false,
      cssClass: 'tutorial-modal-css'
    });
    return await modal.present();
  }*/

}
