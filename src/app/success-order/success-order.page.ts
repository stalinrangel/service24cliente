import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.page.html',
  styleUrls: ['./success-order.page.scss'],
})
export class SuccessOrderPage implements OnInit {

  constructor(
  	private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
  }

  closeModal() {
  	this.modalCtrl.dismiss();
  }

}
