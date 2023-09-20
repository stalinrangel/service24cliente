import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();


@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.page.html',
  styleUrls: ['./contact-modal.page.scss'],
})
export class ContactModalPage implements OnInit {

  @Input()text:string | any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.text)
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async whatsapp(){
    /*var first = this.user.telefono.charAt(0);
    var second = this.user.telefono.charAt(1);
    var third = this.user.telefono.charAt(2);*/
    let url ="https://wa.me/"+this.text.telefono;
    await Browser.open({ url: url });
    /*if (first == '5' || first == '+') {
      await Browser.open({ url: url+this.user.telefono });
     // cordova.InAppBrowser.open(" https://wa.me/"+this.user.telefono,"_system");
    } else {
      await Browser.open({ url: url+this.user.telefono });
     // cordova.InAppBrowser.open(" https://wa.me/507"+this.user.telefono,"_system");
    }*/
  }

  async callClient(text: string) {
    await Clipboard.write({
      string: text
    });
    alert("Se ha copiado el correo electrónico")
  }
}
