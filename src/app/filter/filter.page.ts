import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from '../../services/storage/storage.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { GeneralService } from '../services/general.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  public datos: any;
	public zones: any = [];
	public show: boolean = false;
  public myZone: string = '';
  public loading:any;
  @Input() value: any;
  public countries: any = [];
  public country_id: any;

  constructor(
  	private catService: CategoriesService,
    private modalCtrl:ModalController,
    public storage: StorageService,
   // public events: Events,
    private loadingController: LoadingController, 
    private objService: ObjectserviceService,
    private funciones_generales: GeneralService,
    private UserService: UserService,
    private toastController: ToastController
  ) {
  	this.getCountries();
  }

  ngOnInit() {
    this.myZone = this.value.nombre;
   //this.myZone = '1';
  }

  /*getZones(){
    this.presentLoading();
    this.catService.getCity().subscribe(
      resp => {
        this.loading.dismiss();
        this.datos = resp;
        this.zones = this.datos.coordenadas;
        this.zones = this.sortByKey(this.zones,'nombre');
        for (var i = 0; i < this.zones.length; ++i) {
          this.zones[i].show = true;
          this.zones[i].zonas = this.sortByKey(this.zones[i].zonas,'nombre');
        }
      },
      error => {       
        console.log(error);
        this.loading.dismiss();
      }
    );
  }*/

  getCountries(){
   //this.presentLoading();
   this.catService.getCountries().subscribe(
      resp => {
        //this.loading.dismiss();
        this.datos = resp;
        this.countries = this.datos.coordenadas;
        this.countries = this.sortByKey(this.countries,'nombre');
        this.setCountry(this.countries[0]);
      },
      error => {  
        //this.loading.dismiss();     
        console.log(error);
      }
    ); 
  }

  setCountry(country:any){
    this.zones = country.ciudad;
    this.zones = this.sortByKey(this.zones,'nombre');
    for (var i = 0; i < this.zones.length; ++i) {
      this.zones[i].show = true;
      this.zones[i].zonas = this.sortByKey(this.zones[i].zonas,'nombre');
    }
  }


  setZone(zone:any){
    console.log(zone);
    this.funciones_generales.setZone(zone);
    this.objService.set_zona(zone);
    this.objService.setExtras(zone);
    this.storage.setObject('ZONESV24', zone);
    //this.events.publish('changeZoneSV24', 'zoneSV');
    let items:any='';
    let items2:any='';
    this.storage.getObject('userSV24').then(data => {
      items=data;
      this.storage.get('TUSV24').then(data => {
        items2=data;
        console.log(items.id,items2,zone.id)
        let dataw={
          zona_id:zone.id
        }
        this.UserService.setUsuario(items.id,items2,dataw).subscribe(
          data => {
            console.log(data);
            this.presentToast('Se ha cambiado de zona a: '+zone.nombre);
          },
          msg => {
            
          });
      },msg => {
                    
      }); 
    });
    
    
			
    this.modalCtrl.dismiss();
  }
  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  public sortByKey(array:any, key:any) {
    return array.sort(function (a:any, b:any) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      duration: 15000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

}
