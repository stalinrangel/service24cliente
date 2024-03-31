import { Component, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from './services/notifications.service';
import { GeneralService } from './services/general.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { App, AppState, URLOpenListenerEvent } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal.componet';
import { Router } from '@angular/router';

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
              private zone: NgZone,
              private router: Router,
                    
    ) {
    translate.setDefaultLang('es');
    translate.use('es');
    this.splash();
    //this.openModal();
    this.initializeApp();
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

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // Example url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            let slug :any= event.url.split(".app").pop();
            console.log("******************************************");
            console.log(slug)
            console.log("******************************************");
            //slug = '/tabs/tab3';

            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // If no match, do nothing - let regular routing
            // logic take over
        });
    });
}

  
  
}
