import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from './services/notifications.service';
import { GeneralService } from './services/general.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { App, AppState } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal.componet';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  message = 'This modal example uses the modalController to present and dismiss modals.';
  
  constructor(private translate: TranslateService,
              private noticationService: NotificationsService,
              private funciones_generales: GeneralService,
              private modalCtrl: ModalController,
                    
    ) {
    translate.setDefaultLang('es');
    translate.use('es');
    this.splash();
    this.openModal();
  }
  
  async splash(){
    /*App.addListener('appStateChange',() => {
      (state: AppState) => {
            if (state.isActive) {
               Capacitor.isNativePlatform() && SplashScreen.hide();
            }
          }
      })*/

      await SplashScreen.show({
        showDuration: 2500,
        autoHide: false,
      });

      setTimeout(async () => {
        await SplashScreen.hide();
      }, 2500);  

      
      
  }

  async openModal() {
    setTimeout(async () => {
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.message = `Hello, ${data}!`;
      }
    }, 1000);  

  }

  
  
}
