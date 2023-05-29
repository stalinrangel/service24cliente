import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from './../../services/language/language.service';

@Component({
  selector: 'app-language-alert',
  templateUrl: './language-alert.page.html',
  styleUrls: ['./language-alert.page.scss'],
})
export class LanguageAlertPage implements OnInit {

  languages:any = [];
  selected = '';
 
  constructor(
  	private languageService: LanguageService, 
  	private modalController: ModalController
  ) { }
 
  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }
 
  select(lng:any) {
    this.languageService.setLanguage(lng);
    this.modalController.dismiss();
  }

}

