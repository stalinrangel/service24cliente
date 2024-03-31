import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';

import * as moment from 'moment';
import 'moment/locale/es';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from '../../servicesproveedor/storage.service';
import { UserService } from '../../servicesproveedor/user.service';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';
import { SignaturePage } from '../signature/signature.page';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
})
export class ContractPage implements OnInit {

  public today: any;
	public day: any;
	public month: any;
	public user = {
		name: '',
		address: '',
		phone: '',
    ci: ''
	}
  public signature: string = '';
  loading: any;
  image: any;
  data:any;
  idRegister: any;
  public document = {
    contrato: ''
  }
  public contrat_url: any;
  public contract1 = {
    firma: ''
  }
  public contract = {
    nombre: '',
    ci: '',
    telefono: '',
    direccion: '',
    firma: '',
    plan: '',
    usuario_id: '',
  }
  public data3: any;
  public contract_url: any;
  public plan: any; 
  public typeUser: any = '1';

  constructor(
    public navCtrl: NavController, 
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    private file: File,
    //private fileOpener: FileOpener,
    private platform: Platform,
    //private transfer: FileTransfer,
    private objService: ObjetcserviceService,
    public userService: UserService,
    public storage: StorageService,
    public sanitizer: DomSanitizer
  ) { 
    this.data = this.objService.getExtras();
    let contrat = this.objService.getCat();
    this.contrat_url = this.sanitizer.bypassSecurityTrustResourceUrl(contrat);
    this.idRegister = this.objService.getId();
    this.plan = this.objService.getPlans();
    this.typeUser = this.objService.getType();
    //console.log(this.data);
    //console.log(this.typeUser);
  }

  ngOnInit() {
  	moment.locale('es');
  	this.today = moment().format('LL');
  	this.day = moment().format('DD');
  	this.month = moment().format('MMMM');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SignaturePage
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.signature = dataReturned.data;
      }
    });
    return await modal.present();
  }

  exportPdf(){
    this.presentLoading('Enviando Documento...');
    this.uploadImage();
  }


  public uploadImage() {
    this.editSignature();
  }

  editSignature(){
    let items:any=this.storage.get('idRPSV24');
      if (items != '' && items != null) {
        let items2:any=this.storage.get('TRPSV24');
          if (items2 != '' && items2 != null) {
            this.contract1.firma = this.signature;
            this.userService.setUser(items,items2,this.contract1).subscribe(
              (              data: any) => {
                let items3:any=this.storage.getObject('userRPSV24');
                  if (items3) {
                    //console.log(items3)
                    if (this.data.tipo == '1') {
                      this.contract.nombre = this.data.nombre;
                      this.contract.ci = this.data.cedula;
                      this.contract.direccion = this.data.direccion;
                      this.contract.telefono = this.data.telefono;
                      this.contract.usuario_id = items3.id;
                      this.contract.plan = this.plan;
                      this.contract.firma = '';
                      this.userService.postContrat(this.data.nombre,this.data.cedula,this.data.direccion,this.data.telefono,items3.id,this.plan,items2,this.contract,items3.pais_id).subscribe(
                        (                      data: any) => {
                        //console.log(data)
                        this.data3 = data;
                        this.contract_url = this.data3.Contratos.url;
                        this.loading.dismiss();
                        this.navCtrl.navigateForward('view-contrat');
                      },
                        (                      msg: { status: number; }) => {
                        this.loading.dismiss();
                        if(msg.status == 400 || msg.status == 401){ 
                          this.storage.set('TRPSV24','');
                          this.navCtrl.navigateRoot('login');
                        }
                      });
                    } else {
                      this.contract.nombre = this.data.contacto_nombre;
                      this.contract.ci = this.data.contacto_cedula;
                      this.contract.direccion = this.data.direccion;
                      this.contract.telefono = this.data.telefono;
                      this.contract.usuario_id = items3.id;
                      this.contract.plan = this.plan;
                      this.contract.firma = '';
                      this.userService.postContrat(this.data.contacto_nombre,this.data.contacto_cedula,this.data.direccion,this.data.telefono,items3.id,this.plan,items2,this.contract,items3.pais_id).subscribe(
                        (                      data: any) => {
                        //console.log(data)
                        this.data3 = data;
                        this.contract_url = this.data3.Contratos.url;
                        this.loading.dismiss();
                        this.navCtrl.navigateForward('view-contrat');
                      },
                        (msg: { status: number; }) => {
                        this.loading.dismiss();
                        if(msg.status == 400 || msg.status == 401){ 
                          this.storage.set('TRPSV24','');
                          this.navCtrl.navigateRoot('login');
                        }
                      });
                    }
                  } 
              },
              (msg: { status: number; }) => {
                this.loading.dismiss();
                if(msg.status == 400 || msg.status == 401){ 
                  this.storage.set('TRPSV24','');
                  //this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                  this.navCtrl.navigateRoot('login');
                }
            });
          }
      }
  }

  gotopage(){
    this.navCtrl.navigateForward('/tabs/tab3');
  }

  async presentLoading(msg:any) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      spinner: 'dots',
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }
}

