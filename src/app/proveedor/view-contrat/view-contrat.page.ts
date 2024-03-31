import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, NavController } from '@ionic/angular';
import { SignaturePage } from '../signature/signature.page';
import { UserService } from '../../servicesproveedor/user.service';
import { StorageService } from '../../servicesproveedor/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';

@Component({
  selector: 'app-view-contrat',
  templateUrl: './view-contrat.page.html',
  styleUrls: ['./view-contrat.page.scss'],
})
export class ViewContratPage implements OnInit {

  
	private tipo_registro=localStorage.getItem('tipo_registro');

  public data: any;
public data2: any;
public contrat_url: any = null;
public firma: boolean = false;
public planB: boolean = false;
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
    usuario_id: ''
  }
  public data3: any;
  public contract_url: any;
  public plan: any;
  public plans: any = [];
  public signature: string = '';
    loading: any;
    public select_plan: any = '1';
    public estado = { 
    plan: '',
    token: null
  };


constructor(
  public navCtrl: NavController,
  private objService: ObjetcserviceService,
  public sanitizer: DomSanitizer,
  public storage: StorageService,
  public userService: UserService,
  public modalController: ModalController,
  public loadingCtrl: LoadingController,
) { 

}

ngOnInit() {
  this.getContrat();
  this.getPlans();
}

getContrat(){
  let items2:any=this.storage.get('TRPSV24');
    if (items2 != '' && items2 != null) {
      let items3:any=this.storage.getObject('userRPSV24');
        if (items3) {
          //console.log(items3)
          this.userService.getContrat(items3.id,items2).subscribe(
            (            data: any) => {
            //console.log(data)
            this.data = data;
            if (this.data.Contratos.url != null && this.data.Contratos.url != '') {
              this.contrat_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.Contratos.url);
            } else {
              this.contrat_url = null;
            } 
            if (this.data.Contratos.firma == null || this.data.Contratos.firma == '') {
              this.firma = true;
            }
            if (this.data.Contratos.plan == null || this.data.Contratos.plan == '') {
              this.planB = true;
            } else {
              this.plan = this.data.Contratos.plan;
            }       
          },
            (            msg: { status: number; }) => {
            if(msg.status == 400 || msg.status == 401){ 
              this.storage.set('TRPSV24','');
              this.navCtrl.navigateRoot('login');
            }
          });
        } 
    }
}

gotopage(){
  this.navCtrl.navigateForward('finish-register');
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
                  if (items3.registro.tipo == '1') {
                      this.contract.nombre = items3.nombre;
                    this.contract.ci = items3.registro.cedula;
                    this.contract.direccion = items3.registro.direccion;
                    this.contract.telefono = items3.telefono;
                    this.contract.usuario_id = items3.id;
                    this.contract.plan = this.plan;
                    this.contract.firma = '';
                    this.userService.postContrat(items3.nombre,items3.registro.cedula,items3.registro.direccion,items3.telefono,items3.id,this.plan,items2,this.contract,items3.pais_id).subscribe(
                      (	                    data: any) => {
                      this.loading.dismiss();
                      this.firma = false;
                      this.getContrat();
                    },
                      (	                    msg: { status: number; }) => {
                      this.loading.dismiss();
                      if(msg.status == 400 || msg.status == 401){ 
                        this.storage.set('TRPSV24','');
                        this.navCtrl.navigateRoot('login');
                      }
                    });
                  } else {
                      this.contract.nombre = items3.registro.contacto_nombre;
                    this.contract.ci = items3.registro.contacto_cedula;
                    this.contract.direccion = items3.registro.direccion;
                    this.contract.telefono = items3.telefono;
                    this.contract.usuario_id = items3.id;
                    this.contract.plan = this.plan;
                    this.contract.firma = '';
                    this.userService.postContrat(items3.registro.contacto_nombre,items3.registro.contacto_cedula,items3.registro.direccion,items3.telefono,items3.id,this.plan,items2,this.contract,items3.pais_id).subscribe(
                      (	                    data: any) => {
                      this.loading.dismiss();
                      this.firma = false;
                      this.getContrat();
                    },
                      (	                    msg: { status: number; }) => {
                      this.loading.dismiss();
                      if(msg.status == 400 || msg.status == 401){ 
                        this.storage.set('TRPSV24','');
                        this.navCtrl.navigateRoot('login');
                      }
                    });
                  }
                } 
            },
            (              msg: { status: number; }) => {
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

  getPlans(){
    let items1:any=this.storage.getObject('userRPSV24');
      if (items1) {
        let items:any=this.storage.get('TRPSV24');
          if (items) {
            this.userService.getPlans(items, items1.pais_id,this.tipo_registro).subscribe(
              (					        data: any) => {
                   this.data2 = data;
                   this.plans = this.data2.Planes;
                   for (var i = 0; i < this.plans.length; ++i) {
                     this.plans[i].descripcion = JSON.parse(this.plans[i].descripcion);
                     this.plans[i].show = false; 
                   }
                },
              (					        msg: any) => {  
                  console.log(msg);
                  //this.loading.dismiss();
                  //this.presentToast(msg.error.error);
              }
            );
          }
      }
}

selectPlan(plan: { id: any; }){
  this.select_plan = plan.id;
}

setPlan(){
  let items:any=this.storage.get('idRPSV24');
      if (items) {
        let items2:any=this.storage.get('TRPSV24');
            if (items2) {
              for (var i = 0; i < this.plans.length; ++i) {
                if (this.plans[i].id == this.select_plan) {
                  this.presentLoading('Seleccionando plan...');
                  this.estado.plan = JSON.stringify(this.plans[i]);
                  this.userService.setUser(items,items2,this.estado).subscribe(
                    (			                data: any) => {
                      this.storage.getObject('userRPSV24').then((items3: { registro: { tipo: string; cedula: string; direccion: string; contacto_nombre: string; contacto_cedula: string; }; nombre: string; telefono: string; id: string; pais_id: any; }) => {
                    if (items3) {
                      if (items3.registro.tipo == '1') {
                                this.contract.nombre = items3.nombre;
                              this.contract.ci = items3.registro.cedula;
                              this.contract.direccion = items3.registro.direccion;
                              this.contract.telefono = items3.telefono;
                              this.contract.usuario_id = items3.id;
                              this.contract.plan = this.plan;
                              this.contract.firma = '';
                          this.plan = this.estado.plan;
                          //console.log(this.contract);
                            this.userService.postContrat(items3.nombre,items3.registro.cedula,items3.registro.direccion,items3.telefono,items3.id,this.plan,items2,this.contract,items3.pais_id).subscribe(
                              (								                data: any) => {
                                this.data3 = data;
                                this.planB = false;
                                this.firma = true;
                                this.loading.dismiss();
                                this.getContrat();
                              },
                              (								              	msg: { status: number; }) => {
                                this.loading.dismiss();
                                if(msg.status == 400 || msg.status == 401){ 
                                  this.storage.set('TRPSV24','');
                                  this.navCtrl.navigateRoot('login');
                                }
                          });
                            } else {
                                this.contract.nombre = items3.registro.contacto_nombre;
                              this.contract.ci = items3.registro.contacto_cedula;
                              this.contract.direccion = items3.registro.direccion;
                              this.contract.telefono = items3.telefono;
                              this.contract.usuario_id = items3.id;
                              this.contract.plan = this.plan;
                              this.contract.firma = '';
                          this.plan = this.estado.plan;
                          //console.log(this.contract);
                            this.userService.postContrat(items3.registro.contacto_nombre,items3.registro.contacto_cedula,items3.registro.direccion,items3.telefono,items3.id,this.plan,items2,this.contract,items3.pais_id).subscribe(
                              (								                data: any) => {
                                this.data3 = data;
                                this.planB = false;
                                this.firma = true;
                                this.loading.dismiss();
                                this.getContrat();
                              },
                              (								              	msg: { status: number; }) => {
                                this.loading.dismiss();
                                if(msg.status == 400 || msg.status == 401){ 
                                  this.storage.set('TRPSV24','');
                                  this.navCtrl.navigateRoot('login');
                                }
                          });
                            }
                    }
                  });
                  },
                    (			              msg: { status: number; }) => {
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
      }
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
