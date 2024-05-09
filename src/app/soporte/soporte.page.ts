import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  async support(){
		let url ='https://wa.me/506092925959';
		await Browser.open({ url: url});
		/*if (this.band_chatSupport) {	
			this.objService.setExtras(this.chat_support);
			this.navCtrl.navigateForward('chat-support');
		} else {
			this.presentToast(this.info);
		}*/
	}

  async callClient() {
    await Clipboard.write({
      string: 'info@service24.app'
    });
    alert("Se ha copiado el correo electrónico")
  }

  atras(){
    this.navCtrl.navigateForward('/tabs/tab1');
  }
}
