import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
//import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { StorageService } from '../../services/storage/storage.service';
import { OrdersService } from '../../services/orders/orders.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
//import { Diagnostic } from '@ionic-native/diagnostic/ngx';
//import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import * as moment from 'moment';

//declare var google;
@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.page.html',
  styleUrls: ['./service-form.page.scss'],
})
export class ServiceFormPage  {

  map: any;
	markers: any[] = [];
	waypoints: any[] = [];
	refresh: boolean = true;
	myLatLng: any;
	data: any;
	category: any;
	loading: any;
	myDate: any;
	service: any = [];
	@ViewChild("places") public places: any;
	public orderForm: FormGroup;
	formErrors = {
	'direccion': '',
	'referencia': '',
	'tiempo': ''
	};

	constructor(
	private nav: NavController,
	//private geolocation: Geolocation,
	private platform: Platform,
	private objService: ObjectserviceService,
	private zone: NgZone,
	private storage: StorageService, 
	public orderService: OrdersService,
	private builder: FormBuilder, 
	public loadingController: LoadingController,
	private toastController: ToastController,
	private alertController: AlertController,
	//private diagnostic: Diagnostic,
	//private locationAccuracy: LocationAccuracy
	) { 
		//this.data = this.objService.getExtras();
		//this.category = this.objService.getCat();
		this.myDate = moment().format();
		this.orderForm = this.builder.group({
			lat: [null],
			lng: [null],
			direccion: ['', [Validators.required]],
			referencia: ['', [Validators.required]],
			distancia: [10],
			tiempo: ['', [Validators.required]],
			hora: [moment().format('hh:mm A')],
			horaAux: ['',[Validators.required]],
			subtotal: [10],
			costo: [10],
			gastos_envio: [10],
			costo_envio: [10],
			usuario_id: [null],
			repartidor_id: [null],
			repartidor_nombre: [null],
			productos: [null],
			ruta: ['ruta'],
			token: [null],
			zona_id: ['']
		});
		this.service.push({producto_id: 1, cantidad: 1, observacion: '', precio_unitario: 0});
		this.orderForm.patchValue({productos: JSON.stringify(this.service)});
		this.orderForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
		this.orderForm.controls['horaAux'].valueChanges.subscribe(
		  (selectedValue) => {
		    this.orderForm.patchValue({hora: moment(selectedValue).format('hh:mm A')});
		  }
		);
		this.platform.ready().then(()=>{
			this.loadMap({lat:-34.460429,lng:-57.836462});
		})
	}

	ionViewDidLoad() {	
		this.updateSearchResults();	
	}

	ionViewDidLeave() {
	    this.clearMarker();
	}

	goBack(){
    	this.nav.pop();
  	}

	tryGeolocation() {
		/*this.getUserPosition().then(
	        data => {
		        this.myLatLng = {
					lat: data.coords.latitude,
					lng: data.coords.longitude
				}
				this.clearMarker();
				this.createMarker(this.myLatLng);
				this.geocodeLatLng(this.myLatLng.lat,this.myLatLng.lng);   
	        },
	        msg => {       
	        }
	    );*/
	}

	/*getUserPosition() {
		return new Promise<any>(resolve => {
		  const HIGH_ACCURACY = 'high_accuracy';
		  if (this.platform.is('cordova')) {
		    this.platform.ready().then(() => {
		      this.diagnostic.isLocationEnabled().then(enabled => {
		        if (enabled) {
		          if (this.platform.is('android')) {
		            this.diagnostic.getLocationMode().then(locationMode => {
		              if (locationMode === HIGH_ACCURACY) {
		                this.geolocation.getCurrentPosition({timeout: 30000, maximumAge: 0, enableHighAccuracy: true}).then(pos => {
		                  resolve({
		                    coords: {
		                      latitude: pos.coords.latitude,
		                      longitude: pos.coords.longitude
		                    }
		                  });
		                }).catch(error => resolve(error));
		              } else {
		                this.askForHighAccuracy().then(available => {
		                  if (available) {
		                    this.getUserPosition().then(a => resolve(a), e => resolve(e));
		                  }
		                }, error => resolve(error));
		              }
		            });
		          } else {
		            this.geolocation.getCurrentPosition({timeout: 30000, maximumAge: 0, enableHighAccuracy: true}).then(pos => {
		              resolve({
		                coords: {
		                  latitude: pos.coords.latitude,
		                  longitude: pos.coords.longitude
		                }
		              });
		            }).catch(error => resolve(error));
		          }
		        } else {
		          this.locationAccuracy.request(1).then(result => {
		            if (result) {
		              this.getUserPosition().then(result => resolve(result), error => resolve(error));
		            }
		          }, error => {
		            resolve(error)
		          });
		        }
		      }, error => {
		        resolve(error)
		      });
		    });
		  } else {
		    this.geolocation.getCurrentPosition({timeout: 30000, maximumAge: 0, enableHighAccuracy: true}).then(pos => {
              resolve({
                coords: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude
                }
              });
            }).catch(error => resolve(error));
		  }
		});
	}

	askForHighAccuracy(): Promise<Geoposition> {
		return new Promise(resolve => {
		  this.locationAccuracy
		    .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
		    this.geolocation.getCurrentPosition({timeout: 30000}).then(
		      position => {
		        resolve(position);
		      }, error => resolve(error)
		    );
		  }, error => resolve(error));
		});
	}*/

	updateSearchResults() {
		/*const options = {
		  types: ['address'],
		  componentRestrictions: { country: ["uy","pa"] }
		};
		const inputElement = document.getElementById('places').getElementsByTagName('input')[0];
		let autocomplete = new google.maps.places.Autocomplete(inputElement, options);
		var that = this;
		google.maps.event.addListener(autocomplete, 'place_changed', () => {
			let place = autocomplete.getPlace();
			that.myLatLng.lat = place.geometry.location.lat();
			that.myLatLng.lng = place.geometry.location.lng();
			that.orderForm.patchValue({direccion: place.formatted_address});
			that.clearMarker();
			that.createMarker(that.myLatLng);
		});*/
	};

	loadMap(position:any){
		/*let mapEle: HTMLElement = document.getElementById('map');
		this.myLatLng = position;

		this.map = new google.maps.Map(mapEle, {
			center: position,
			zoom: 18,
			mapTypeControl: false,
		    fullscreenControl: false,
		    streetViewControl:false,
		    styles: [
			  {
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#f5f5f5"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#f5f5f5"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.land_parcel",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#bdbdbd"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#eeeeee"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e5e5e5"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#ffffff"
			      }
			    ]
			  },
			  {
			    "featureType": "road.arterial",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#dadada"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "featureType": "road.local",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.line",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e5e5e5"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.station",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#eeeeee"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#c9c9c9"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  }
			]
		});

		google.maps.event.addListenerOnce(this.map, 'idle', () => {
			mapEle.classList.add('show-map');
			this.tryGeolocation();
		});*/
    }

    createMarker(latlng:any) {
    	/*var icon = {
		    url: "/assets/icon/icono-locacion.svg",
		    scaledSize: new google.maps.Size(44, 44),
		    origin: new google.maps.Point(0,0),
		    anchor: new google.maps.Point(22,44)
		};
	    var marker = new google.maps.Marker({
	      position: latlng,
	      map: this.map,
	      draggable: true,
	      icon: icon
	    });
	    this.markers.push(marker);
	    this.map.setCenter(latlng);
	    var that = this;
	    google.maps.event.addListener(marker, 'dragend', function () { 
	      var point = this.getPosition();
	      that.geocodeLatLng(point.lat(),point.lng());
	    });*/
	};

	clearMarker(){
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
		this.markers = [];
	}

	geocodeLatLng(lat:any,lng:any) {
		/*var end = {lat: lat, lng: lng};
		var that = this;
		let geocoder = new google.maps.Geocoder;
		geocoder.geocode({'location': end}, function(results, status) {
		  if (status === 'OK') {
		    if (results[1]) {
		    	that.zone.run(() => {
		    		that.orderForm.patchValue({direccion: results[1].formatted_address});
		      		that.myLatLng.lat = lat;
		      		that.myLatLng.lng = lng;      
		    	})
		    } 
		  }
		});*/
	};

	sendOrder(){
		if (this.orderForm.valid) {
			this.orderForm.patchValue({lat: this.myLatLng.lat});
			this.orderForm.patchValue({lng: this.myLatLng.lng});
			this.storage.getObject('userSV24').then(items => {
		      if (items != '' && items != null) {
		      	this.orderForm.patchValue({usuario_id: items.id});
		      	this.storage.get('TUSV24').then(items2 => {
			      if (items2 != '' && items2 != null) {

			      	this.storage.getObject('ZONESV24').then(items3 => {
				      if (items3 != '' && items3 != null) {
				        let zone = items3;
				        if (zone.id == '') {
				          zone.id = 1000;
				        }
				        this.presentLoadingWithOptions();
				        this.orderForm.patchValue({zona_id: zone.id});
				      	this.orderForm.patchValue({token: items2});
				      	console.log(this.orderForm.value);
				      	this.orderService.setOrder(this.orderForm.value).subscribe(
					        data => {
						        this.loading.dismiss();
						        this.presentAlert();      
					        },
					        msg => {       
					          this.loading.dismiss();
					          if(msg.status == 400 || msg.status == 401){
					          	this.storage.set('TUSV24',''); 
								this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
								this.nav.navigateForward('login');
							  } else {

							  	this.presentToast(msg.error.error);
							  }
					        }
					    );
				      }
				    });
				  }
			    });
			  } else {
			  	this.nav.navigateForward('login');
			  }
		    });
		} else {
			this.validateAllFormFields(this.orderForm);
			this.presentToast('Debe completar todos los campos para enviar su solicitud.');
		}	
	}

	async presentLoadingWithOptions() {
	this.loading = await this.loadingController.create({
	  spinner: 'dots',
	  duration: 15000,
	  translucent: true,
	  cssClass: 'custom-class custom-loading'
	});
	return await this.loading.present();
	}


	async presentAlert() {
		const alert = await this.alertController.create({
		  header: '¡Solicitud Enviada!',
		  message: 'Su solicitud de servicio ha sido enviada con éxito.',
		  buttons: [
				{
		      text: 'OK',
		      handler: () => {
		        this.nav.navigateRoot('/tabs/tab1'); 
		      }
		    }
		  ]
		});

		await alert.present();
	}

	async presentToast(text:any) {
		const toast = await this.toastController.create({
		  message: text,
		  duration: 2000,
		  cssClass: 'toast-scheme'
		});
		toast.present();
	}

	navInit(){
    	this.nav.navigateRoot('/tabs/tab1');
  	}

	onValueChanged(data?: any) {
		if (!this.orderForm) { return; }
		const form = this.orderForm;
		for (const field in this.formErrors) { 
		  const control = form.get(field);
		  //this.formErrors[field] = '';
		  if (control && control.dirty && !control.valid) {
		    for (const key in control.errors) {
		      //this.formErrors[field] += true;
		      console.log(key);
		    }
		  } 
		}
	}

	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
		  const control = formGroup.get(field);
		  if (control instanceof FormControl) {
		    control.markAsDirty({ onlySelf:true });
		    this.onValueChanged();
		  } else if (control instanceof FormGroup) {
		    this.validateAllFormFields(control);
		  }
		});
	}

}
