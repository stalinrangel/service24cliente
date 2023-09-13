import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { FilterPage } from '../filter/filter.page';
import { StorageService } from '../../services/storage/storage.service';
import { LanguageService } from './../../services/language/language.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CategoriesService } from 'src/services/categories/categories.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.page.html',
  styleUrls: ['./subcategory.page.scss'],
})
export class SubcategoryPage implements OnInit {

  public data: any;
	public category: any = [];
  public catInfo: any;
  public languages: any = 'es';
  public show_notify: boolean = false;

  constructor(
    private nav: NavController,
  	private objService: ObjectserviceService,
    public modalController: ModalController,
    public storage: StorageService,
    private languageService: LanguageService,
    private catService: CategoriesService,
  ) { 
    this.languages = this.languageService.getLan();
    if (this.languages == 'undefined' || this.languages == '') {
      this.languages = 'es';
    }
    this.data = this.objService.getExtras();
    this.catInfo = this.objService.getCat();
    this.category = this.data.subcategorias;
    console.log(this.category)
    setTimeout(() => {
      for (let i = 0; i < this.category.length; i++) {
        this.category[i].tam=0;
         this.proveedores(this.category[i].id,i);
      }
    }, 1000);
    

    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    });
  }

  ngOnInit() {  	
  }

  proveedores(id:any,i:any){
    let tam=0;
    this.catService.getServices(id, '1').subscribe(
      data => {
        console.log(data.productos.length)
        this.category[i].tam=data.productos.length;
      },
      msg => {      
        console.log(msg);
      }
    );
  }

  setSearch(){
    this.objService.setCat(this.catInfo);
    this.nav.navigateForward('search-filter');
  }

  setProduct(item:any){
    this.objService.setCat(item);
    this.nav.navigateForward('providers');
  }

  goFilter() {
    this.storage.getObject('ZONESV24').then(items => {
      if (items) {
        this.presentModal(items)
      }   
    });  
  }

  async presentModal(zone:any){
    const modal = await this.modalController.create({
      component: FilterPage,
      componentProps: { value: zone }
    });
    modal.onDidDismiss().then((close)=> {
          
    });
    return await modal.present();
  }

  async viewNotification() {
      const modal = await this.modalController.create({
        component: NotificationsComponent
      });
      modal.onDidDismiss().then((close)=> { 
        this.show_notify = false;      
      });
      return await modal.present();  
  }

  searchText: string = "";
  get filteredItems() {
    //return this.chats;
    return this.category.filter((item:any) => item.nombre.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
