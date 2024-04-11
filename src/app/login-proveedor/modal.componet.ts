import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { IonicModule, ModalController,NavController,Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../servicesproveedor/auth.service';
import { StorageService } from '../servicesproveedor/storage.service';
import { ObjetcserviceService } from '../servicesproveedor/objetcservice.service';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';
import { NotificationsService } from '../servicesproveedor/notifications.service';
import { GeneralService } from '../servicesproveedor/general.service';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'modal.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalComponent {
  name: string='';
  usr:any;
  toastController: any;
  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    public auth: AuthService,
    public nav: NavController, 
    public storage: StorageService,
    private objService: ObjetcserviceService,
    private objService2: ObjectserviceService,
    private noticationService: NotificationsService,
    public funciones_generales: GeneralService ) {

      let usr:any=localStorage.getItem('userSV24');
      console.log(usr);
      usr=JSON.parse(usr);
      this.usr=usr;
      console.log(usr);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  async ir(){
    if (this.platform.is('android')) {
      let url ='https://play.google.com/store/apps/details?id=proveedores.service24.app';
      await Browser.open({ url: url});

    } else if (this.platform.is('ios')) {
      let url ='https://apps.apple.com/ve/app/service24-proveedores/id6471127999';
      await Browser.open({ url: url});

    }

    
  }

  change(){
    let self=this;
    let credentials={
      email:this.usr.email
    }
        this.auth.change(credentials).subscribe({
          next(data){
            console.log(data);
            self.loginViaGoogle();
            self.cancel();
          },error(err){
              console.log(err)
              self.presentToast('Ha ocurrido un error al convertirte en proveedor!');
              //alert(JSON.stringify(err))
          }
          });
  }

  async loginViaGoogle() {
    //this.presentLoading();
    try {
          let self=this;
          let credentials={
            email:this.usr.email
          }
          this.auth.loginSocial(credentials).subscribe({
            next(data: any){
              console.log(data);
              
              if (data) {              
                self.data(data);
              }else {
                self.presentToast("Accesso Denegado.");
              }
            },error(err: any){
              console.log(err)
              self.presentToast('Datos inválidos.');
            }
          });

      } catch (error) {
          console.log(error);
          this.presentToast("Ha ocurrido un error al iniciar sesion con tu nuevo usuario proveedor!");
          //this.loading.dismiss();
        }
  }

  data(data:any){
    console.log(data)
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
}