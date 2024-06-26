import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NavController, IonList, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { StorageService, Item } from '../../services/storage/storage.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { CategoriesService } from '../../services/categories/categories.service';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilterPage } from '../filter/filter.page';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Geolocation } from '@capacitor/geolocation';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {

  public searchTerm: string = '';
	public item: any = [];
	public items: any = [];
  public data: any = [];
  public datos: any=false;
  public datos2: any=false;
  public searching: boolean = false;
  newItem: Item = <Item>{};
  @ViewChild('mylist')mylist: any;
  @ViewChild('textSearch')textSearch: any;

  public results: number = 0;
  public myLocation = {
    lat: 0,
    lng: 0
  }
  public loading!: HTMLIonLoadingElement;
  public zone: any;
  public show_notify: boolean = false;
  public populares:any=[];
  constructor(
    private nav: NavController,
    private storageService: StorageService,
    private catService: CategoriesService,
    private storage: StorageService,
    private objService: ObjectserviceService,
    public modalController: ModalController,
    //private geolocation: Geolocation,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private zoneN: NgZone,
    private router: Router,
    private funciones_generales: GeneralService
  ) {
    console.log(this.router.url);
		this.objService.setruta(this.router.url);
    this.initOrder();
  }

  ngOnInit() {
    
    this.geolocate();
    this.catService.getPopulares().subscribe(
      data => {
        console.log(data.categorias)  
        this.populares=data.categorias;
        setTimeout(() => {
          this.showpopulares=true;
        }, 1000);
        
      },
      msg => { 
        console.log(msg)  
      }
    );
    
  }
  async geolocate(){
    this.presentLoading();
		/*console.log('geolocate')
		const options = { enableHighAccuracy: true };
		const coordinates = await Geolocation.getCurrentPosition(options);
		
		console.log('Current position:', coordinates);
	
		const latLng = {
		  lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
		};
    this.myLocation.lat=latLng.lat;
    this.myLocation.lng=latLng.lng;
	  */
    let geo:any=localStorage.getItem('geo');
    let latLng = JSON.parse(geo);
    this.myLocation=latLng;
    console.log(latLng)
    this.initOrder();
    //this.getServices(latLng)
    setTimeout(() => {
      //this.textSearch.setFocus();
    },100);
    this.loadItems();
    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    });
	}
  addHistory() {
    if (this.searchText != '') {
      this.newItem.title = this.searchText;
      this.newItem.modified = Date.now();
      this.newItem.id = Date.now();

      this.storageService.addRecent(this.newItem).then(item => {
        this.newItem = <Item>{};
        this.loadItems();
      });
    }
  }

  loadItems() {
    /*this.catService.getCategory('1').subscribe(
      resp => {
        console.log(resp)
       
        //this.item = resp.catprincipales;        
      },
      error => {       
        console.log(error);
        this.item = [];
       
      }
  );*/
    this.storageService.get('recent').then(items => {
      this.items = items;
      console.log(items)
      if (this.items) {
        this.items = this.sortByKey(this.items,'modified');
      }   
    });
  }

  deleteItem(item: Item) {
    this.storageService.deleteRecent(item.id).then(item => {
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }
  
  initOrder(){
    //this.storage.getObject('ZONESV24').then(items => {
     // if (items != '' && items != null) {
       /* this.zone = items;
        if (this.zone.id == '') {
          this.zone.id = 1000;
        }*/
        //this.presentLoading();
        let zona = this.funciones_generales.getZone();
        console.log(zona)
        this.item = [];
        let self=this;
        
        this.catService.getProviders(zona.id).subscribe(
          data => {
        
            //self.loading.dismiss();
            console.log(data)
            this.datos = data.productos;
            this.datos2 = data.otros;
            console.log(this.datos)
            for (let i = 0; i < this.datos.length; i++) {
              this.datos[i].categoria = this.datos[i].subcategoria.categoria.nombre;
              this.datos[i].subcategoria = this.datos[i].subcategoria.nombre;
              //console.log(this.myLocation,this.datos[i].establecimiento.lat,this.datos[i].establecimiento.lng);
              this.datos[i].distance = this.getDistance(this.myLocation,this.datos[i].establecimiento.lat,this.datos[i].establecimiento.lng);
              try {
                this.datos[i].plan = JSON.parse(this.datos[i].establecimiento.usuario.repartidor.plan);
              } catch (error) {
                console.log(this.datos[i])
                //alert(this.datos[i])

              }
              try {
                if (this.datos[i].zonas2.length==0) {
                  this.datos[i].zonas2=[{'nombre':'Sin zona'}]
                }
              } catch (error) {
                
              }
              

            }
            for (let i = 0; i < this.datos2.length; i++) {
              this.datos2[i].categoria = this.datos2[i].subcategoria.categoria.nombre;
              this.datos2[i].subcategoria = this.datos2[i].subcategoria.nombre;
              this.datos2[i].distance = this.getDistance(this.myLocation,this.datos2[i].establecimiento.lat,this.datos2[i].establecimiento.lng);
              try {
                this.datos2[i].plan = JSON.parse(this.datos2[i].establecimiento.usuario.repartidor.plan);
              } catch (error) {
                console.log(this.datos2[i])
                //alert(this.datos2[i])
              }
              try {
                if (this.datos2[i].zonas2.length==0) {
                  this.datos2[i].zonas2=[{'nombre':'Sin zona'}]
                }
              } catch (error) {
                
              }
              

            }
            this.getCurrentPosition();
            self.loading.dismiss();   
          },
          msg => { 
            self.loading.dismiss();    
          }
        );
      //}
   // });
      
  }
  public showpopulares:boolean=false;
  setFilteredItems2() {
    console.log('2')
   }
  setFilteredItems() {
    this.searching = true;
    this.item = this.datos;
    console.log(this.datos)
    let val = this.searchTerm;
    if (val && val.trim() != '') {
      console.log(this.datos)
      if (this.datos.length > 0) {
        this.zoneN.run(()=>{
          this.item = this.item.filter((item: { nombre: string; nombre1: string; descripcion: string; descripcion1: string; establecimiento: { nombre: string; nombre1: string; direccion: string; direccion1: string; };categoria: { nombre: string; }; subcategoria: { nombre: string; nombre1: string; categoria: { nombre: string; nombre1: string; }; }; }) => {
            if (item.nombre) {
              item.nombre1 = this.removeDiacritics(item.nombre);
            } else {
              item.nombre = '';
              item.nombre1 = '';
            }
            if (item.descripcion) {
              item.descripcion1 = this.removeDiacritics(item.descripcion);
            } else {
              item.descripcion = '';
              item.descripcion1 = '';
            }
            if (item.establecimiento.nombre) {
              item.establecimiento.nombre1 = this.removeDiacritics(item.establecimiento.nombre);
            } else {
              item.establecimiento.nombre = '';
              item.establecimiento.nombre1 = '';
            }
            if (item.establecimiento.direccion) {
              item.establecimiento.direccion1 = this.removeDiacritics(item.establecimiento.direccion);
            } else {
              item.establecimiento.direccion = '';
              item.establecimiento.direccion1 = '';
            }
            if (item.subcategoria.nombre) {
              item.subcategoria.nombre1 = this.removeDiacritics(item.subcategoria.nombre);
            } else {
              item.subcategoria.nombre = '';
              item.subcategoria.nombre1 = '';
            }
            if (item.subcategoria.categoria.nombre) {
              item.subcategoria.categoria.nombre1 = this.removeDiacritics(item.subcategoria.categoria.nombre);
            } else {
              item.subcategoria.categoria.nombre = '';
              item.subcategoria.categoria.nombre1 = '';
            }
            return item.nombre1.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.descripcion1.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.establecimiento.nombre1.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.establecimiento.direccion1.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.subcategoria.nombre1.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.subcategoria.categoria.nombre1.toLowerCase().indexOf(val.toLowerCase()) > -1
            || item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.establecimiento.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.establecimiento.direccion.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.subcategoria.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.subcategoria.categoria.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
          })
          console.log(this.item)
          this.item = this.sortByKey1(this.item,'distance');
          this.results = this.item.length; 
        })
      }
    }
    if (val == '') {
      this.searching = false;
      this.item = []; 
    }

    for (let i = 0; i < this.item.length; i++) {
      console.log(this.item)
      this.item[i].distance = this.getDistance(this.myLocation,this.item[i].establecimiento.lat,this.item[i].establecimiento.lng);
      
    }
  }

  setSearch(){
  	this.searching = false;
  }

  setProvider(item: { estado: any; id: any; }){
    console.log(item)
    if (item.estado == 'ON') {
      this.addHistory();
      this.objService.setExtras(item.id);
      this.objService.setCat(item);
      this.nav.navigateForward('detail-provider/'+item.id);
    } else {
      this.translate.get('SEARCH.notdisp').subscribe((res1: string) => {           
        this.presentToast(res1);
      });
    }
  }

  setHistory(item: { title: string; }){
    this.searchText = item.title;
    this.setFilteredItems();
  }

  public sortByKey(array: any[], key: string) {
      return array.sort(function (a: { [x: string]: any; }, b: { [x: string]: any; }) {
          var x = a[key]; var y = b[key];
          return ((x > y) ? -1 : ((x < y) ? 0 : 1));
      });
  }

   removeDiacritics (str: string) {

    var defaultDiacriticsRemovalMap = [
      {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
      {'base':'AA','letters':/[\uA732]/g},
      {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
      {'base':'AO','letters':/[\uA734]/g},
      {'base':'AU','letters':/[\uA736]/g},
      {'base':'AV','letters':/[\uA738\uA73A]/g},
      {'base':'AY','letters':/[\uA73C]/g},
      {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
      {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
      {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
      {'base':'DZ','letters':/[\u01F1\u01C4]/g},
      {'base':'Dz','letters':/[\u01F2\u01C5]/g},
      {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
      {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
      {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
      {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
      {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
      {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
      {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
      {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
      {'base':'LJ','letters':/[\u01C7]/g},
      {'base':'Lj','letters':/[\u01C8]/g},
      {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
      {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
      {'base':'NJ','letters':/[\u01CA]/g},
      {'base':'Nj','letters':/[\u01CB]/g},
      {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
      {'base':'OI','letters':/[\u01A2]/g},
      {'base':'OO','letters':/[\uA74E]/g},
      {'base':'OU','letters':/[\u0222]/g},
      {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
      {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
      {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
      {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
      {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
      {'base':'TZ','letters':/[\uA728]/g},
      {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
      {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
      {'base':'VY','letters':/[\uA760]/g},
      {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
      {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
      {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
      {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
      {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
      {'base':'aa','letters':/[\uA733]/g},
      {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
      {'base':'ao','letters':/[\uA735]/g},
      {'base':'au','letters':/[\uA737]/g},
      {'base':'av','letters':/[\uA739\uA73B]/g},
      {'base':'ay','letters':/[\uA73D]/g},
      {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
      {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
      {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
      {'base':'dz','letters':/[\u01F3\u01C6]/g},
      {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
      {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
      {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
      {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
      {'base':'hv','letters':/[\u0195]/g},
      {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
      {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
      {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
      {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
      {'base':'lj','letters':/[\u01C9]/g},
      {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
      {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
      {'base':'nj','letters':/[\u01CC]/g},
      {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
      {'base':'oi','letters':/[\u01A3]/g},
      {'base':'ou','letters':/[\u0223]/g},
      {'base':'oo','letters':/[\uA74F]/g},
      {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
      {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
      {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
      {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
      {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
      {'base':'tz','letters':/[\uA729]/g},
      {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
      {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
      {'base':'vy','letters':/[\uA761]/g},
      {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
      {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
      {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
      {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
    ];

    for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
      str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
    }

    return str;

  }

  goFilter() {
    this.storage.getObject('ZONESV24').then(items => {
      if (items) {
        this.presentModal(items)
      }   
    });  
  }

  getCurrentPosition(){
    /*let optionsGPS:any = {timeout: 7000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(optionsGPS)
    .then((position: { coords: { latitude: number; longitude: number; }; }) => {
      this.myLocation.lat = position.coords.latitude;
      this.myLocation.lng = position.coords.longitude;
      if (this.datos.productos.length > 0) {
        for (var i = 0; i < this.datos.productos.length; ++i) {
          this.datos.productos[i].distance = this.getDistance(this.myLocation,this.datos.productos[i].establecimiento.lat,this.datos.productos[i].establecimiento.lng);
          if (this.datos.productos[i].establecimiento.usuario != null) {
            if (this.datos.productos[i].establecimiento.usuario.repartidor != null) {
              this.datos.productos[i].status = this.datos.productos[i].establecimiento.usuario.repartidor.activo;
              if (this.datos.productos[i].status != 4) {
                this.data.push(this.datos.productos[i]);
              }         
            }
          }
        } 
      }
      if (this.searchTerm != '') {
        this.setFilteredItems();
      }
    })
    .catch((error: any) => {
      if (this.searchTerm != '') {
        this.setFilteredItems();
      }
    })*/
  }

  rad(x: number) {
    return x * Math.PI / 180;
  };

  mToMiles(m: number) {return (m / 1000).toFixed(2);}

  getDistance = function(this: SearchFilterPage, p1:any, p2Lat:any, p2Lng:any) {
    var R = 6378137;
    var dLat = this.rad(p2Lat - p1.lat);
    var dLong = this.rad(p2Lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2Lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return this.mToMiles(d);
  };

  public sortByKey1(array:any, key:any) {
    return array.sort(function (a:any, b:any) {
        var x = parseFloat(a[key]); var y = parseFloat(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  async presentToast(text:any) {
      const toast = await this.toastCtrl.create({
        message: text,
        duration: 2000,
        cssClass: 'toast-scheme'
      });
      toast.present();
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
  tipo="normal";
  get filteredItems() {
    //return this.chats;

    if(this.tipo=="normal"){
      if (this.datos==false) {
        return [];
      }else if(this.searchText==""){
        return [];
      }else{
        const searchTextNormalized = this.normalizeText(this.searchText);
        return this.datos.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase() === searchTextNormalized.toLowerCase() || this.normalizeText(item.categoria).toLowerCase() === searchTextNormalized.toLowerCase() || this.normalizeText(item.subcategoria).toLowerCase() === searchTextNormalized.toLowerCase()))
        .concat(this.datos.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.categoria).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.subcategoria).toLowerCase().includes(searchTextNormalized.toLowerCase())) && !((this.normalizeText(item.nombre).toLowerCase() === searchTextNormalized.toLowerCase()) || (this.normalizeText(item.categoria).toLowerCase() === searchTextNormalized.toLowerCase()) || (this.normalizeText(item.subcategoria).toLowerCase() === searchTextNormalized.toLowerCase()))))
        .sort((a:any, b:any) => {
          const nameA = this.normalizeText(a.nombre).toLowerCase();
          const nameB = this.normalizeText(b.nombre).toLowerCase();
          const categoryA = this.normalizeText(a.categoria).toLowerCase();
          const categoryB = this.normalizeText(b.categoria).toLowerCase();
          const subcategoryA = this.normalizeText(a.subcategoria).toLowerCase();
          const subcategoryB = this.normalizeText(b.subcategoria).toLowerCase();

          const exactMatchA = (nameA === searchTextNormalized.toLowerCase() || categoryA === searchTextNormalized.toLowerCase() || subcategoryA === searchTextNormalized.toLowerCase());
          const exactMatchB = (nameB === searchTextNormalized.toLowerCase() || categoryB === searchTextNormalized.toLowerCase() || subcategoryB === searchTextNormalized.toLowerCase());

          if (exactMatchA && !exactMatchB) {
              return -1;
          } else if (!exactMatchA && exactMatchB) {
              return 1;
          } else {
              return nameA.includes(searchTextNormalized.toLowerCase()) || categoryA.includes(searchTextNormalized.toLowerCase()) || subcategoryA.includes(searchTextNormalized.toLowerCase()) ? -1 : 1;
          }
      });
      }
    }else if(this.tipo=="cercano"){
      const searchTextNormalized = this.normalizeText(this.searchText);
      return this.datos.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.categoria).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.subcategoria).toLowerCase().includes(searchTextNormalized.toLowerCase())))
        .sort((a:any, b:any) => {
          return a.distance - b.distance;
        });
    }else if(this.tipo=="calificaciones"){
      const searchTextNormalized = this.normalizeText(this.searchText);
      return this.datos.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.categoria).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.subcategoria).toLowerCase().includes(searchTextNormalized.toLowerCase())))
        .sort((a:any, b:any) => {
          return b.promedio_calificacion - a.promedio_calificacion;
        });
    }
    
    
  }

  normalizeText(text: string) {
    //console.log(text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()); 
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  get filteredItems2() {
    //return this.chats;
    //console.log(this.datos);
    const searchTextNormalized = this.normalizeText(this.searchText);
    if(this.tipo=="normal"){
      if (this.datos2==false) {
        return [];
      }else if(this.searchText==""){
        return [];
      }else{
        return this.datos2.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase() === searchTextNormalized.toLowerCase() || this.normalizeText(item.categoria).toLowerCase() === searchTextNormalized.toLowerCase() || this.normalizeText(item.subcategoria).toLowerCase() === searchTextNormalized.toLowerCase()))
        .concat(this.datos2.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.categoria).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.subcategoria).toLowerCase().includes(searchTextNormalized.toLowerCase())) && !((this.normalizeText(item.nombre).toLowerCase() === searchTextNormalized.toLowerCase()) || (this.normalizeText(item.categoria).toLowerCase() === searchTextNormalized.toLowerCase()) || (this.normalizeText(item.subcategoria).toLowerCase() === searchTextNormalized.toLowerCase()))))
        .sort((a:any, b:any) => {
          const nameA = this.normalizeText(a.nombre).toLowerCase();
          const nameB = this.normalizeText(b.nombre).toLowerCase();
          const categoryA = this.normalizeText(a.categoria).toLowerCase();
          const categoryB = this.normalizeText(b.categoria).toLowerCase();
          const subcategoryA = this.normalizeText(a.subcategoria).toLowerCase();
          const subcategoryB = this.normalizeText(b.subcategoria).toLowerCase();

          const exactMatchA = (nameA === searchTextNormalized.toLowerCase() || categoryA === searchTextNormalized.toLowerCase() || subcategoryA === searchTextNormalized.toLowerCase());
          const exactMatchB = (nameB === searchTextNormalized.toLowerCase() || categoryB === searchTextNormalized.toLowerCase() || subcategoryB === searchTextNormalized.toLowerCase());

          if (exactMatchA && !exactMatchB) {
              return -1;
          } else if (!exactMatchA && exactMatchB) {
              return 1;
          } else {
              return nameA.includes(searchTextNormalized.toLowerCase()) || categoryA.includes(searchTextNormalized.toLowerCase()) || subcategoryA.includes(searchTextNormalized.toLowerCase()) ? -1 : 1;
          }
      });
      }
    }else if(this.tipo=="cercano"){
      return this.datos2.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.categoria).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.subcategoria).toLowerCase().includes(searchTextNormalized.toLowerCase())))
        .sort((a:any, b:any) => {
          return a.distance - b.distance;
        });
    }else if(this.tipo=="calificaciones"){
      return this.datos2.filter((item:any) => (this.normalizeText(item.nombre).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.categoria).toLowerCase().includes(searchTextNormalized.toLowerCase()) || this.normalizeText(item.subcategoria).toLowerCase().includes(searchTextNormalized.toLowerCase())))
        .sort((a:any, b:any) => {
          return b.promedio_calificacion - a.promedio_calificacion;
        });
    }
    
    
  }

  cercanos(){
    this.tipo="cercano";
    //this.filteredItems();
  }
  calificaciones(){
    this.tipo="calificaciones";
    //this.filteredItems();
  }

  

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  selecPopular(item:any){
    this.searchText=item;
  }

}

