import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from './services/notifications.service';
import { GeneralService } from './services/general.service';

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
  }
}
