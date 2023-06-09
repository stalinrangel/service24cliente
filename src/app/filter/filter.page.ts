import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { StorageService } from '../../services/storage/storage.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';


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
    private objService: ObjectserviceService
  ) {
  	this.getCountries();
  }

  ngOnInit() {
   // this.myZone = this.value.nombre;
   this.myZone = '1';
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
   this.presentLoading();
   this.catService.getCountries().subscribe(
      resp => {
        this.loading.dismiss();
        this.datos = resp;
        this.countries = this.datos.coordenadas;
        this.countries = this.sortByKey(this.countries,'nombre');
      },
      error => {  
        this.loading.dismiss();     
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
    this.objService.setExtras(zone);
    this.storage.setObject('ZONESV24', zone);
    //this.events.publish('changeZoneSV24', 'zoneSV');
    this.modalCtrl.dismiss();
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
