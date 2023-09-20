import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  @Input()img:string | any;

  public config: SwiperOptions={
    zoom: {
      maxRatio: 5,
    },
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.img)
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
