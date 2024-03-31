import { AfterViewInit, Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  csignature = '';
  isDrawing = false;
  signatureImg:any;
  signaturePad!: SignaturePad;
  @ViewChild('canvas')
  canvasEl!: ElementRef;
	public signaturePadOptions: Object = {
		'minWidth': 2,
		'canvasWidht': 400,
		'canvasHeight': 200,
		'penColor': '#000000'
	};

  constructor(
  	private modalCtrl:ModalController,
    public navCtrl: NavController,
  ) { 
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    let self=this;
    setTimeout(async() => {
      //this.navCtrl.navigateForward('/tabs/tab3');
      await this.modalCtrl.dismiss(self.signaturePad);
    }, 100);
  }

  ionViewDidEnter() {
   //this.canvasResize();
  }
 
  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }

  /*canvasResize() { 
  	let canvas = document.querySelector('canvas');
  	var ratio = Math.max(window.devicePixelRatio || 1, 1);
  	canvas.width = (canvas.clientWidth * ratio);
  	this.signaturePad.clear();
  }*/
 
  /*async savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.signaturePad.clear();
    await this.modalCtrl.dismiss(this.signature);
  }
 
  clearPad() {
    this.signaturePad.clear();
  }*/

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
