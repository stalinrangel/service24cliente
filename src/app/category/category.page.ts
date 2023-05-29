import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { FilterPage } from '../filter/filter.page';
import { StorageService } from '../../services/storage/storage.service';
import { LanguageService } from './../../services/language/language.service';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  public data: any;
	public category: any = [];
	public items: any = [];
	public searchTerm: string = '';
	public searching: any = false;
	public item: any = [];
  public languages: any = 'es';
  public show_notify: boolean = false;

  constructor(
    private nav: NavController,
  	private objService: ObjectserviceService,
    public modalController: ModalController,
    public storage: StorageService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit() {
  	this.languages = this.languageService.getLan();
    if (this.languages == 'undefined' || this.languages == '') {
      this.languages = 'es';
    }
    console.log(this.languages)
    this.data = this.objService.getExtras();
    this.category = this.data.categorias;
    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    });
  }

  setSearch(){
    this.objService.setCat(this.data);
    this.nav.navigateForward('search-filter');
  }

  setProduct(cat:any){
    console.log(cat);
    this.objService.setExtras(cat);
    this.objService.setCat(this.data);
    this.nav.navigateForward('subcategory');
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
}
