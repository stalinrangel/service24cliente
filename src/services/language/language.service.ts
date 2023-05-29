import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
const LNG_KEY = 'SELECTED_LANGUAGE';
 
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';
  language: any;
  private storage= new Storage();
  constructor(private translate: TranslateService, private plt: Platform) {
    this.storage.create();
   }
 
  setInitialAppLanguage() {
    this.language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(this.language);
 
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }
 
  getLanguages() {
    if (this.language == 'en') {
      return [
        { text: 'English', value: 'en', img: 'assets/icon/en.svg' },
        { text: 'Spanish', value: 'es', img: 'assets/icon/es.svg' },
      ];
    } else {
      return [
        { text: 'Inglés', value: 'en', img: 'assets/icon/en.svg' },
        { text: 'Español', value: 'es', img: 'assets/icon/es.svg' },
      ];
    }    
  }

  getLan() {
    return this.selected; 
  }
 
  setLanguage(lng:any) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}