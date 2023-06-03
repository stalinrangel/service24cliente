import { Component, OnInit, ViewChild } from '@angular/core';
import {  NavController, Platform, ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageAlertPage } from '../language-alert/language-alert.page';
import { Storage } from '@ionic/storage';
import { TutorialPage } from '../tutorial/tutorial.page';

@Component({
  selector: 'app-seinit-service',
  templateUrl: './seinit-service.page.html',
  styleUrls: ['./seinit-service.page.scss'],
})
export class SeinitServicePage implements OnInit {

  //@ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  public subscription: any;

  constructor(
    private nav: NavController,
    private platform: Platform,
    public modalController: ModalController,
    private alertController: AlertController,
    private storage: Storage,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.storage.get('TUTORIAL').then(val => {
      if (val == null || val == 'undefined') {
        this.openTutorialPopover();
      } else {
        //this.presentAlert();
      }
    });
  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        //navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  presentAlert() {
    /*this.translate.get('ALERT.title').subscribe((res1: string) => {           
      this.translate.get('ALERT.msg').subscribe((res2: string) => {           
        this.alert1(res1,res2)
      });
    });*/ 
  }

  async alert1(res1:any,res2:any) {
    const alert = await this.alertController.create({
      header: res1,
      message: res2,
      buttons: [
     {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });

    await alert.present(); 
  }

  async openLanguagePopover() {
    const modal = await this.modalController.create({
      component: LanguageAlertPage,
      backdropDismiss: false,
      cssClass: 'language-modal-css'
    });
    return await modal.present();
  }

  async openTutorialPopover() {
    const modal = await this.modalController.create({
      component: TutorialPage,
      backdropDismiss: false,
      cssClass: 'tutorial-modal-css'
    });
    modal.onDidDismiss().then((close)=> {
      //this.presentAlert();
    });
    return await modal.present();
  }

  navHome(){
    this.nav.navigateRoot('/tabs/tab1');
  }

  navForm(){
    this.nav.navigateForward('/service-form');
  }

  nextSlide(){
  	//this.slides.slideNext();
  }

  prevSlide(){
  	//this.slides.slidePrev();
  }

}
