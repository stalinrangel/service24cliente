import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from './services/notifications.service';
import { GeneralService } from './services/general.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { App, AppState } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  constructor(private translate: TranslateService,
              private noticationService: NotificationsService,
              private funciones_generales: GeneralService        
    ) {
    translate.setDefaultLang('es');
    translate.use('es');
    this.splash();
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
  
}
