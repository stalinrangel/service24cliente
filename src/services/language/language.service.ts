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
    console.log(this.language);
    this.translate.setDefaultLang(this.language);
 
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }
 
  getLanguages() {
    console.log(this.language);
    if (this.language == 'en') {
      return [
        { text: 'English', value: 'en', img: 'assets/icon/en.svg' },
        { text: 'Spanish', value: 'es', img: 'assets/icon/es.svg' },
        { text: 'Portuguese', value: 'po', img: 'assets/icon/po.svg' },
      ];
    } else if (this.language == 'es') {
      return [
        { text: 'Inglés', value: 'en', img: 'assets/icon/en.svg' },
        { text: 'Español', value: 'es', img: 'assets/icon/es.svg' },
        { text: 'Portugues', value: 'po', img: 'assets/icon/po.svg' },
      ];
    } else if (this.language == 'po') {
      return [
        { text: 'Inglês', value: 'en', img: 'assets/icon/en.svg' },
        { text: 'Espanhol', value: 'es', img: 'assets/icon/es.svg' },
        { text: 'Português', value: 'po', img: 'assets/icon/po.svg' },
      ];
    } else {
      return [
        { text: 'Inglés', value: 'en', img: 'assets/icon/en.svg' },
        { text: 'Español', value: 'es', img: 'assets/icon/es.svg' },
        { text: 'Portugues', value: 'po', img: 'assets/icon/po.svg' },
      ];
    }
  } 

  getLan() {
    return this.selected; 
  }
 
  setLanguage(lng:any) {
    console.log(lng)
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}