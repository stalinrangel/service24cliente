import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';
import { AuthService } from '../../servicesproveedor/auth.service';
import { UserService } from '../../servicesproveedor/user.service';
import { StorageService } from '../../servicesproveedor/storage.service';
import { GeneralService } from '../../servicesproveedor/general.service';
import { LanguageService } from 'src/services/language/language.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  styleUrls: ['./planes.page.scss'],
})
export class PlanesPage implements OnInit {

  private tipo_registro=localStorage.getItem('tipo_registro');

  plans: any = [];
  plan: any;
  repartidor:any;
  nuevo_plan:any;
  data2:any
  public select_plan: any;
	public estado = { 
	    plan: '',
	    token: null
	};
  public languages: any = '';
  constructor(
    public navCtrl: NavController,  
    private alertController: AlertController, 
    private loadingController: LoadingController, 
    private builder: FormBuilder, 
    private toastController: ToastController, 
    public userService: UserService, 
    public storage: StorageService, 
    private objService: ObjetcserviceService,
    public funciones_generales: GeneralService,
    private languageService: LanguageService
  ) {
    this.plan=this.funciones_generales.getPlan();
    this.repartidor=this.funciones_generales.getRepartidor();
		console.log(this.plan,this.repartidor);	  
  }

  ngOnInit() {
    this.getPlans();
    this.languages = this.languageService.getLan();
    if (this.languages == 'undefined' || this.languages == '') {
      this.languages = 'es';
    }
  }

  getPlans(){
		let items1:any= this.storage.getObject('userRPSV24');
  			if (items1) {
  				let items:any=this.storage.get('TRPSV24');
		  			if (items) {
		  				this.userService.getPlans(items, items1.pais_id,this.tipo_registro).subscribe(
					        data => {
					        	console.log(data);
					       		this.data2 = data;
					       		this.plans = this.data2.Planes;
					       		for (var i = 0; i < this.plans.length; ++i) {
					       			this.plans[i].descripcion = JSON.parse(this.plans[i].descripcion);
                       this.plans[i].descripcion_ingles = JSON.parse(this.plans[i].descripcion_ingles);
                       this.plans[i].descripcion_portugues = JSON.parse(this.plans[i].descripcion_portugues);
					       			this.plans[i].show = false; 
                      console.log(this.plans[i].id,this.plan.id);
                      if (this.plans[i].id==this.plan.id) {
                        this.select_plan = this.plan.id;
                        this.nuevo_plan=this.plans[i];
                      }
					       		}
					        },
					        msg => {  
					        	console.log(msg);
					        	//this.loading.dismiss();
					        	//this.presentToast(msg.error.error);
						    }
					    );
		  			}
			   // });
  			}
	    //});  
	}

  selectPlan(plan:any){
		this.select_plan = plan.id;
    this.setPlan();
	}
  
  setPlan(){
    for (var i = 0; i < this.plans.length; ++i) {
      if (this.plans[i].id == this.select_plan) {
            this.nuevo_plan=this.plans[i];
            this.presentToast('Has seleccionado otro plan!');
      }
    }     	
	}

  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2500,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  async presentConfirm1() {
    const alert = await this.alertController.create({
    message: '¿Desea cambiar el plan?',
    buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.change();
            }
          }
        ]
    });
    await alert.present();
  }

  change(){
    let data={
      plan: JSON.stringify(this.nuevo_plan)
    }
    let token:any=this.storage.get('TRPSV24');
    console.log(data)
    this.userService.setUser(this.repartidor.id, token,data).subscribe(
      data => {
        console.log(data);
        this.presentToast('Has cambiado con éxito tu plan!')
        this.funciones_generales.iniciar();
      },
      msg => {  
        console.log(msg);
    }
  );
  }
}
