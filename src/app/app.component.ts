import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService,
              private noticationService: NotificationsService          
    ) {
    translate.setDefaultLang('es');
    translate.use('es');
  }
}
