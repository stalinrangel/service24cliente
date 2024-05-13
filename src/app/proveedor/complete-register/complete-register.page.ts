import { Component, OnInit, NgZone, ViewChild, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '../../servicesproveedor/storage.service';
import { NavController, Platform, LoadingController, AlertController, ToastController, ActionSheetController, IonContent, IonBackButtonDelegate, ModalController } from '@ionic/angular';
//import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
//import { Diagnostic } from '@ionic-native/diagnostic/ngx';
//import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { OrdersService } from '../../servicesproveedor/orders.service';
import { UserService } from '../../servicesproveedor/user.service';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { FilePath } from '@ionic-native/file-path/ngx';
//import { File } from '@ionic-native/file/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';
//import { BackgroundMode } from '@ionic-native/background-mode/ngx';
//import { CameraPreviewPage } from '../camera-preview/camera-preview.page';
//import { Crop } from '@ionic-native/crop/ngx';
import { RefreshService } from '../../servicesproveedor/refresh.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
//declare var google;
//declare var cordova: any;
import { Camera, CameraResultType } from '@capacitor/camera'; 
import { environment } from '../../../environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { register } from 'swiper/element/bundle';
import { Swiper } from "swiper";
import { GeneralService } from '../../servicesproveedor/general.service';
import { LanguageService } from 'src/services/language/language.service';

register();
declare var google:any;

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.page.html',
  styleUrls: ['./complete-register.page.scss'],
})
export class CompleteRegisterPage implements OnInit {

  private tipo_registro2='1';

  private swiperInstance: any;
  @ViewChild('swiper')
  set swiper(swiperRef: ElementRef) {
    /**
     * This setTimeout waits for Ionic's async initialization to complete.
     * Otherwise, an outdated swiper reference will be used.
     */
    setTimeout(() => {
      this.swiperInstance = swiperRef.nativeElement.swiper;
      
    }, 0);
	

  }
  //@ViewChild('slides', {static: true}) slides: IonSlides;
  //@ViewChild(IonContent, {static: true}) content: IonContent;
  //@ViewChild(IonBackButtonDelegate, {static: true}) backButton: IonBackButtonDelegate;

  	private miId=localStorage.getItem('idRPSV24');

	public registerProfileForm: FormGroup;
	public data1ProfileForm: FormGroup;
	public data2ProfileForm: FormGroup;
	public referencePForm: FormGroup;
	public referenceCForm: FormGroup;
	public data1CompanyForm: FormGroup;
	public registeCompanyForm: FormGroup;
	formErrors = {
		'nombre': '',
		'cedula': '',
		'sexo': '',
		'nacionalidad': '',
		'direccion': '',
		'direccion_exacta': '',
		'dn': '',
		'mn': '',
		'yn': '',
		'email': '',
		'telefono': '',
		'area': '',
		'formacion': '',
		'experiencia': '',
		'anos_experiencia': '',
		'idoneidad': '',
		'disponibilidad': '',
		'idioma': '',
		'idiomas': '',
		'urgencias': '',
		'factura': '',
		'referencias': '',
		'foto': '',
		'pasaporte': '',
		'idoneidad_file': '',
		'record_policivo': '',
		'recibo_servicio': '',
		'nombre1': '',
		'direccion1': '',
		'telefono1': '',
		'nombre2': '',
		'direccion2': '',
		'telefono2': '',
		'ruc': '',
		'contacto_nombre': '',
		'contacto_cedula': '',
		'contacto_cargo': ''
	};
	formErrors4 = {
		'nombre1': '',
		'direccion1': '',
		'telefono1': '',
		'contacto1': '',
		'cargo1': '',
		'nombre2': '',
		'direccion2': '',
		'telefono2': '',
		'contacto2': '',
		'cargo2': '',
		'nombre3': '',
		'direccion3': '',
		'telefono3': '',
		'contacto3': '',
		'cargo3': ''
	};
	formLocal :any= {
		nombreP: '',
		cedula: '',
		sexo: '',
		nacionalidad: '',
		direccionP: '',
		direccion_exactaP: '',
		latitudP: '',
		longitudP: '',
		dn: '',
		mn: '',
		yn: '',
		fecha_nacimiento: '',
		emailP: '',
		telefonoP: '',
		nombreE: '',
		ruc: '',
		direccionE: '',
		direccion_exacta: '',
		direccion_exactaE: '',
		latitudE: '',
		longitudE: '',
		emailE: '',
		telefonoE: '',
		contacto_nombre: '',
		contacto_cedula: '',
		contacto_cargo: '',
		area: [],
		formacion: '',
		anos_experiencia: '',
		idoneidad: 'Si',
		disponibilidad: '',
		idioma: [],
		urgencias: 'Si',
		factura: 'Si',
		nombreR1: '',
		telefonoR1: '',
		direccionR1: '',
		nombreR2: '',
		telefonoR2: '',
		direccionR2: '',
		referenciasP: '',
		nombreC1: '',
		telefonoC1: '',
		direccionC1: '',
		contactoC1: '',
		cargoC1: '',
		nombreC2: '',
		telefonoC2: '',
		direccionC2: '',
		contactoC2: '',
		cargoC2: '',
		nombreC3: '',
		telefonoC3: '',
		direccionC3: '',
		contactoC3: '',
		cargoC3: '',
		referenciasE: '',
		foto: '',
		logo: '',
		pasaporteP: '',
		pasaporteE: '',
		operaciones: '',
		idoneidad_file: '',
		record_policivo: '',
		recibo_servicio: '',
		id: '',
		lunes: false,
		lunesi: '',
		lunesf: '',
		martes: false,
		martesi: '',
		martesf: '',
		miercoles: false,
		miercolesi: '',
		miercolesf: '',
		jueves: false,
		juevesi: '',
		juevesf: '',
		viernes: false,
		viernesi: '',
		viernesf: '',
		sabado: false,
		sabadoi: '',
		sabadof: '',
		domingo: false,
		domingoi: '',
		domingof: '',
		tipo: '1',
		pais_id: '',
		select_plan:''
	}
	slideOpts = {
	    initialSlide: 0
	};
	map: any;
	map1: any;
	markers: any[] = [];
	myLatLng: any;
	data: any;
	data1: any;
	data2: any;
	data3: any;
	myDate: any;
	public typeUser = '1';
	public subcategories: any = [];
	public loading: any;
	public categorySelect: any = [];
	public idiomas: any = [];
	public languages = [
		{id: 1, nombre:'Español'},
		{id: 2, nombre:'Francés'},
		{id: 3, nombre:'Inglés'},
		//{id: 4, nombre:'Mandarín'},
		{id: 5, nombre:'Portugués'},
		{id: 6, nombre:'Otro'},
	];
	public preparate = [
		{id: 1, nombre:'Bachiller'},
		{id: 2, nombre:'Técnico'},
		{id: 3, nombre:'Ingeniero'},
		{id: 4, nombre:'Universitario'},
		{id: 5, nombre:'Formación Propia'}
	];
  	lastImage: any;
  	public documents: any = [];
  	progressText1: number = 0;
  	progress1: number = 0;
  	progressText2: number = 0;
  	progress2: number = 0;
  	progressText3: number = 0;
  	progress3: number = 0;
  	progressText4: number = 0;
  	progress4: number = 0;
  	progressText5: number = 0;
  	progress5: number = 0;
  	progressText6: number = 0;
  	progress6: number = 0;
  	public usuario: any;
  	public datos: any;
	public services: any = [];
	public id_est: string = '';
	public up_cedula: boolean = false;
	public up_record: boolean = false;
	public up_recibo: boolean = false;
	public up_cedulaE: boolean = false;
	public up_logo: boolean = false;
	public up_operaciones: boolean = false;
	public subscription: any;
	public plans: any = [];
	public select_plan: any = '';
	public estado = { 
	    plan: '',
	    token: null
	};
	public contract = {
		nombre: '',
		ci: '',
		telefono: '',
		direccion: '',
		firma: '',
		plan: '',
		usuario_id: ''
	}
	public contract_url: any;
	public up_foto1: boolean = false;
	public up_foto2: boolean = false;
	public up_fotoP: boolean = false;
	public up_fotoE: boolean = false;
	public languages2:any = 'es';
	//private subscription1: Subscription;
	//private subscription2: Subscription;
	@ViewChild(IonContent) content!: IonContent;
	constructor(
		private builder: FormBuilder,
		//private geolocation: Geolocation,
	  	private platform: Platform,
	  	private zone: NgZone,
	  	public orderService: OrdersService,
	  	public userService: UserService,
	  	//private diagnostic: Diagnostic,
		//private locationAccuracy: LocationAccuracy,
		public storage: StorageService,
		public navCtrl: NavController,  
	    private alertController: AlertController, 
	    private loadingController: LoadingController,  
	    private toastController: ToastController,
	    public actionSheetController: ActionSheetController,
	    private cdRef: ChangeDetectorRef,
		private languageService: LanguageService,
	    //private camera: Camera,
	    //private filePath: FilePath,
	    //private file: File,
	    //private transfer: FileTransfer,
	    private objService: ObjetcserviceService,
	    public refresh: RefreshService,
	    //private backgroundMode: BackgroundMode,
	    public modalController: ModalController,
		public funciones_generales: GeneralService
	    //private crop: Crop
	) { 

		this.languages2 = this.languageService.getLan();
		if (this.languages2 == 'undefined' || this.languages2 == '') {
		this.languages2 = 'es';
		}

		this.data1ProfileForm = this.builder.group({
			nombre: ['', [Validators.required]],
			cedula: [''],
			sexo: [''],
			nacionalidad: [''],
			direccion: ['', [Validators.required]],
			direccion_exacta: [''],
			latitud: [''],
			longitud: [''],
			fecha_nacimiento: [''],
			dn: [''],
			mn: [''],
			yn: [''],
			email: ['', [Validators.required]],
			telefono: ['', [Validators.required]]
		});
		this.data2ProfileForm = this.builder.group({
			formacion: ['', [Validators.required]],
			idioma: ['', [Validators.required]],
			urgencias: ['Si', [Validators.required]],
			factura: ['Si', [Validators.required]],
			lunes: [true],
			lunesi: ['08:00'],
			lunesf: ['18:00'],
			martes: [true],
			martesi: ['08:00'],
			martesf: ['18:00'],
			miercoles: [true],
			miercolesi: ['08:00'],
			miercolesf: ['18:00'],
			jueves: [true],
			juevesi: ['08:00'],
			juevesf: ['18:00'],
			viernes: [true],
			viernesi: ['08:00'],
			viernesf: ['18:00'],
			sabado: [true],
			sabadoi: ['08:00'],
			sabadof: ['18:00'],
			domingo: [true],
			domingoi: ['08:00'],
			domingof: ['18:00']
		});
		this.referencePForm = this.builder.group({
			nombre1: [''],
			telefono1: [''],
			direccion1: [''],
			nombre2: [''],
			telefono2: [''],
			direccion2: ['']
		});
		this.referenceCForm = this.builder.group({
			nombre1: [''],
			telefono1: [''],
			direccion1: [''],
			contacto1: [''],
			cargo1: [''],
			nombre2: [''],
			telefono2: [''],
			direccion2: [''],
			contacto2: [''],
			cargo2: [''],
			nombre3: [''],
			telefono3: [''],
			direccion3: [''],
			contacto3: [''],
			cargo3: ['']
		});	
		this.registerProfileForm = this.builder.group({
			nombre: ['', [Validators.required]],
			cedula: [''],
			sexo: [''],
			nacionalidad: [''],
			direccion: ['', [Validators.required]],
			direccion_exacta: [''],
			latitud: ['', [Validators.required]],
			longitud: ['', [Validators.required]],
			fecha_nacimiento: [''],
			email: ['', [Validators.required]],
			telefono: ['', [Validators.required]],
			formacion: ['', [Validators.required]],
			disponibilidad: [''],
			idiomas: [''],
			urgencias: [''],
			factura: [''],
			referencias: [''],
			referencias2: [''],
			foto: [''],
			pasaporte: [''],
			idoneidad_file: [''],
			record_policivo:[''],
			recibo_servicio: [''],
			estado: [1],
			usuario_id: [''],
			tipo:['']
		});	
		this.data1CompanyForm = this.builder.group({
			nombre: ['', [Validators.required]],
			ruc: [''],
			direccion: ['', [Validators.required]],
			direccion_exacta: [''],
			latitud: ['', [Validators.required]],
			longitud: ['', [Validators.required]],
			email: ['', [Validators.required]],
			telefono: ['', [Validators.required]],
			contacto_nombre: [''],
			contacto_cedula: [''],
			contacto_cargo: ['']
		});
		this.registeCompanyForm = this.builder.group({
			nombre: ['', [Validators.required]],
			ruc: [''],
			direccion: ['', [Validators.required]],
			direccion_exacta: [''],
			latitud: ['', [Validators.required]],
			longitud: ['', [Validators.required]],
			email: ['', [Validators.required]],
			telefono: ['', [Validators.required]],
			contacto_nombre: [''],
			contacto_cedula: [''],
			contacto_cargo: [''],
			disponibilidad: [''],
			idiomas: ['', [Validators.required]],
			urgencias: ['', [Validators.required]],
			factura: [''],
			referencias2: [''],
			foto: [''],
			logo: [''],
			operaciones: [''],
			pasaporte: [''],
			estado: [1],
			usuario_id: [''],
			tipo:['']
		});	

		let self=this;
		setTimeout(() => {
			self.createMap();
		}, 500);
		setTimeout(() => {
			self.geolocate();
		}, 1500);
	}
	public autocomplete:any;
	direccion:any;
	direccion_exacta:any;
	async createMap() {
		const { Map } = await google.maps.importLibrary("maps");

		this.map = new Map(document.getElementById("map"), {
		center: { lat: environment.lat, lng: environment.lng },
		zoom: 8,
		});

		const center = {  lat: environment.lat, lng: environment.lng, };
		// Create a bounding box with sides ~10km away from the center point
		const defaultBounds = {
			north: center.lat + 0.9,
			south: center.lat - 0.9,
			east: center.lng + 0.9,
			west: center.lng - 0.9,
		};
		const input = document.getElementById("pac-input") as HTMLInputElement;
		const options = {
			bounds: defaultBounds,
			componentRestrictions: { country: "uy" },
			fields: ["address_components", "geometry", "icon", "name"],
			strictBounds: true,
			types: ["geocode"],
		};

		let hasDownBeenPressed = false;

		this.autocomplete = new google.maps.places.Autocomplete(input, options);
		input.addEventListener('keydown', (e) => {
			if (e.keyCode === 40) {
				hasDownBeenPressed = true;
			}
		});
		google.maps.event.addDomListener(input, 'keydown', (e:any) => {
			e.cancelBubble = true;
			if (e.keyCode === 13 || e.keyCode === 9) {
				if (!hasDownBeenPressed && !e.hasRanOnce) {
					google.maps.event.trigger(e.target, 'keydown', {
						keyCode: 40,
						hasRanOnce: true,
					});
				}
			}
		});
		input.addEventListener('focus', () => {
			hasDownBeenPressed = false;
			input.value = '';
		});
	  }
	
	  ver(i:any){
		console.log(i)
	
		let self=this;
		setTimeout(function(){
		  console.log(self.autocomplete.getPlace())
	
		  console.log(self.autocomplete.getPlace().address_components[0].long_name)
		  console.log(self.autocomplete.getPlace().geometry.location.lat())
		  console.log(self.autocomplete.getPlace().geometry.location.lng())
		  /*self.orderForm.patchValue({direccion: self.autocomplete.getPlace().address_components[0].long_name});
		  self.orderForm.patchValue({lat: self.autocomplete.getPlace().geometry.location.lat()});
		  self.orderForm.patchValue({lng: self.autocomplete.getPlace().geometry.location.lng()}); */
		  self.data1ProfileForm.patchValue({direccion: self.autocomplete.getPlace().address_components[0].long_name});
		  self.data1ProfileForm.patchValue({lat: self.autocomplete.getPlace().geometry.location.lat()});
		  self.data1ProfileForm.patchValue({lng: self.autocomplete.getPlace().geometry.location.lng()});
		  self.data1CompanyForm.patchValue({direccion: self.autocomplete.getPlace().address_components[0].long_name});
		  self.data1CompanyForm.patchValue({lat: self.autocomplete.getPlace().geometry.location.lat()});
		  self.data1CompanyForm.patchValue({lng: self.autocomplete.getPlace().geometry.location.lng()});

		  self.registerProfileForm.patchValue({direccion: self.autocomplete.getPlace().address_components[0].long_name});
		  self.registerProfileForm.patchValue({latitud: self.autocomplete.getPlace().geometry.location.lat()});
		  self.registerProfileForm.patchValue({longitud:self.autocomplete.getPlace().geometry.location.lng()});
		  
			self.data1CompanyForm.patchValue({direccion: self.autocomplete.getPlace().address_components[0].long_name});
			self.data1CompanyForm.patchValue({latitud: self.autocomplete.getPlace().geometry.location.lat()});
			self.data1CompanyForm.patchValue({longitud:self.autocomplete.getPlace().geometry.location.lng()});

			self.registeCompanyForm.patchValue({direccion: self.autocomplete.getPlace().address_components[0].long_name});
			self.registeCompanyForm.patchValue({latitud: self.autocomplete.getPlace().geometry.location.lat()});
			self.registeCompanyForm.patchValue({longitud:self.autocomplete.getPlace().geometry.location.lng()});
		

		  const latLng = {
			lat: self.autocomplete.getPlace().geometry.location.lat(),
			lng: self.autocomplete.getPlace().geometry.location.lng()
		  };
	
		  self.addMarker(latLng);
	
		}, 500);
	  }

	  setTipo(tipo:any){
		console.log(tipo)
		this.tipo_registro2=tipo;
		localStorage.setItem('tipo_registro',tipo);
		this.funciones_generales.setTipo_empresa(tipo);
		this.funciones_generales.iniciar();
		this.getPlans();

	  }
	
	  async geolocate(){
		console.log('geolocate')
		const options = { enableHighAccuracy: true };
		const coordinates = await Geolocation.getCurrentPosition(options);
		
		console.log('Current position:', coordinates);
	
		const latLng = {
		  lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
		};
	
		this.addMarker(latLng);
		this.geocodePosition(latLng);
	  }
	  marker:any=null;;
	  async addMarker(latLng:any){
		if (this.marker!=null) {
			this.marker.setMap(null);
		}
		
		this.map.panTo(latLng);
		this.map.setZoom(15);
		this.marker = new google.maps.Marker({
		  position: latLng,
		  map: this.map,
		  draggable: true,
		});
		
		this.marker.addListener('dragend',(event:any) => { 
		  console.log(event.latLng.lat());
		  console.log(event.latLng.lng());
		  const latLng={
			lat:event.latLng.lat(),
			lng:event.latLng.lng()
		  };
		  this.geocodePosition(latLng);
		});
		
	  }
	  tryGeolocation(){
		this.geolocate();
	  }
	
	  geocodePosition(latLng:any) {
		//data1ProfileForm
		//data1CompanyForm
		let self=this;
		this.userService.getDirections(latLng.lat,latLng.lng).subscribe((data: any) => {
		  console.log(data)
		  console.log(data.results[0].formatted_address)
		  this.data1ProfileForm.patchValue({direccion: data.results[0].formatted_address});
		  this.data1ProfileForm.patchValue({lat: latLng.lat});
		  this.data1ProfileForm.patchValue({lng: latLng.lng});
		  this.data1CompanyForm.patchValue({direccion: data.results[0].formatted_address});
		  this.data1CompanyForm.patchValue({lat: latLng.lat});
		  this.data1CompanyForm.patchValue({lng: latLng.lng});
		  this.direccion=data.results[0].formatted_address;

		  this.registerProfileForm.patchValue({direccion: this.direccion});
		  this.registerProfileForm.patchValue({latitud: latLng.lat});
		  this.registerProfileForm.patchValue({longitud: latLng.lng});
		  
			this.data1CompanyForm.patchValue({direccion: this.direccion});
			this.data1CompanyForm.patchValue({latitud: latLng.lat});
			this.data1CompanyForm.patchValue({longitud: latLng.lng});

			this.registeCompanyForm.patchValue({direccion: this.direccion});
			this.registeCompanyForm.patchValue({latitud: latLng.lat});
			this.registeCompanyForm.patchValue({longitud: latLng.lng});

		},
		  (error: { error: any; }) => {
		  console.log(error)
		});
	  }

	ngOnInit() {
		this.initForm();
		this.platform.ready().then(()=>{
			this.loadMap({lat:-34.460429,lng:-57.836462});
		});
		//this.slides.lockSwipes(true);
		console.log('getplans');
		this.getPlans();
		this.setUIBackButtonAction();
		//this.backgroundMode.setDefaults({ silent: true });
		//this.backgroundMode.enable();
		/*this.subscription1 = this.refresh.formRefreshSource$.subscribe((msg:any) => {
	      	this.updateImg(msg);
	    });	
	    this.subscription2 = this.refresh.formRefreshSource4$.subscribe((msg:any) => {
	      	this.platform.ready().then(()=>{
				setTimeout(()=>{
					this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,1);
				},2000);
			});
	    });	*/
	}

	ionViewWillEnter() {
		this.getServices();
	}

	ionPageWillLeave(){
		//this.subscription.unsubscribe();
		//this.subscription1.unsubscribe();
		//this.subscription2.unsubscribe();
		//if (this.backgroundMode.isEnabled()) {
		//	this.backgroundMode.disable();
		//}
	}

	initForm() {	

		//let self=this;
		this.userService.tiene_registro(this.miId).subscribe(
			data => {
				console.log(data);
				this.actualiza = data;
			},
			msg => {  
				console.log(msg);
				//this.presentToast(msg.error.error);
			}
		);

	  let items:any=this.storage.getObject('formLocalRSV24')
	      if (items != '' && items != null) {
			console.log(items)
			this.select_plan = items.select_plan;
			this.data1ProfileForm.patchValue({nombre: items.nombreP});
			this.data1ProfileForm.patchValue({cedula: items.cedula});
			this.data1ProfileForm.patchValue({sexo: items.sexo});
			this.data1ProfileForm.patchValue({nacionalidad: items.nacionalidad});
			this.data1ProfileForm.patchValue({direccion: items.direccionP});
			this.direccion_exacta= items.direccion_exacta;
			this.data1ProfileForm.patchValue({direccion_exactaP: items.direccion_exacta});
			this.data1ProfileForm.patchValue({direccion_exactaE: items.direccion_exacta});
			this.data1ProfileForm.patchValue({latitud: items.latitudP});
			this.data1ProfileForm.patchValue({longitud: items.longitudP});
			if (items.fecha_nacimiento != '') {
				this.data1ProfileForm.patchValue({fecha_nacimiento: items.fecha_nacimiento});
				this.data1ProfileForm.patchValue({dn: items.dn});
				this.data1ProfileForm.patchValue({mn: items.mn});
				this.data1ProfileForm.patchValue({yn: items.yn});
			}
			this.data1ProfileForm.patchValue({email: items.emailP});
			this.data1ProfileForm.patchValue({telefono: items.telefonoP});

			this.data2ProfileForm.patchValue({formacion: items.formacion});		
			if (items.lunesi) {
				this.data2ProfileForm.patchValue({lunes: items.lunes});
				this.data2ProfileForm.patchValue({lunesi: items.lunesi});
				this.data2ProfileForm.patchValue({lunesf: items.lunesf});
			}
			if (items.martesi) {
				this.data2ProfileForm.patchValue({martes: items.martes});
				this.data2ProfileForm.patchValue({martesi: items.martesi});
				this.data2ProfileForm.patchValue({martesf: items.martesf});
			}
			if (items.miercolesi) {
				this.data2ProfileForm.patchValue({miercoles: items.miercoles});
				this.data2ProfileForm.patchValue({miercolesi: items.miercolesi});
				this.data2ProfileForm.patchValue({miercolesf: items.miercolesf});
			}
			if (items.juevesi) {
				this.data2ProfileForm.patchValue({jueves: items.jueves});
				this.data2ProfileForm.patchValue({juevesi: items.juevesi});
				this.data2ProfileForm.patchValue({juevesf: items.juevesf});
			}
			if (items.viernesi) {
				this.data2ProfileForm.patchValue({viernes: items.viernes});
				this.data2ProfileForm.patchValue({viernesi: items.viernesi});
				this.data2ProfileForm.patchValue({viernesf: items.viernesf});
			}
			if (items.sabadoi) {
				this.data2ProfileForm.patchValue({sabado: items.sabado});
				this.data2ProfileForm.patchValue({sabadoi: items.sabadoi});
				this.data2ProfileForm.patchValue({sabadof: items.sabadof});
			}
			if (items.domingoi) {
				this.data2ProfileForm.patchValue({domingo: items.domingo});
				this.data2ProfileForm.patchValue({domingoi: items.domingoi});
				this.data2ProfileForm.patchValue({domingof: items.domingof});
			}
			this.data2ProfileForm.patchValue({idioma: items.idioma});
			this.data2ProfileForm.patchValue({urgencias: items.urgencias});
			this.data2ProfileForm.patchValue({factura: items.factura});
			
			this.referencePForm.patchValue({nombre1: items.nombreR1});
			this.referencePForm.patchValue({direccion1: items.direccionR1});
			this.referencePForm.patchValue({telefono1: items.telefonoR1});
			this.referencePForm.patchValue({nombre2: items.nombreR2});
			this.referencePForm.patchValue({direccion2: items.direccionR2});
			this.referencePForm.patchValue({telefono2: items.telefonoR2});

			this.referenceCForm.patchValue({nombre1: items.nombreC1});
			this.referenceCForm.patchValue({direccion1: items.direccionC1});
			this.referenceCForm.patchValue({telefono1: items.telefonoC1});
			this.referenceCForm.patchValue({contacto1: items.contactoC1});
			this.referenceCForm.patchValue({cargo1: items.cargoC1});
			this.referenceCForm.patchValue({nombre2: items.nombreC2});
			this.referenceCForm.patchValue({direccion2: items.direccionC2});
			this.referenceCForm.patchValue({telefono2: items.telefonoC2});
			this.referenceCForm.patchValue({contacto2: items.contactoC2});
			this.referenceCForm.patchValue({cargo2: items.cargoC2});
			this.referenceCForm.patchValue({nombre3: items.nombreC3});
			this.referenceCForm.patchValue({direccion3: items.direccionC3});
			this.referenceCForm.patchValue({telefono3: items.telefonoC3});
			this.referenceCForm.patchValue({contacto3: items.contactoC3});
			this.referenceCForm.patchValue({cargo3: items.cargoC3});
			
			this.data1CompanyForm.patchValue({nombre: items.nombreE});
			this.data1CompanyForm.patchValue({ruc: items.ruc});
			this.data1CompanyForm.patchValue({direccion: items.direccionE});
			this.data1CompanyForm.patchValue({direccion_exacta: items.direccion_exactaE});
			this.data1CompanyForm.patchValue({latitud: items.latitudE});
			this.data1CompanyForm.patchValue({longitud: items.longitudE});
			this.data1CompanyForm.patchValue({email: items.emailE});
			this.data1CompanyForm.patchValue({telefono: items.telefonoE});
			this.data1CompanyForm.patchValue({contacto_nombre: items.contacto_nombre});
			this.data1CompanyForm.patchValue({contacto_cedula: items.contacto_cedula});
			this.data1CompanyForm.patchValue({contacto_cargo: items.contacto_cargo});
	
			this.idiomas=items.idiomas;
			if (items.foto != '') {
				this.registerProfileForm.patchValue({foto: items.foto});
				this.progressText1 = 100;
            	this.progress1 = 1;
            	this.registeCompanyForm.patchValue({foto: items.foto});
				this.progressText4 = 100;
            	this.progress4 = 1;    	
            	if (this.typeUser == '1') {
            		this.up_foto1 = true;
            		this.up_fotoP = false;
            	} else {
            		this.up_fotoE = false;
            	}
			}
			if (items.logo != '') {
				this.registerProfileForm.patchValue({logo: items.logo});
				this.progressText1 = 100;
            	this.progress1 = 1;
			}
			if (items.pasaporteP != '') {
				this.registerProfileForm.patchValue({pasaporte: items.pasaporteP});
				this.progressText2 = 100;
            	this.progress2 = 1;
			}
			if (items.operaciones != '') {
				this.registerProfileForm.patchValue({operaciones: items.operaciones});
				this.progressText2 = 100;
            	this.progress2 = 1;
			}
			if (items.idoneidad_file != '') {
				this.registerProfileForm.patchValue({idoneidad_file: items.idoneidad_file});
				this.progressText3 = 100;
            	this.progress3 = 1;
			}
			if (items.pasaporteE != '') {
				this.registerProfileForm.patchValue({pasaporte: items.pasaporteE});
				this.progressText3 = 100;
            	this.progress3 = 1;
			}
			if (items.record_policivo != '') {
				this.registerProfileForm.patchValue({record_policivo: items.record_policivo});
				this.progressText5 = 100;
            	this.progress5 = 1;
			}
			if (items.recibo_servicio != '') {
				this.registerProfileForm.patchValue({recibo_servicio: items.recibo_servicio});
				this.progressText6 = 100;
            	this.progress6 = 1;
			}

			this.registerProfileForm.patchValue({usuario_id: items.id});
			this.registeCompanyForm.patchValue({usuario_id: items.id});
			this.typeUser = items.tipo;
			if (this.typeUser == '') {
				this.typeUser = '1';
			}
			this.changeType();
			
			this.formLocal.nombreP = items.nombreP;
			this.formLocal.cedula = items.cedula;
			this.formLocal.sexo = items.sexo;
			this.formLocal.nacionalidad = items.nacionalidad;
			this.formLocal.direccionP = items.direccionP;
			this.formLocal.direccion_exactaP = items.direccion_exactaP;
			this.formLocal.latitudP = items.latitudP;
			this.formLocal.longitudP = items.longitudP;
			if (items.fecha_nacimiento != '') {
				this.formLocal.fecha_nacimiento = items.fecha_nacimiento;
				this.formLocal.dn = items.dn;
				this.formLocal.mn = items.mn;
				this.formLocal.yn = items.yn;
			}	
			this.formLocal.emailP = items.emailP;
			this.formLocal.telefonoP = items.telefonoP;

			this.formLocal.area = items.area;
			this.categorySelect = items.area;
			this.formLocal.formacion = items.formacion;
			this.formLocal.anos_experiencia = items.anos_experiencia;
			this.formLocal.idoneidad = items.idoneidad;
			this.formLocal.lunes = items.lunes;
			this.formLocal.lunesi = items.lunesi;
			this.formLocal.lunesf = items.lunesf;
			this.formLocal.martes = items.martes;
			this.formLocal.martesi = items.martesi;
			this.formLocal.martesf = items.martesf;
			this.formLocal.miercoles = items.miercoles;
			this.formLocal.miercolesi = items.miercolesi;
			this.formLocal.miercolesf = items.miercolesf;
			this.formLocal.jueves = items.jueves;
			this.formLocal.juevesi = items.juevesi;
			this.formLocal.juevesf = items.juevesf;
			this.formLocal.viernes = items.viernes;
			this.formLocal.viernesi = items.viernesi;
			this.formLocal.viernesf = items.viernesf;
			this.formLocal.sabado = items.sabado;
			this.formLocal.sabadoi = items.sabadoi;
			this.formLocal.sabadof = items.sabadof;
			this.formLocal.domingo = items.domingo;
			this.formLocal.domingoi = items.domingoi;
			this.formLocal.domingof = items.domingof;
			this.formLocal.idioma = items.idioma;
			this.idiomas = items.idioma;
			this.formLocal.urgencias = items.urgencias;
			this.formLocal.factura = items.factura;

			this.formLocal.nombreR1 = items.nombreR1;
			this.formLocal.telefonoR1 = items.telefonoR1;
			this.formLocal.direccionR1 = items.direccionR1;
			this.formLocal.nombreR2 = items.nombreR2;
			this.formLocal.telefonoR2 = items.telefonoR2;
			this.formLocal.direccionR2 = items.direccionR2;	

			this.formLocal.nombreC1 = items.nombreC1;
			this.formLocal.direccionC1 = items.direccionC1;
			this.formLocal.telefonoC1 = items.telefonoC1;
			this.formLocal.contactoC1 = items.contactoC1;
			this.formLocal.cargoC1 = items.cargoC1;
			
			this.formLocal.nombreC2 = items.nombreC2;	
			this.formLocal.direccionC2 = items.direccionC2;
			this.formLocal.telefonoC2 = items.telefonoC2;
			this.formLocal.contactoC2 = items.contactoC2;
			this.formLocal.cargoC2 = items.cargoC2;

			this.formLocal.nombreC3 = items.nombreC3;
			this.formLocal.direccionC3 = items.direccionC3;	
			this.formLocal.telefonoC3 = items.telefonoC3;
			this.formLocal.contactoC3 = items.contactoC3;
			this.formLocal.cargoC3 = items.cargoC3;

			this.formLocal.nombreE = items.nombreE;
			this.formLocal.ruc = items.ruc;
			this.formLocal.direccionE = items.direccionE;
			this.formLocal.direccion_exactaE = items.direccion_exactaE;
			this.formLocal.latitudE = items.latitudE;
			this.formLocal.longitudE = items.longitudE;
			this.formLocal.emailE = items.emailE;
			this.formLocal.telefonoE = items.telefonoE;
			this.formLocal.contacto_nombre = items.contacto_nombre;
			this.formLocal.contacto_cedula = items.contacto_cedula;
			this.formLocal.contacto_cargo = items.contacto_cargo;

			this.formLocal.foto = items.foto;
			this.formLocal.logo = items.logo;
			this.formLocal.pasaporteP = items.pasaporteP;
			this.formLocal.operaciones = items.operaciones;
			this.formLocal.idoneidad_file = items.idoneidad_file;
			this.formLocal.pasaporteE = items.pasaporteE;
			this.formLocal.record_policivo = items.record_policivo;
			this.formLocal.recibo_servicio = items.recibo_servicio;
			this.formLocal.pais_id = items.pais_id;

			this.formLocal.tipo = items.tipo;
			this.formLocal.id = items.id;
		  } else {
		  	let items:any=this.storage.getObject('userRPSV24')
		      if (items != '' && items != null) {
				this.usuario = items;
				this.data1ProfileForm.patchValue({nombre: this.usuario.nombre});
				this.data1ProfileForm.patchValue({email: this.usuario.email});
				this.data1ProfileForm.patchValue({telefono: this.usuario.telefono});
				this.data1CompanyForm.patchValue({nombre: this.usuario.nombre});
				this.data1CompanyForm.patchValue({email: this.usuario.email});
				this.data1CompanyForm.patchValue({telefono: this.usuario.telefono});
				this.registerProfileForm.patchValue({foto: this.usuario.imagen});
				this.registerProfileForm.patchValue({usuario_id: this.usuario.id});
				this.registeCompanyForm.patchValue({usuario_id: this.usuario.id});

				if (this.usuario.tipo_registro != 1) {
					this.registeCompanyForm.patchValue({foto: this.usuario.imagen});
					this.formLocal.foto = this.usuario.imagen;
				}

				this.formLocal.nombreP = this.usuario.nombre; 
				this.formLocal.emailP = this.usuario.email;
				this.formLocal.telefonoP = this.usuario.telefono;
				this.formLocal.nombreE = this.usuario.nombre;
				this.formLocal.emailE = this.usuario.email;
				this.formLocal.telefonoE = this.usuario.telefono;
				this.formLocal.id = this.usuario.id;
				this.formLocal.pais_id = this.usuario.pais_id;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			  }
		    //});
		  } 
	  //  });

		this.data1ProfileForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.data2ProfileForm.valueChanges.subscribe(data => this.onValueChanged2(data));
		this.referencePForm.valueChanges.subscribe(data => this.onValueChanged3(data));
		this.referenceCForm.valueChanges.subscribe(data => this.onValueChanged4(data));
		this.data1CompanyForm.valueChanges.subscribe(data => this.onValueChanged5(data));
		this.onValueChanged();
		this.onValueChanged2();
		this.onValueChanged3();
		this.onValueChanged4();
		this.onValueChanged5();
		this.myDate = moment().format();
		this.data1ProfileForm.controls['dn'].valueChanges.subscribe(
	      (selectedValue) => {
	      	if (selectedValue > 0 && selectedValue < 32) {
		      	if (this.data1ProfileForm.value.mn != '' && this.data1ProfileForm.value.yn != '') {
		      		if (this.getAge(selectedValue,0)) {
				     // this.data1ProfileForm.get('dn').setErrors(null);
				      //this.data1ProfileForm.get('mn').setErrors(null);
				      //this.data1ProfileForm.get('yn').setErrors(null);
				      let date = moment([this.data1ProfileForm.value.yn,this.data1ProfileForm.value.mn -1, selectedValue]).format();			
				      this.data1ProfileForm.patchValue({fecha_nacimiento: date});
				    } else {
				      //this.data1ProfileForm.get('dn').setErrors({Invalid: true});
				      //this.data1ProfileForm.get('mn').setErrors({Invalid: true});
				      //this.data1ProfileForm.get('yn').setErrors({Invalid: true});
				      this.presentToast('Debes ser mayor de edad.');
				    }
				}
	      	} else {
	      		if (selectedValue != '') {
	      			//this.data1ProfileForm.get('dn').setErrors({Invalid: true});
					this.presentToast('Formato del dia de 01 a 31.');
	      		}	
	      	}
	      }
	    );
	    this.data1ProfileForm.controls['mn'].valueChanges.subscribe(
	      (selectedValue) => {
	      	if (selectedValue > 0 && selectedValue < 13) {
	      		if (this.data1ProfileForm.value.yn != '' && this.data1ProfileForm.value.yn != '') {
		      		if (this.getAge(selectedValue,1)) {
				      //this.data1ProfileForm.get('dn').setErrors(null);
				      //this.data1ProfileForm.get('mn').setErrors(null);
				      //this.data1ProfileForm.get('yn').setErrors(null);
				      let date = moment([this.data1ProfileForm.value.yn,selectedValue -1, this.data1ProfileForm.value.dn]).format();			
				      this.data1ProfileForm.patchValue({ fecha_nacimiento: date})

				    } else {
				      //this.data1ProfileForm.get('dn').setErrors({Invalid: true});
				      //this.data1ProfileForm.get('mn').setErrors({Invalid: true});
				      //this.data1ProfileForm.get('yn').setErrors({Invalid: true});
				      this.presentToast('Debes ser mayor de edad.');
				    }
		      	}
	      	} else {
	      		if (selectedValue != '') {
					//this.data1ProfileForm.get('mn').setErrors({Invalid: true});
					this.presentToast('Formato del mes de 01 a 12.');
				}
	      	} 	
	      }
	    );
	    this.data1ProfileForm.controls['yn'].valueChanges.subscribe(
	      (selectedValue) => {
	      	if (this.data1ProfileForm.value.mn != '' && this.data1ProfileForm.value.dn != '') {
	      		if (this.getAge(selectedValue,2)) {
			      //this.data1ProfileForm.get('dn').setErrors(null);
			      //this.data1ProfileForm.get('mn').setErrors(null);
			      //this.data1ProfileForm.get('yn').setErrors(null);
			      let date = moment([selectedValue,this.data1ProfileForm.value.mn -1, this.data1ProfileForm.value.dn]).format();			
				  this.data1ProfileForm.patchValue({ fecha_nacimiento: date});
			    } else {
			      //this.data1ProfileForm.get('dn').setErrors({Invalid: true});
			      //this.data1ProfileForm.get('mn').setErrors({Invalid: true});
			      //this.data1ProfileForm.get('yn').setErrors({Invalid: true});
			      this.presentToast('Debes ser mayor de edad.');
			    }
	      	}
	      }
	    );
	    this.data2ProfileForm.controls['idioma'].valueChanges.subscribe(
	      (selectedValue) => {
	        this.idiomas = selectedValue;
	      }
	    );
	}

	getSubcategories(){
		this.storage.get('TRPSV24').then(items => {
  			if (items) {
  				this.orderService.getSubcategoriesID(items).subscribe(
		        data => {
			      this.data = data;
			      this.subcategories = this.data.subcategorias;
			      for (var i = 0; i < this.subcategories.length; ++i) {
			      	this.subcategories[i].checked = false;
			      }
			      this.subcategories = this.sortByKey(this.subcategories,'nombre');
			      this.getPlans();
			    },
			    msg => {
			      if(msg.status == 400 || msg.status == 401){ 
			      	this.storage.set('TRPSV24','');
			        this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
			        this.navCtrl.navigateRoot('login');
			      }
			    });
  			}
	    });
	}

	setUIBackButtonAction() {
	    /*this.backButton.onClick = () => {    	
	    	this.slides.getActiveIndex().then(index => {
			   	if (index != 0) {
					this.slides.lockSwipeToPrev(false);
					this.slides.slidePrev();
				} else {
					this.navCtrl.navigateForward('/tabs/tab1');
				}
			});
	    };
	    this.subscription = this.platform.backButton.subscribeWithPriority(0, () => {
		    this.slides.getActiveIndex().then(index => {
			   	if (index != 0) {
					this.slides.lockSwipeToPrev(false);
					this.slides.slidePrev();
				} else {
					this.navCtrl.navigateForward('/tabs/tab1');
				}
			});
		});*/
	}

	loadMap(position:any){
		let mapEle: any = document.getElementById('map');
		let mapEle1: any = document.getElementById('map1');
		this.myLatLng = position;

		/*this.map = new google.maps.Map(mapEle, {
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
		});

		this.map1 = new google.maps.Map(mapEle1, {
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

		google.maps.event.addListenerOnce(this.map1, 'idle', () => {
			mapEle.classList.add('show-map');
		});*/
    }

    createMarker(latlng:any) {
    /*	var icon = {
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

	    var marker1 = new google.maps.Marker({
	      position: latlng,
	      map: this.map1,
	      draggable: true,
	      icon: icon
	    });
	    this.markers.push(marker1);
	    this.map1.setCenter(latlng);
	    
	    var that = this;
	    google.maps.event.addListener(marker, 'dragend', function () { 
	      var point = this.getPosition();
	      that.geocodeLatLng(point.lat(),point.lng());
	    });

	    google.maps.event.addListener(marker1, 'dragend', function () { 
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
	    			that.data1ProfileForm.patchValue({direccion: results[1].formatted_address});
	    			that.data1ProfileForm.patchValue({latitud: lat});
	    			that.data1ProfileForm.patchValue({longitud: lng});
	    			that.data1CompanyForm.patchValue({direccion: results[1].formatted_address});
	    			that.data1CompanyForm.patchValue({latitud: lat});
	    			that.data1CompanyForm.patchValue({longitud: lng});	
	    			that.formLocal.direccionP = results[1].formatted_address;
					that.formLocal.latitudP = lat;
					that.formLocal.longitudP = lng; 
					that.formLocal.direccionE = results[1].formatted_address;
					that.formLocal.latitudE = lat;
					that.formLocal.longitudE = lng;    		
		      		that.myLatLng.lat = lat;
		      		that.myLatLng.lng = lng;
		      		that.storage.setObject('formLocalRSV24',that.formLocal);      
		    	})
		    } 
		  }
		});*/
	};

	tryGeolocation2() {
		/*this.getUserPosition().then(
	        data => {
		        this.myLatLng = {
					lat: data.coords.latitude,
					lng: data.coords.longitude
				}
				this.data1ProfileForm.patchValue({latitud: data.coords.latitude});
	    		this.data1ProfileForm.patchValue({longitud: data.coords.longitude});
				this.data1CompanyForm.patchValue({latitud: data.coords.latitude});
	    		this.data1CompanyForm.patchValue({longitud: data.coords.longitude});			
				this.clearMarker();
				this.createMarker(this.myLatLng);
				this.geocodeLatLng(this.myLatLng.lat,this.myLatLng.lng);   
	        },
	        msg => {  
	        	this.presentToast(msg);     
	        }
	    );*/
	}

	getUserPosition() {
		/*return new Promise<any>(resolve => {
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
		                }).catch(error => resolve('Verifique que su Ubicación esté activa y tenga permisos'));
		              } else {
		                this.askForHighAccuracy().then(available => {
		                  if (available) {
		                    this.getUserPosition().then(a => resolve(a), e => resolve(e));
		                  }
		                }, error => resolve('Verifique que su Ubicación esté activa y tenga permisos'));
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
		            }).catch(error => resolve('Verifique que su Ubicación esté activa y tenga permisos'));
		          }
		        } else {
		          this.locationAccuracy.request(1).then(result => {
		            if (result) {
		              this.getUserPosition().then(result => resolve(result), error => resolve(error));
		            }
		          }, error => {
		            resolve('Debe otorgar permisos de ubicación al App')
		          });
		        }
		      }, error => {
		        resolve('Debe activar el GPS')
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
	        }).catch(error => resolve('Verifique que su Ubicación esté activa y tenga permisos'));
		  }
		});*/
	}

	/*askForHighAccuracy(): Promise<Geoposition> {
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

	changeType(){
		/*if (this.typeUser === '2') {
			this.referenceCForm.get('nombre2').setValidators([Validators.required]);
			this.referenceCForm.get('nombre2').updateValueAndValidity();
			this.referenceCForm.get('direccion2').setValidators([Validators.required]);
			this.referenceCForm.get('direccion2').updateValueAndValidity();
			this.referenceCForm.get('telefono2').setValidators([Validators.required]);
			this.referenceCForm.get('telefono2').updateValueAndValidity();
			this.referenceCForm.get('contacto2').setValidators([Validators.required]);
			this.referenceCForm.get('contacto2').updateValueAndValidity();
			this.referenceCForm.get('cargo2').setValidators([Validators.required]);
			this.referenceCForm.get('cargo2').updateValueAndValidity();
		} else {
			this.referenceCForm.get('nombre2').clearValidators();
			this.referenceCForm.get('nombre2').updateValueAndValidity();
			this.referenceCForm.get('direccion2').clearValidators();
			this.referenceCForm.get('direccion2').updateValueAndValidity();
			this.referenceCForm.get('telefono2').clearValidators();
			this.referenceCForm.get('telefono2').updateValueAndValidity();
			this.referenceCForm.get('contacto2').clearValidators();
			this.referenceCForm.get('contacto2').updateValueAndValidity();
			this.referenceCForm.get('cargo2').clearValidators();
			this.referenceCForm.get('cargo2').updateValueAndValidity();
		}*/
	}

	getAge(select:any,i:any){
		if (i == 0) {
			let birthday = moment([this.data1ProfileForm.value.yn, this.data1ProfileForm.value.mn - 1, select])
			let age = moment().diff(birthday, 'years');
			if (age > 17) {
			  return true;
			} else {
			  return false;
			}
		}
		if (i == 1) {
			let birthday = moment([this.data1ProfileForm.value.yn, select - 1, this.data1ProfileForm.value.dn])
			let age = moment().diff(birthday, 'years');
			if (age > 17) {
			  return true;
			} else {
			  return false;
			}
		}
		if (i == 2) {
			let birthday = moment([select, this.data1ProfileForm.value.mn - 1, this.data1ProfileForm.value.dn])
			let age = moment().diff(birthday, 'years');
			if (age > 17) {
			  return true;
			} else {
			  return false;
			}
		}	
    return 1;
	};

	back(){
		//this.slides.lockSwipeToPrev(false);
		//this.slides.slidePrev();
		setTimeout(()=>{
			//this.content.scrollToTop();
		},300);	
	}

	back1(){
		this.navCtrl.navigateForward('/tabs/tab8');	
	}

	capitalizeFirstLetter(string:any) {
  		//return string.charAt(0).toUpperCase() + string.slice(1);
	}

	next1(){	
		console.log(this.data1ProfileForm.value)
		if (this.typeUser == '1') {
			if (this.data1ProfileForm.valid) {
				//this.slides.lockSwipeToNext(false);
				//this.slides.slideNext();
				setTimeout(()=>{
					//this.content.scrollToTop();
				},300);	
			} else {
				this.validateAllFormFields(this.data1ProfileForm,1);
				this.presentToast('Completa los campos para continuar.');
			}
		} else {
			if (this.data1CompanyForm.valid) {
				//this.data2ProfileForm.get('formacion').clearValidators();
 				//this.data2ProfileForm.get('formacion').updateValueAndValidity();
				//this.slides.lockSwipeToNext(false);
				//this.slides.slideNext();
				setTimeout(()=>{
					//this.content.scrollToTop();
				},300);	
			} else {
				this.validateAllFormFields(this.data1CompanyForm,5);
				this.presentToast('Completa los campos para continuar.');
			}
		}	
	}

	next2(){	
		if (this.data2ProfileForm.valid) {
			//this.slides.lockSwipeToNext(false);
			//this.slides.slideNext();
			setTimeout(()=>{
				//this.content.scrollToTop();
			},300);	
		} else {
			this.validateAllFormFields(this.data2ProfileForm,2);
			this.presentToast('Completa los campos para continuar.');
		}
	}

	next3(){
		console.log(this.referencePForm.value);	
		if (this.referencePForm.valid) {
			//this.slides.lockSwipeToNext(false);
			//this.slides.slideNext();
			setTimeout(()=>{
				//this.content.scrollToTop();
			},300);	
		} else {
			this.validateAllFormFields(this.referencePForm,3);
			this.presentToast('Completa los campos para continuar.');
		}
	}

	next4(){	
		if (this.referenceCForm.valid) {
			//this.slides.lockSwipeToNext(false);
			//this.slides.slideNext();
			setTimeout(()=>{
				//this.content.scrollToTop();
			},300);	
		} else {
			this.validateAllFormFields(this.referenceCForm,4);
			this.presentToast('Completa los campos para continuar.');
		}
	}

	setPlan(){
		let items:any=this.storage.get('idRPSV24');
	      if (items) {
	        let items2:any=this.storage.get('TRPSV24');
	            if (items2) {
	              for (var i = 0; i < this.plans.length; ++i) {
	              	if (this.plans[i].id == this.select_plan) {
	              		//this.presentLoading();
	              		this.estado.plan = JSON.stringify(this.plans[i]);
	              		this.userService.setUser(items,items2,this.estado).subscribe(
			                data => {
			                	let items3:any=this.storage.getObject('userRPSV24')
	      							if (items3) {
	      								if (this.typeUser == '1') {
											this.contract.nombre = this.registerProfileForm.value.nombre;
							            	this.contract.ci = this.registerProfileForm.value.cedula;
							            	this.contract.direccion = this.direccion;
							            	this.contract.telefono = this.registerProfileForm.value.telefono;
							            	this.contract.usuario_id = items3.id;
							            	this.contract.plan = this.estado.plan;
							            	this.contract.firma = 'null';
							            	this.objService.setPlans(this.estado.plan);
							              	this.userService.postContrat(this.registerProfileForm.value.nombre,this.registerProfileForm.value.cedula,this.registerProfileForm.value.direccion,this.registerProfileForm.value.telefono,items3.id,this.estado.plan,items2,this.contract,items3.pais_id).subscribe(
								                data => {
								                	this.data3 = data;
								                	this.contract_url = this.data3.Contratos.url;
									                this.loading.dismiss();
									                this.goProfile();
								              	},
								              	msg => {
								                	this.loading.dismiss();
									                if(msg.status == 400 || msg.status == 401){ 
									                  this.storage.set('TRPSV24','');
									                  //((this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
									                  this.navCtrl.navigateRoot('login');
									                }
								            });
										} else {
											this.contract.nombre = this.registeCompanyForm.value.contacto_nombre;
							            	this.contract.ci = this.registeCompanyForm.value.contacto_cedula;
							            	this.contract.direccion = this.direccion;
							            	this.contract.telefono = this.registeCompanyForm.value.telefono;
							            	this.contract.usuario_id = items3.id;
							            	this.contract.plan = this.estado.plan;
							            	this.contract.firma = 'null';
							            	this.objService.setPlans(this.estado.plan);
							              	this.userService.postContrat(this.registeCompanyForm.value.contacto_nombre,this.registeCompanyForm.value.contacto_cedula,this.registeCompanyForm.value.direccion,this.registeCompanyForm.value.telefono,items3.id,this.estado.plan,items2,this.contract,items3.pais_id).subscribe(
								                data => {
								                	this.data3 = data;
								                	this.contract_url = this.data3.Contratos.url;
									                //this.loading.dismiss();
									                this.goProfile();
								              },
								              msg => {
								                this.loading.dismiss();
								                if(msg.status == 400 || msg.status == 401){ 
								                  this.storage.set('TRPSV24','');
								                  //this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
								                  this.navCtrl.navigateRoot('login');
								                }
								            });	
										}
	      							}
	      						//});
			            	},
			              msg => {
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
	       // });
	      }
	    //});
	}

	enviar(){
		console.log(this.registerProfileForm.value);
		console.log(this.data1ProfileForm.value);
		console.log(this.data2ProfileForm.value);
		console.log(this.referencePForm.value);
		console.log(this.referenceCForm.value);
		console.log(this.data1CompanyForm.value);
		console.log(this.registeCompanyForm.value);
	}

	check_validate(): any{
		let band=true;
		if(!this.registeCompanyForm.valid) {
			band=false;
			this.check_fields(this.registeCompanyForm);
		}
		if(!this.registerProfileForm.valid){
			band=false;
			this.check_fields(this.registerProfileForm);
		}
		if(!this.data1ProfileForm.valid){
			band=false;
			this.check_fields(this.data1ProfileForm);
		}
		if(!this.data2ProfileForm.valid){
			band=false;
			this.check_fields(this.data2ProfileForm);
		}
		if(!this.referencePForm.valid){
			band=false;
			this.check_fields(this.referencePForm);
		}
		if(!this.referenceCForm.valid){
			band=false;
			this.check_fields(this.referenceCForm);
		}
		if(!this.data1CompanyForm.valid){
			band=false;
			this.check_fields(this.data1CompanyForm);
		}
		if (this.select_plan=='') {
			band=false;
			this.presentToast('Seleccione un plan.');
		}
		return band;
	}

	check_fields(myForm:any){
		console.log(myForm.value)
		for (const controlName in myForm.controls) {
			if (myForm.controls[controlName].invalid) {
				if (controlName=='longuitud') {
					alert('Por favor, activa la localización para el mejor funcionamiento de la App.');
				}
				this.presentToast('Verifica el campo: '+controlName);
			}
		}
	}
	setDay(day:any){
		//console.log(day)
		//console.log(this.data2ProfileForm.value);
		//if (this.data2ProfileForm.controls[day].value) {
			if (day == 'lunes') {
				console.log(day)
				this.formLocal.lunes = this.data2ProfileForm.value.lunes;
				this.formLocal.lunesi = this.data2ProfileForm.value.lunesi;
				this.formLocal.lunesf = this.data2ProfileForm.value.lunesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'martes') {
				console.log(day)
				this.formLocal.martes = this.data2ProfileForm.value.martes;
				this.formLocal.martesi = this.data2ProfileForm.value.martesi;
				this.formLocal.martesf = this.data2ProfileForm.value.martesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'miercoles') {
				console.log(day)
				this.formLocal.miercoles = this.data2ProfileForm.value.miercoles;
				this.formLocal.miercolesi = this.data2ProfileForm.value.miercolesi;
				this.formLocal.miercolesf = this.data2ProfileForm.value.miercolesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'jueves') {
				console.log(day)
				this.formLocal.jueves = this.data2ProfileForm.value.jueves;
				this.formLocal.juevesi = this.data2ProfileForm.value.juevesi;
				this.formLocal.juevesf = this.data2ProfileForm.value.juevesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'viernes') {
				console.log(day)
				this.formLocal.viernes = this.data2ProfileForm.value.viernes;
				this.formLocal.viernesi = this.data2ProfileForm.value.viernesi;
				this.formLocal.viernesf = this.data2ProfileForm.value.viernesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'sabado') {
				console.log(day)
				this.formLocal.sabado = this.data2ProfileForm.value.sabado;
				this.formLocal.sabadoi = this.data2ProfileForm.value.sabadoi;
				this.formLocal.sabadof = this.data2ProfileForm.value.sabadof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'domingo') {
				console.log(day)
				this.formLocal.domingo = this.data2ProfileForm.value.domingo;
				this.formLocal.domingoi = this.data2ProfileForm.value.domingoi;
				this.formLocal.domingof = this.data2ProfileForm.value.domingof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
		//} 
	}
	availableDay(day:any){
		console.log(day,'active')
		if (day == 'lunes') {
			this.formLocal.lunes=true;
		}
		if (day == 'martes') {
			this.formLocal.martes=true;
		}
		if (day == 'miercoles') {
			this.formLocal.miercoles=true;
		}
		if (day == 'jueves') {
			this.formLocal.jueves=true;
		}
		if (day == 'viernes') {
			this.formLocal.viernes=true;
		}
		if (day == 'sabado') {
			this.formLocal.sabado=true;
		}
		if (day == 'domingo') {
			this.formLocal.domingo=true;
		}
	}
	disabledDay(day:any){
		console.log(day,'desactive')
		if (day == 'lunes') {
			this.formLocal.lunes=false;
		}
		if (day == 'martes') {
			this.formLocal.martes=false;
		}
		if (day == 'miercoles') {
			this.formLocal.miercoles=false;
		}
		if (day == 'jueves') {
			this.formLocal.jueves=false;
		}
		if (day == 'viernes') {
			this.formLocal.viernes=false;
		}
		if (day == 'sabado') {
			this.formLocal.sabado=false;
		}
		if (day == 'domingo') {
			this.formLocal.domingo=false;
		}
	}
	changeDay(day:any){
		console.log(day)
		if (this.data2ProfileForm.controls[day].value) {
			this.data2ProfileForm.controls[day].setValue(false);
			if (day == 'lunes') {
				this.data2ProfileForm.patchValue({lunes: false});
				this.data2ProfileForm.patchValue({lunesi: '08:00'});
				this.data2ProfileForm.patchValue({lunesf: '18:00'});
				this.formLocal.lunes = this.data2ProfileForm.value.lunes;
				this.formLocal.lunesi = this.data2ProfileForm.value.lunesi;
				this.formLocal.lunesf = this.data2ProfileForm.value.lunesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'martes') {
				this.data2ProfileForm.patchValue({martes: false});
				this.data2ProfileForm.patchValue({martesi: '08:00'});
				this.data2ProfileForm.patchValue({martesf: '18:00'});
				this.formLocal.martes = this.data2ProfileForm.value.martes;
				this.formLocal.martesi = this.data2ProfileForm.value.martesi;
				this.formLocal.martesf = this.data2ProfileForm.value.martesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'miercoles') {
				this.data2ProfileForm.patchValue({miercoles: false});
				this.data2ProfileForm.patchValue({miercolesi: '08:00'});
				this.data2ProfileForm.patchValue({miercolesf: '18:00'});
				this.formLocal.miercoles = this.data2ProfileForm.value.miercoles;
				this.formLocal.miercolesi = this.data2ProfileForm.value.miercolesi;
				this.formLocal.miercolesf = this.data2ProfileForm.value.miercolesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'jueves') {
				this.data2ProfileForm.patchValue({jueves: false});
				this.data2ProfileForm.patchValue({juevesi: '08:00'});
				this.data2ProfileForm.patchValue({juevesf: '18:00'});
				this.formLocal.jueves = this.data2ProfileForm.value.jueves;
				this.formLocal.juevesi = this.data2ProfileForm.value.juevesi;
				this.formLocal.juevesf = this.data2ProfileForm.value.juevesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'viernes') {
				this.data2ProfileForm.patchValue({viernes: false});
				this.data2ProfileForm.patchValue({viernesi: '08:00'});
				this.data2ProfileForm.patchValue({viernesf: '18:00'});
				this.formLocal.viernes = this.data2ProfileForm.value.viernes;
				this.formLocal.viernesi = this.data2ProfileForm.value.viernesi;
				this.formLocal.viernesf = this.data2ProfileForm.value.viernesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'sabado') {
				this.data2ProfileForm.patchValue({sabado: false});
				this.data2ProfileForm.patchValue({sabadoi: '08:00'});
				this.data2ProfileForm.patchValue({sabadof: '18:00'});
				this.formLocal.sabado = this.data2ProfileForm.value.sabado;
				this.formLocal.sabadoi = this.data2ProfileForm.value.sabadoi;
				this.formLocal.sabadof = this.data2ProfileForm.value.sabadof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'domingo') {
				this.data2ProfileForm.patchValue({domingo: false});
				this.data2ProfileForm.patchValue({domingoi: '08:00'});
				this.data2ProfileForm.patchValue({domingof: '18:00'});
				this.formLocal.domingo = this.data2ProfileForm.value.domingo;
				this.formLocal.domingoi = this.data2ProfileForm.value.domingoi;
				this.formLocal.domingof = this.data2ProfileForm.value.domingof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
		} else {
			this.data2ProfileForm.controls[day].setValue(true);
			if (day == 'lunes') {
				this.data2ProfileForm.patchValue({lunes: true});
				this.data2ProfileForm.patchValue({lunesi: '00:00'});
				this.data2ProfileForm.patchValue({lunesf: '00:00'});
				this.formLocal.lunes = this.data2ProfileForm.value.lunes;
				this.formLocal.lunesi = this.data2ProfileForm.value.lunesi;
				this.formLocal.lunesf = this.data2ProfileForm.value.lunesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'martes') {
				this.data2ProfileForm.patchValue({martes: true});
				this.data2ProfileForm.patchValue({martesi: '00:00'});
				this.data2ProfileForm.patchValue({martesf: '00:00'});
				this.formLocal.martes = this.data2ProfileForm.value.martes;
				this.formLocal.martesi = this.data2ProfileForm.value.martesi;
				this.formLocal.martesf = this.data2ProfileForm.value.martesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'miercoles') {
				this.data2ProfileForm.patchValue({miercoles: true});
				this.data2ProfileForm.patchValue({miercolesi: '00:00'});
				this.data2ProfileForm.patchValue({miercolesf: '00:00'});
				this.formLocal.miercoles = this.data2ProfileForm.value.miercoles;
				this.formLocal.miercolesi = this.data2ProfileForm.value.miercolesi;
				this.formLocal.miercolesf = this.data2ProfileForm.value.miercolesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'jueves') {
				this.data2ProfileForm.patchValue({jueves: true});
				this.data2ProfileForm.patchValue({juevesi: '00:00'});
				this.data2ProfileForm.patchValue({juevesf: '00:00'});
				this.formLocal.jueves = this.data2ProfileForm.value.jueves;
				this.formLocal.juevesi = this.data2ProfileForm.value.juevesi;
				this.formLocal.juevesf = this.data2ProfileForm.value.juevesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'viernes') {
				this.data2ProfileForm.patchValue({viernes: true});
				this.data2ProfileForm.patchValue({viernesi: '00:00'});
				this.data2ProfileForm.patchValue({viernesf: '00:00'});
				this.formLocal.viernes = this.data2ProfileForm.value.viernes;
				this.formLocal.viernesi = this.data2ProfileForm.value.viernesi;
				this.formLocal.viernesf = this.data2ProfileForm.value.viernesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'sabado') {
				this.data2ProfileForm.patchValue({sabado: true});
				this.data2ProfileForm.patchValue({sabadoi: '00:00'});
				this.data2ProfileForm.patchValue({sabadof: '00:00'});
				this.formLocal.sabado = this.data2ProfileForm.value.sabado;
				this.formLocal.sabadoi = this.data2ProfileForm.value.sabadoi;
				this.formLocal.sabadof = this.data2ProfileForm.value.sabadof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
			if (day == 'domingo') {
				this.data2ProfileForm.patchValue({domingo: true});
				this.data2ProfileForm.patchValue({domingoi: '00:00'});
				this.data2ProfileForm.patchValue({domingof: '00:00'});
				this.formLocal.domingo = this.data2ProfileForm.value.domingo;
				this.formLocal.domingoi = this.data2ProfileForm.value.domingoi;
				this.formLocal.domingof = this.data2ProfileForm.value.domingof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			}
		}
	}

	deleteLanguage(item:any){
		let index = this.idiomas.findIndex((item:any) => item.id === item.id);
		if(index !== -1){
			this.idiomas.splice(index, 1);
			console.log(this.idiomas);
			this.zone.run(()=>{
				this.data2ProfileForm.patchValue({idioma: this.idiomas});
			});
		}
	}

	changeItem(item:any,data?:any){
		console.log(item)
		switch (item) {
			case 1:
				this.data1ProfileForm.value.nombre = this.capitalizeFirstLetter(this.data1ProfileForm.value.nombre);
				this.formLocal.nombreP = this.data1ProfileForm.value.nombre;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 2:
				this.formLocal.cedula = this.data1ProfileForm.value.cedula;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 3:
				this.formLocal.sexo = this.data1ProfileForm.value.sexo;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 4:
				this.data1ProfileForm.value.nacionalidad = this.data1ProfileForm.value.nacionalidad;
				console.log(this.data1ProfileForm.value.nacionalidad);
				this.formLocal.nacionalidad = this.data1ProfileForm.value.nacionalidad;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
				console.log(this.formLocal);
			break;
			case 5:
				this.data1ProfileForm.value.direccion = this.capitalizeFirstLetter(this.data1ProfileForm.value.direccion);
				this.formLocal.direccionP = this.data1ProfileForm.value.direccion;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 6:
				if (this.data1ProfileForm.value.dn != '' && this.data1ProfileForm.value.mn != '' && this.data1ProfileForm.value.yn != '') {
					let date = moment([this.data1ProfileForm.value.yn,this.data1ProfileForm.value.mn -1, this.data1ProfileForm.value.dn]).format();
					this.formLocal.dn = this.data1ProfileForm.value.dn;
					this.formLocal.mn = this.data1ProfileForm.value.mn;
					this.formLocal.yn = this.data1ProfileForm.value.yn;
					this.formLocal.fecha_nacimiento = date;
					this.formLocal.tipo = this.typeUser;
					this.storage.setObject('formLocalRSV24',this.formLocal);
				}
			break;
			case 7:
				this.formLocal.telefonoP = this.data1ProfileForm.value.telefono;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 8:
				this.formLocal.emailP = this.data1ProfileForm.value.email;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 9:
				this.data1CompanyForm.value.nombre = this.data1CompanyForm.value.nombre;
				this.formLocal.nombreE = this.data1CompanyForm.value.nombre;
				
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 10:
				
				this.data1CompanyForm.value.ruc = this.data1CompanyForm.value.ruc;
				

				this.formLocal.ruc = this.data1CompanyForm.value.ruc;
				this.formLocal.tipo = this.typeUser;
				console.log(this.formLocal);
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 11:
				this.data1CompanyForm.value.direccion = this.capitalizeFirstLetter(this.data1CompanyForm.value.direccion);
				this.formLocal.direccionE = this.data1CompanyForm.value.direccion;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 12:
				this.formLocal.telefonoE = this.data1CompanyForm.value.telefono;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 13:
				this.formLocal.emailE = this.data1CompanyForm.value.email;
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 14:
				this.data1CompanyForm.value.contacto_nombre = this.data1CompanyForm.value.contacto_nombre;		
				
				console.log(this.data1CompanyForm.value.contacto_nombre);
				this.formLocal.tipo = this.typeUser;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 15:
				this.formLocal.contacto_cedula = this.data1CompanyForm.value.contacto_cedula;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 16:
				this.data1CompanyForm.value.contacto_cargo = this.data1CompanyForm.value.contacto_cargo;		
				this.formLocal.contacto_nombre = this.data1CompanyForm.value.contacto_cargo;
				this.formLocal.contacto_cargo = this.data1CompanyForm.value.contacto_cargo;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 17:
				if (this.categorySelect.length > 0) {
					this.formLocal.area = this.categorySelect;
					this.storage.setObject('formLocalRSV24',this.formLocal);
				}
			break;
			case 18:
				this.formLocal.formacion = this.data2ProfileForm.value.formacion;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 19:
				this.formLocal.anos_experiencia = this.data2ProfileForm.value.anos_experiencia;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 20:
				this.formLocal.idoneidad = this.data2ProfileForm.value.idoneidad;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 21:
				this.formLocal.lunes = this.data2ProfileForm.value.lunes;
				this.formLocal.lunesi = this.data2ProfileForm.value.lunesi;
				this.formLocal.lunesf = this.data2ProfileForm.value.lunesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 22:
				this.formLocal.martes = this.data2ProfileForm.value.martes;
				this.formLocal.martesi = this.data2ProfileForm.value.martesi;
				this.formLocal.martesf = this.data2ProfileForm.value.martesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 23:
				this.formLocal.miercoles = this.data2ProfileForm.value.miercoles;
				this.formLocal.miercolesi = this.data2ProfileForm.value.miercolesi;
				this.formLocal.miercolesf = this.data2ProfileForm.value.miercolesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 24:
				this.formLocal.jueves = this.data2ProfileForm.value.jueves;
				this.formLocal.juevesi = this.data2ProfileForm.value.juevesi;
				this.formLocal.juevesf = this.data2ProfileForm.value.juevesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 25:
				this.formLocal.viernes = this.data2ProfileForm.value.viernes;
				this.formLocal.viernesi = this.data2ProfileForm.value.viernesi;
				this.formLocal.viernesf = this.data2ProfileForm.value.viernesf;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 26:
				this.formLocal.sabado = this.data2ProfileForm.value.sabado;
				this.formLocal.sabadoi = this.data2ProfileForm.value.sabadoi;
				this.formLocal.sabadof = this.data2ProfileForm.value.sabadof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 27:
				this.formLocal.domingo = this.data2ProfileForm.value.domingo;
				this.formLocal.domingoi = this.data2ProfileForm.value.domingoi;
				this.formLocal.domingof = this.data2ProfileForm.value.domingof;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 28:
				this.formLocal.idioma = this.data2ProfileForm.value.idioma;
				this.formLocal.idiomas=this.idiomas;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 29:
				this.formLocal.urgencias = this.data2ProfileForm.value.urgencias;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 30:
				this.formLocal.factura = this.data2ProfileForm.value.factura;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 31:
				this.referencePForm.value.nombre1 = this.capitalizeFirstLetter(this.referencePForm.value.nombre1);		
				this.formLocal.nombreR1 = this.referencePForm.value.nombre1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 32:
				this.formLocal.telefonoR1 = this.referencePForm.value.telefono1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 33:
				this.referencePForm.value.direccion1 = this.capitalizeFirstLetter(this.referencePForm.value.direccion1);		
				this.formLocal.direccionR1 = this.referencePForm.value.direccion1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 34:
				this.referencePForm.value.nombre2 = this.capitalizeFirstLetter(this.referencePForm.value.nombre2);		
				this.formLocal.nombreR2 = this.referencePForm.value.nombre2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 35:
				this.formLocal.telefonoR2 = this.referencePForm.value.telefono2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 36:
				this.referencePForm.value.direccion2 = this.capitalizeFirstLetter(this.referencePForm.value.direccion2);		
				this.formLocal.direccionR2 = this.referencePForm.value.direccion2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 37:
				this.referenceCForm.value.nombre1 = this.capitalizeFirstLetter(this.referenceCForm.value.nombre1);		
				this.formLocal.nombreC1 = this.referenceCForm.value.nombre1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 38:
				this.formLocal.telefonoC1 = this.referenceCForm.value.telefono1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 39:
				this.referenceCForm.value.direccion1 = this.capitalizeFirstLetter(this.referenceCForm.value.direccion1);		
				this.formLocal.direccionC1 = this.referenceCForm.value.direccion1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 40:
				this.referenceCForm.value.contacto1 = this.capitalizeFirstLetter(this.referenceCForm.value.contacto1);				
				this.formLocal.contactoC1 = this.referenceCForm.value.contacto1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 41:
				this.referenceCForm.value.cargo1 = this.capitalizeFirstLetter(this.referenceCForm.value.cargo1);		
				this.formLocal.cargoC1 = this.referenceCForm.value.cargo1;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 42:
				this.referenceCForm.value.nombre2 = this.capitalizeFirstLetter(this.referenceCForm.value.nombre2);		
				this.formLocal.nombreC2 = this.referenceCForm.value.nombre2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 43:
				this.formLocal.telefonoC2 = this.referenceCForm.value.telefono2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 44:
				this.referenceCForm.value.direccion2 = this.capitalizeFirstLetter(this.referenceCForm.value.direccion2);		
				this.formLocal.direccionC2 = this.referenceCForm.value.direccion2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 45:
				this.referenceCForm.value.contacto2 = this.capitalizeFirstLetter(this.referenceCForm.value.contacto2);		
				this.formLocal.contactoC2 = this.referenceCForm.value.contacto2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 46:
				this.referenceCForm.value.cargo2 = this.capitalizeFirstLetter(this.referenceCForm.value.cargo2);				
				this.formLocal.cargoC2 = this.referenceCForm.value.cargo2;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 47:
				this.referenceCForm.value.nombre3 = this.capitalizeFirstLetter(this.referenceCForm.value.nombre3);		
				this.formLocal.nombreC3 = this.referenceCForm.value.nombre3;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 48:
				this.formLocal.telefonoC3 = this.referenceCForm.value.telefono3;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 49:
				this.referenceCForm.value.direccion3 = this.capitalizeFirstLetter(this.referenceCForm.value.direccion3);				
				this.formLocal.direccionC3 = this.referenceCForm.value.direccion3;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 50:
				this.referenceCForm.value.contacto3 = this.capitalizeFirstLetter(this.referenceCForm.value.contacto3);		
				this.formLocal.contactoC3 = this.referenceCForm.value.contacto3;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 51:
				this.referenceCForm.value.cargo3 = this.capitalizeFirstLetter(this.referenceCForm.value.cargo3);			
				this.formLocal.cargoC3 = this.referenceCForm.value.cargo3;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 52:
				this.data1ProfileForm.value.direccion_exacta = this.direccion_exacta;
				this.formLocal.direccion_exactaP = this.direccion_exacta;
				this.formLocal.direccion_exacta = this.direccion_exacta;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			case 53:
				this.data1CompanyForm.value.direccion_exacta = this.direccion_exacta;
				this.formLocal.direccion_exactaE = this.direccion_exacta;
				this.formLocal.direccion_exacta = this.direccion_exacta;
				this.storage.setObject('formLocalRSV24',this.formLocal);
			break;
			default:
			break;
		}
	}

	async presentActionSheet(id:any) {
	  const actionSheet = await this.actionSheetController.create({
	    header: 'Seleccione una Imagen',
	    buttons: [{
	      text: 'Cargar Imagen',
	      icon: 'camera',
	      handler: () => {
			this.takePicture(id);
	      }
	    }, /*{
	      text: 'Usar Camara',
	      icon: 'camera',
	      handler: () => {
	      	if (id == 1 && this.typeUser == '1') {
	      		this.navCtrl.navigateForward('camera-preview');
	      	} else {
	      		this.verifyCamera(id);
	      	}	        
	      }
	    }, */{
	      text: 'Cancelar',
	      icon: 'close',
	      role: 'cancel',
	      handler: () => {
	        console.log('Cancel clicked');
	      }
	    }]
	  });
	  await actionSheet.present();
	}

	verifyCamera(id:any){
		/*if (this.platform.is('cordova')) {
		    this.platform.ready().then(() => {
				this.diagnostic.isCameraAuthorized().then((authorized) => {
				    if(authorized)
				        this.takePicture(this.camera.PictureSourceType.CAMERA,id);
				    else {
				        this.diagnostic.requestCameraAuthorization().then((status) => {
				            if(status == this.diagnostic.permissionStatus.GRANTED)
				                this.takePicture(this.camera.PictureSourceType.CAMERA,id);
				            else {
				                this.presentToast('No es posible acceder a la cámara, otorga permisos');
				            }
				        });
				    }
				});
		    });
		} else {
			this.takePicture(this.camera.PictureSourceType.CAMERA,id);
		}*/
	}

	updateImg(img:any){
		/*this.crop.crop(img, {quality: 75})
		.then((imagePath) => { 
			var currentName = img.substr(img.lastIndexOf('/') + 1);
			var correctPath = img.substr(0, img.lastIndexOf('/') + 1);
			this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), 1);
		},
		    error => console.log(JSON.stringify(error))
		);*/		
	}

	public takePicture2(sourceType:any,id:any) {
		// Create options for the Camera Dialog
		/*let options: CameraOptions;

		if (this.typeUser == '1' && id == 1) {
			options = {
		      quality: 75,
		      targetWidth: 400,
		      targetHeight: 400,
		      destinationType: this.camera.DestinationType.FILE_URI,
		      sourceType: sourceType,
		      saveToPhotoAlbum: false,
		      allowEdit: true,
		      correctOrientation: true
		    }
		} else if(this.typeUser == '2' && id == 4) {
			options = {
		      quality: 75,
		      targetWidth: 400,
		      targetHeight: 400,
		      destinationType: this.camera.DestinationType.FILE_URI,
		      sourceType: sourceType,
		      saveToPhotoAlbum: false,
		      allowEdit: true,
		      correctOrientation: true
		    }
		} else {
			options = {
		      quality: 75,
		      destinationType: this.camera.DestinationType.FILE_URI,
		      sourceType: sourceType,
		      saveToPhotoAlbum: false,
		      allowEdit: false,
		      correctOrientation: true
		    }
		}

		// Get the data of an image
		this.camera.getPicture(options).then((imagePath) => {
		  // Special handling for Android library
		  if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
		  
		  	//this.crop.crop(imagePath, {quality: 75})
			//.then((imagePath) => { 
				this.filePath.resolveNativePath(imagePath)
		        .then(filePath => {
		          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
		          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
		          this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), id);
		        });
			//},
			    //error => console.log(JSON.stringify(error))
			//);		  

		  } else {
		    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
		    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
		    this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), id);
		  }
		}, (err) => {
		  	this.presentToast('Error al seleccionar la imagen');
		});*/
	}

	// Create a new name for the image
	private createFileName() {
		var d = new Date(),
		n = d.getTime(),
		newFileName =  n + ".jpg";
		return newFileName;
	}
   
    // Copy the image to a local folder
	/*private copyFileToLocalDir(namePath, currentName, newFileName, id) {
		this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
		  this.lastImage = newFileName;
		  this.uploadImage(id);
		}, error => {
		  this.presentToast('Error al guardar la imagen');
		});
	}*/
   
  	// Always get the accurate path to your apps folder
	public pathForImage(img:any) {
		if (img === null) {
		  return '';
		} else {
		  //return cordova.file.dataDirectory + img;
      return 1;
		}
	}

	public uploadImage(id:any) {
		// Destination URL
		/*var url = "https://service24.app/alinstanteAPI/public/images_uploads/uploadregistro.php";
 
		// File for Upload
		var targetPath = this.pathForImage(this.lastImage);

		// File name only
		var filename = this.lastImage;

		var options = {
		  fileKey: "file",
		  fileName: filename,
		  chunkedMode: false,
		  mimeType: "multipart/form-data",
		  params : {'fileName': filename},
		  headers : {
		       Connection: "close"
		    }
		};

		const fileTransfer: FileTransferObject = this.transfer.create();

		fileTransfer.onProgress((progressEvent: any ) => {
            if (progressEvent.lengthComputable) {
            	this.zone.run(()=> {
            		if (id == 1) {
            			this.progressText1 = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                		this.progress1 = progressEvent.loaded / progressEvent.total;
            		} else if(id == 2){
            			this.progressText2 = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                		this.progress2 = progressEvent.loaded / progressEvent.total;
            		} else if (id == 3) {
            			this.progressText3 = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                		this.progress3 = progressEvent.loaded / progressEvent.total;
            		} else if (id == 4) {
            			this.progressText4 = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                		this.progress4 = progressEvent.loaded / progressEvent.total;
            		} else if (id == 5) {
            			this.progressText5 = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                		this.progress5 = progressEvent.loaded / progressEvent.total;
            		} else if (id == 6) {
            			this.progressText6 = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                		this.progress6 = progressEvent.loaded / progressEvent.total;
            		}
            	}); 
            };
        });
		// Use the FileTransfer to upload the image
		fileTransfer.upload(targetPath, url, options).then(data => {
			this.zone.run(()=> {
				if (id == 1) {
        			this.progressText1 = 100;
            		this.progress1 = 1;
            		if (this.typeUser == '1') {
            			this.registerProfileForm.patchValue({foto: data.response});
            			this.formLocal.foto = data.response;
            			this.up_foto1 = true;
            			this.up_fotoP = false;
            			this.storage.setObject('formLocalRSV24',this.formLocal);
            		} else {
            			this.registeCompanyForm.patchValue({logo: data.response});
            			this.formLocal.logo = data.response;
            			this.storage.setObject('formLocalRSV24',this.formLocal);
            			this.up_logo = false;
            		}
        		} else if(id == 2){
        			this.progressText2 = 100;
            		this.progress2 = 1;
            		if (this.typeUser == '1') {
            			this.registerProfileForm.patchValue({pasaporte: data.response});
            			this.formLocal.pasaporteP = data.response;
            			this.storage.setObject('formLocalRSV24',this.formLocal);
            			this.up_cedula = false;
            		} else {
            			this.registeCompanyForm.patchValue({operaciones: data.response});
            			this.formLocal.operaciones = data.response;
            			this.storage.setObject('formLocalRSV24',this.formLocal);
            			this.up_operaciones = false;
            		}
        		} else if (id == 3) {
        			this.progressText3 = 100;
            		this.progress3 = 1;
            		if (this.typeUser == '1') {
            			this.registerProfileForm.patchValue({idoneidad_file: data.response});
            			this.formLocal.idoneidad_file = data.response;
            			this.storage.setObject('formLocalRSV24',this.formLocal);
            		} else {
            			this.registeCompanyForm.patchValue({pasaporte: data.response});
            			this.formLocal.pasaporteE = data.response;
            			this.storage.setObject('formLocalRSV24',this.formLocal);
            			this.up_cedulaE = false;
            		}
        		} else if (id == 4) {
        			this.progressText4 = 100;
            		this.progress4 = 1;
            		this.up_foto2 = true;
            		this.up_fotoE = false;
            		this.registeCompanyForm.patchValue({foto: data.response});
        			this.formLocal.foto = data.response;
        			this.storage.setObject('formLocalRSV24',this.formLocal);
        		} else if (id == 5) {
        			this.progressText5 = 100;
            		this.progress5 = 1;
            		this.registerProfileForm.patchValue({record_policivo: data.response});
        			this.formLocal.record_policivo = data.response;
        			this.storage.setObject('formLocalRSV24',this.formLocal);
        			this.up_record = false;
        		} else if (id == 6) {
        			this.progressText6 = 100;
            		this.progress6 = 1;
            		this.registerProfileForm.patchValue({recibo_servicio: data.response});
        			this.formLocal.recibo_servicio = data.response;
        			this.storage.setObject('formLocalRSV24',this.formLocal);
        			this.up_recibo = false;
        		}
        	}); 
		}, err => {
		  this.presentToast('Error al subir la imagen');
		});*/
	}

	getPlans(){
		
		let items1:any= this.storage.getObject('userRPSV24');
  			if (true) {
  				let items:any=this.storage.get('TRPSV24');
		  			if (true) {
						
		  				this.userService.getPlans(items, items1,this.tipo_registro2).subscribe(
					        data => {
					        	console.log(data);
					       		this.data2 = data;
					       		this.plans = this.data2.Planes;
					       		for (var i = 0; i < this.plans.length; ++i) {
					       			this.plans[i].descripcion = JSON.parse(this.plans[i].descripcion);
									this.plans[i].descripcion_ingles = JSON.parse(this.plans[i].descripcion_ingles);
									this.plans[i].descripcion_portugues = JSON.parse(this.plans[i].descripcion_portugues);
					       			this.plans[i].show = false; 
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
		this.formLocal.select_plan=this.select_plan;
		this.storage.setObject('formLocalRSV24',this.formLocal);
	}

	setlocal1(){
		console.log(this.formLocal)
		console.log(this.direccion_exacta)
		/*this.formLocal.nombreP = this.data1ProfileForm.value.nombre; 
		this.formLocal.emailP = this.data1ProfileForm.value.email;
		this.formLocal.telefonoP = this.data1ProfileForm.value.telefono;
		this.formLocal.nombreE = this.data1ProfileForm.value.nombre;
		this.formLocal.emailE = this.data1ProfileForm.value.email;
		this.formLocal.telefonoE = this.data1ProfileForm.value.telefono;
		



		this.formLocal.cedula =this.data1ProfileForm.value.cedula;
		this.formLocal.sexo =this.data1ProfileForm.value.sexo;
		this.formLocal.nacionalidad =this.data1ProfileForm.value.nacionalidad;
		this.formLocal.direccionP =this.direccion;
		this.formLocal.direccion_exacta =this.direccion_exacta;
		this.formLocal.latitudP =this.data1ProfileForm.value.latitud;
		this.formLocal.longitudP =this.data1ProfileForm.value.longitud;
		this.formLocal.fecha_nacimiento =this.data1ProfileForm.value.fecha_nacimiento;*/
		//this.formLocal.dn ="";
		//this.formLocal.mn ="";
		//this.formLocal.yn ="";
		//this.formLocal.id = this.usuario.id;
		//this.formLocal.pais_id = this.usuario.pais_id;
		
	}
	setlocal2(){
		//this.formLocal.ruc ="";
		//this.formLocal.direccionE ="";
		//this.formLocal.direccion_exactaE ="";
		//this.formLocal.latitudE ="";
		//this.formLocal.longitudE ="";

		//this.formLocal.contacto_nombre ="";
		//this.formLocal.contacto_cedula ="";
		//this.formLocal.contacto_cargo ="";
		//this.formLocal.area ="";
		this.formLocal.formacion =this.data2ProfileForm.value.formacion;
		//this.formLocal.anos_experiencia ="";
		//this.formLocal.idoneidad ="";
		//this.formLocal.disponibilidad ="";
		this.formLocal.idioma =JSON.stringify(this.data2ProfileForm.value.idioma);
		this.formLocal.urgencias =this.data2ProfileForm.value.urgencias;
		this.formLocal.factura =this.data2ProfileForm.value.factura;
		//this.formLocal.nombreR1 ="";
		this.formLocal.telefonoR1 =this.data1ProfileForm.value.telefono;
		//this.formLocal.direccionR1 ="";
		//this.formLocal.nombreR2 ="";
		this.formLocal.telefonoR2 =this.data1ProfileForm.value.telefono;
		//this.formLocal.direccionR2 ="";
		this.formLocal.referenciasP =JSON.stringify(this.referencePForm.value);
		//this.formLocal.nombreC1 ="";
		//this.formLocal.telefonoC1 ="";
		//this.formLocal.direccionC1 ="";
		//this.formLocal.contactoC1 ="";
		//this.formLocal.cargoC1 ="";
		//this.formLocal.nombreC2 ="";
		//this.formLocal.telefonoC2 ="";
		//this.formLocal.direccionC2 ="";
		//this.formLocal.contactoC2 ="";
		//this.formLocal.cargoC2 ="";
		//this.formLocal.nombreC3 ="";
		//this.formLocal.telefonoC3 ="";
		//this.formLocal.direccionC3 ="";
		//this.formLocal.contactoC3 ="";
		//this.formLocal.cargoC3 ="";
		//this.formLocal.referenciasE ="";
		this.formLocal.foto = this.formLocal.foto;
		this.formLocal.logo =this.formLocal.logo;
		/*this.formLocal.pasaporteP =this.formLocal.pasaporteP;
		this.formLocal.pasaporteE =this.formLocal.pasaporteE;
		this.formLocal.operaciones =this.formLocal.operaciones;
		this.formLocal.idoneidad_file =this.formLocal.idoneidad_file;
		this.formLocal.record_policivo =this.formLocal.record_policivo;
		this.formLocal.recibo_servicio =this.formLocal.recibo_servicio;*/


		this.formLocal.lunesi =this.data2ProfileForm.value.lunesi;
		this.formLocal.lunesf =this.data2ProfileForm.value.lunesf;

		this.formLocal.martesi =this.data2ProfileForm.value.martesi;
		this.formLocal.martesf =this.data2ProfileForm.value.martesf;

		this.formLocal.miercolesi =this.data2ProfileForm.value.miercolesi;
		this.formLocal.miercolesf =this.data2ProfileForm.value.miercolesf;

		this.formLocal.juevesi =this.data2ProfileForm.value.juevesi;
		this.formLocal.juevesf =this.data2ProfileForm.value.juevesf;

		this.formLocal.viernesi =this.data2ProfileForm.value.viernesi;
		this.formLocal.viernesf =this.data2ProfileForm.value.viernesf;

		this.formLocal.sabadoi =this.data2ProfileForm.value.sabadoi;
		this.formLocal.sabadof =this.data2ProfileForm.value.sabadof;

		this.formLocal.domingoi =this.data2ProfileForm.value.domingoi;
		this.formLocal.domingof =this.data2ProfileForm.value.domingof;
		this.formLocal.tipo =this.typeUser;
		
		this.storage.setObject('formLocalRSV24',this.formLocal);
	}

	sendRegister(){
		
		//this.presentLoading();
		this.registeCompanyForm.patchValue({nombre: this.data1CompanyForm.value.nombre});
		this.registeCompanyForm.patchValue({ruc: this.data1CompanyForm.value.ruc});
		//this.registerProfileForm.patchValue({direccion: this.direccion});
		this.registerProfileForm.patchValue({direccion_exacta: this.direccion_exacta});
		//this.registerProfileForm.patchValue({latitud: this.data1ProfileForm.value.latitud});
		//this.registerProfileForm.patchValue({longitud: this.data1ProfileForm.value.longitud});
		this.registeCompanyForm.patchValue({email: this.data1CompanyForm.value.email});
		this.registeCompanyForm.patchValue({telefono: this.data1CompanyForm.value.telefono});
		this.registeCompanyForm.patchValue({contacto_nombre: this.data1CompanyForm.value.contacto_nombre});
		this.registeCompanyForm.patchValue({contacto_cedula: this.data1CompanyForm.value.contacto_cedula});
		this.registeCompanyForm.patchValue({contacto_cargo: this.data1CompanyForm.value.contacto_cargo});

		this.registeCompanyForm.patchValue({idiomas: JSON.stringify(this.data2ProfileForm.value.idioma)});
		this.registeCompanyForm.patchValue({urgencias: this.data2ProfileForm.value.urgencias});
		this.registeCompanyForm.patchValue({factura: this.data2ProfileForm.value.factura});
		this.registeCompanyForm.patchValue({referencias2: JSON.stringify(this.referenceCForm.value)});
		this.registeCompanyForm.patchValue({tipo: this.typeUser});

		let hours = {
			"lunes_i": this.data2ProfileForm.value.lunesi,
			"lunes_f": this.data2ProfileForm.value.lunesf,
			"martes_i": this.data2ProfileForm.value.martesi,
			"martes_f": this.data2ProfileForm.value.martesf,
			"miercoles_i": this.data2ProfileForm.value.miercolesi,
			"miercoles_f": this.data2ProfileForm.value.miercolesf,
			"jueves_i": this.data2ProfileForm.value.juevesi,
			"jueves_f": this.data2ProfileForm.value.juevesf,
			"viernes_i": this.data2ProfileForm.value.viernesi,
			"viernes_f": this.data2ProfileForm.value.viernesf,
			"sabado_i": this.data2ProfileForm.value.sabadoi,
			"sabado_f": this.data2ProfileForm.value.sabadof,
			"domingo_i": this.data2ProfileForm.value.domingoi,
			"domingo_f": this.data2ProfileForm.value.domingof
		}
		this.registerProfileForm.patchValue({disponibilidad: JSON.stringify(hours)});

		//this.presentLoading();
		this.registerProfileForm.patchValue({nombre: this.data1ProfileForm.value.nombre});
		this.registerProfileForm.patchValue({cedula: this.data1ProfileForm.value.cedula});
		this.registerProfileForm.patchValue({sexo: this.data1ProfileForm.value.sexo});
		this.registerProfileForm.patchValue({nacionalidad: this.data1ProfileForm.value.nacionalidad});
		//this.registerProfileForm.patchValue({direccion: this.direccion});
		this.registerProfileForm.patchValue({direccion_exacta: this.direccion_exacta});
		//this.registerProfileForm.patchValue({latitud: this.data1ProfileForm.value.latitud});
		//this.registerProfileForm.patchValue({longitud: this.data1ProfileForm.value.longitud});
		this.registerProfileForm.patchValue({fecha_nacimiento: this.data1ProfileForm.value.fecha_nacimiento});
		this.registerProfileForm.patchValue({email: this.data1ProfileForm.value.email});
		this.registerProfileForm.patchValue({telefono: this.data1ProfileForm.value.telefono});

		this.registerProfileForm.patchValue({formacion: this.data2ProfileForm.value.formacion});
		this.registerProfileForm.patchValue({idiomas: JSON.stringify(this.data2ProfileForm.value.idioma)});
		this.registerProfileForm.patchValue({urgencias: this.data2ProfileForm.value.urgencias});
		this.registerProfileForm.patchValue({factura: this.data2ProfileForm.value.factura});
		this.registerProfileForm.patchValue({referencias: JSON.stringify(this.referencePForm.value)});
		this.registerProfileForm.patchValue({referencias2: JSON.stringify(this.referenceCForm.value)});
		this.registerProfileForm.patchValue({tipo: this.typeUser});

		if (this.registerProfileForm.value.foto == '') {
			this.registerProfileForm.patchValue({foto: 'https://service24.app/apii/public/images_uploads/app/profile_general.png'});
		};

		let hours2 = {
			"lunes_i": this.data2ProfileForm.value.lunesi,
			"lunes_f": this.data2ProfileForm.value.lunesf,
			"martes_i": this.data2ProfileForm.value.martesi,
			"martes_f": this.data2ProfileForm.value.martesf,
			"miercoles_i": this.data2ProfileForm.value.miercolesi,
			"miercoles_f": this.data2ProfileForm.value.miercolesf,
			"jueves_i": this.data2ProfileForm.value.juevesi,
			"jueves_f": this.data2ProfileForm.value.juevesf,
			"viernes_i": this.data2ProfileForm.value.viernesi,
			"viernes_f": this.data2ProfileForm.value.viernesf,
			"sabado_i": this.data2ProfileForm.value.sabadoi,
			"sabado_f": this.data2ProfileForm.value.sabadof,
			"domingo_i": this.data2ProfileForm.value.domingoi,
			"domingo_f": this.data2ProfileForm.value.domingof
		}
		this.registerProfileForm.patchValue({disponibilidad: JSON.stringify(hours2)});

		if (this.typeUser == '1') {
			this.sendProfesional();
			/*if (this.formLocal.pais_id != '2') {
				if (this.registerProfileForm.value.pasaporte != '' && this.registerProfileForm.value.recibo_servicio != '' && this.up_foto1 == true) {
					this.sendProfesional();
				} else {
					this.presentToast('Debe subir los documentos obligatorios.');
					if (this.registerProfileForm.value.pasaporte == '') {
						this.up_cedula = true;
					}
					if (this.up_foto1 == false) {
						this.up_fotoP = true;
					}
					if (this.registerProfileForm.value.recibo_servicio == '') {
						this.up_recibo = true;
					}
				}
			} else {
				if (this.registerProfileForm.value.pasaporte != '' && this.registerProfileForm.value.recibo_servicio != '' && this.up_logo == true && this.registerProfileForm.value.record_policivo != '') {
					this.sendProfesional();
				} else {
					this.presentToast('Debe subir los documentos obligatorios.');
					if (this.registerProfileForm.value.pasaporte == '') {
						this.up_cedula = true;
					}
					if (this.registerProfileForm.value.record_policivo == '') {
						this.up_record = true; 
					}
					if (this.up_foto1 == false) {
						this.up_fotoP = true;
					}
					if (this.registerProfileForm.value.recibo_servicio == '') {
						this.up_recibo = true;
					}
				}
			}*/
		} else {
			this.sendEmpresa();
			/*if (this.formLocal.pais_id != '2') {
				if (this.registeCompanyForm.value.pasaporte != '' && this.registeCompanyForm.value.logo != '' && this.up_foto2 == true) {
					this.sendEmpresa();
				} else {
					this.presentToast('Debe subir los documentos obligatorios.');
					if (this.registeCompanyForm.value.pasaporte == '') {
						this.up_cedulaE = true;
					}
					if (this.up_foto2 == false) {
						this.up_fotoE = true;
					}
					if (this.registeCompanyForm.value.logo == '') {
						this.up_logo = true;
					}
				}
			} else {
				if (this.registeCompanyForm.value.pasaporte != '' && this.registeCompanyForm.value.logo != '' && this.up_foto2 == true && this.registeCompanyForm.value.operaciones != '') {
					this.sendEmpresa();
				} else {
					this.presentToast('Debe subir los documentos obligatorios.');
					if (this.registeCompanyForm.value.pasaporte == '') {
						this.up_cedulaE = true;
					}
					if (this.up_foto2 == false) {
						this.up_fotoE = true;
					}
					if (this.registeCompanyForm.value.operaciones == '') {
						this.up_operaciones = true;
					}
					if (this.registeCompanyForm.value.logo == '') {
						this.up_logo = true;
					}
				}
			}*/			
		}
	}

	sendProfesional(){
		
		//console.log(this.registerProfileForm.value)
		//if (this.registerProfileForm.valid) {
		if (this.validar()) {
			let items = this.storage.get('TRPSV24');
			//console.log(items)
	  			if (items) {
	  				//console.log(this.registerProfileForm.value)
					console.log(this.formLocal);
					if (this.actualiza==1) {
						this.userService.actualizar_registro(items,this.formLocal,this.miId).subscribe(
							data => {
								console.log(data);
								this.data1 = data;
								this.objService.setId(this.data1.Registro.id);
								this.id_est = this.data1.establecimiento.id;

								let items:any=this.storage.getObject('userRPSV24')
									if (items) {
										items.registro = this.data1.Registro;
										this.storage.setObject('userRPSV24',items);
										this.funciones_generales.iniciar();
										setTimeout(()=>{
											this.navCtrl.navigateRoot('tabs/tab8');
										},1300);		
									}
								
							},
							msg => {  
								console.log(msg);
								this.loading.dismiss();
								//this.presentToast(msg.error.error);
							}
						);
					}else{
						this.userService.setPreRegister(items,this.registerProfileForm.value).subscribe(
							data => {
								console.log(data);
								this.data1 = data;
								this.objService.setId(this.data1.Registro.id);
								this.id_est = this.data1.establecimiento.id;

								let items:any=this.storage.getObject('userRPSV24');
									if (items) {
										items.imagen = this.formLocal.foto;
										items.registro = this.data1.Registro;
										this.storage.setObject('userRPSV24',items);
										this.funciones_generales.iniciar();
										setTimeout(()=>{
											this.navCtrl.navigateRoot('tabs/tab8');
										},1300);	
									}
								
								//});       	
							},
							msg => {  
								console.log(msg);
								this.loading.dismiss();
								this.presentToast(msg.error.error);
							}
						);
					}
	  			}
			} 
	}

	sendEmpresa(){
		
		if (this.validar()) {
			console.log('completos')
			let items:any=this.storage.get('TRPSV24');
	  			if (items) {
					
					if (this.actualiza==1) {
						this.userService.actualizar_registro(items,this.formLocal,this.miId).subscribe(
							data => {
								console.log(data);
								this.data1 = data;
								this.objService.setId(this.data1.Registro.id);
								this.id_est = this.data1.establecimiento.id;

								let items:any=this.storage.getObject('userRPSV24')
									if (items) {
										items.registro = this.data1.Registro;
										this.storage.setObject('userRPSV24',items);
										this.funciones_generales.iniciar();
										setTimeout(()=>{
											this.navCtrl.navigateRoot('tabs/tab8');
										},1300);		
									}
								
							},
							msg => {  
								console.log(msg);
								this.loading.dismiss();
								//this.presentToast(msg.error.error);
							}
						);
					}else{

						this.userService.setPreRegister(items,this.registeCompanyForm.value).subscribe(
							data => {
								console.log(data);
								this.data1 = data;
								this.objService.setId(this.data1.Registro.id);
								this.id_est = this.data1.establecimiento.id;
								
								let items:any=this.storage.getObject('userRPSV24')
									if (items) {
										items.registro = this.data1.Registro;
										this.storage.setObject('userRPSV24',items);
										this.funciones_generales.iniciar();
										setTimeout(()=>{
											this.navCtrl.navigateRoot('tabs/tab8');
										},1300);		
									}
								
							},
							msg => {  
								console.log(msg);
								this.loading.dismiss();
								//this.presentToast(msg.error.error);
							}
						);
					}
	  			}
		} else {
			console.log('faltan datos')
		}
	}

	getServices(){
		if (this.id_est != '') {
			this.orderService.getServices(this.id_est).subscribe(
	        data => {
		      this.datos = data;
		      this.services = this.datos.productos;
		      this.services = this.sortByKey(this.services,'nombre');
		    },
		    msg => {
		      if(msg.status == 400 || msg.status == 401){ 
		      	this.storage.set('TRPSV24','');
		        this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
		        this.navCtrl.navigateRoot('login');
		      }
		    });	
		}
	};

	editService(item:any){
  		this.objService.setExtras(item);
  		this.navCtrl.navigateForward('edit-service');
  	}


	public toastButtons = [
		{
		  text: 'Cerrar',
		  role: 'cancel',
		},
	  ];

	async presentConfirm(item:any) {
	    const alert = await this.alertController.create({
		message: '¿Desea eliminar el servicio '+item.nombre+'?',
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
	          	this.deleteServices(item);
	          }
	        }
	      ]
		});
		await alert.present();
	}

	async presentConfirm1() {
	    const alert = await this.alertController.create({
		message: '¿Desea enviar la información del formulario?',
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
	          	this.sendRegister();
	          }
	        }
	      ]
		});
		await alert.present();
	}
	actualiza=0;
	validar(): any{
		


		console.log(this.miId)
		if (this.check_validate()) {
			//this.sendRegister();
			this.setPlan();
		}	
		//return false;
		return this.check_validate();
	}

	

	deleteServices(item:any){
		this.presentLoading();
		this.orderService.deleteService(item.id).subscribe(
        data => {
        	this.loading.dismiss();
        	this.presentToast('Se ha eliminado correctamente el servicio.')
	      	this.getServices();
	    },
	    msg => {
	    	this.loading.dismiss();
			if(msg.status == 400 || msg.status == 401){ 
				this.storage.set('TRPSV24','');
				this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
				this.navCtrl.navigateRoot('login');
			}
	    });
	}

	onValueChanged(data?: any) {
		if (!this.data1ProfileForm) { return; }
		const form = this.data1ProfileForm;
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

	onValueChanged2(data?: any) {
		if (!this.data2ProfileForm) { return; }
		const form = this.data2ProfileForm;
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

	onValueChanged3(data?: any) {
		if (!this.referencePForm) { return; }
		const form = this.referencePForm;
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

	onValueChanged4(data?: any) {
		if (!this.referenceCForm) { return; }
		const form = this.referenceCForm;
		for (const field in this.formErrors4) { 
		  const control = form.get(field);
		  //this.formErrors4[field] = '';
		  if (control && control.dirty && !control.valid) {
		    for (const key in control.errors) {
		      //this.formErrors4[field] += true;
		      console.log(key);
		    }
		  } 
		}
	}

	onValueChanged5(data?: any) {
		if (!this.data1CompanyForm) { return; }
		const form = this.data1CompanyForm;
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

	validateAllFormFields(formGroup: FormGroup, type:any) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsDirty({ onlySelf:true });
				if (type == 1) {
					this.onValueChanged();
				} else if (type == 2){
					this.onValueChanged2();
				} else if (type == 3) {
					this.onValueChanged3();
				} else if (type == 4){
					this.onValueChanged4();
				} else if (type == 5){
					this.onValueChanged5();
				}

			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control, type);
			}
		});
	}

	goProfile(){
		if (this.typeUser == '1') {
			this.objService.setExtras(this.registerProfileForm.value);
			this.objService.setCat(this.contract_url);
			this.objService.setType('1');
			//this.navCtrl.navigateForward('contract');
		} else {
			this.objService.setExtras(this.registeCompanyForm.value);
			this.objService.setCat(this.contract_url);
			this.objService.setType('2');
			//this.navCtrl.navigateForward('contract');	
		}
	}


	addService(){
		this.objService.setExtras(this.typeUser);
		this.objService.setCat(this.id_est);
		this.navCtrl.navigateForward('add-service-pre');
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

	async presentToast(text:any) {
		const toast = await this.toastController.create({
		  message: text,
		  cssClass: "toast-scheme",
		  duration: 2000
		});
		toast.present();
	}

	public sortByKey(array:any, key:any) {
	    return array.sort(function (a:any, b:any) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
	    });
	}

	public imagen:any='';
	public imagen_upload:any='';
	public id:any;
	takePicture = async (id:any) => {
		//alert('entro')
		console.log(id)
		this.id=id;
		const image = await Camera.getPhoto({
		quality: 30,
		allowEditing: true,
		resultType: CameraResultType.Uri,
		promptLabelPicture: 'Tomar una foto',
  		promptLabelPhoto: 'Seleccionar de galeria'
		});
		
		var imageUrl = image.webPath;
		this.imagen = imageUrl;
		
		console.log(this.imagen);
		//alert('gemerp')
		this.startUpload(image);
		};
		
		async startUpload(file:any) {
			//alert('empezo a subir f')
		let blob = await fetch(file.webPath).then(r => r.blob());
		const formData = new FormData();
		formData.append('file', blob, Date.now().toString() );
		this.uploadData(formData, file);
		}
		
		uploadData(formData: FormData, file:any) {
			//alert('empezo a subir up')
		this.userService.subir_imagen(formData).subscribe((response:any)=>{
		console.log(response)
		//this.editPhoto(response);
		}, (err:any)=>{
		console.log(err.error.text)
		this.imagen_upload=err.error.text;
		//this.editProfile();
			this.asignar(this.id);
		});
				
	}

	asignar(id:any){

		if (id==1) {
			console.log(1,this.imagen_upload)
			this.formLocal.logo = this.imagen_upload;
			this.storage.setObject('formLocalRSV24',this.formLocal);
			this.registerProfileForm.patchValue({logo: this.imagen_upload});
			this.registeCompanyForm.patchValue({logo: this.imagen_upload});

		}
		
		if (id==2) {
			console.log(2,this.imagen_upload)
			this.formLocal.pasaporteP = this.imagen_upload;
			this.registerProfileForm.patchValue({pasaporte: this.imagen_upload});
			this.registeCompanyForm.patchValue({pasaporte: this.imagen_upload});
			this.formLocal.operaciones = this.imagen_upload;
			this.registerProfileForm.patchValue({operaciones: this.imagen_upload});
			this.registeCompanyForm.patchValue({operaciones: this.imagen_upload});
			this.storage.setObject('formLocalRSV24',this.formLocal);
		}

		if (id==3) {
			console.log(3,this.imagen_upload)
			this.formLocal.idoneidad_file = this.imagen_upload;
			this.registerProfileForm.patchValue({idoneidad_file: this.imagen_upload});
			this.registeCompanyForm.patchValue({idoneidad_file: this.imagen_upload});
			this.formLocal.pasaporteE = this.imagen_upload;
			this.storage.setObject('formLocalRSV24',this.formLocal);
		}

		if (id==4) {
			console.log(4,this.imagen_upload)
			this.formLocal.foto = this.imagen_upload;
			this.registerProfileForm.patchValue({foto: this.imagen_upload});
			this.registeCompanyForm.patchValue({foto: this.imagen_upload});
			this.storage.setObject('formLocalRSV24',this.formLocal);
		}

		if (id==5) {
			console.log(5,this.imagen_upload)
			this.formLocal.record_policivo = this.imagen_upload;
			this.registerProfileForm.patchValue({record_policivo: this.imagen_upload});
			this.registeCompanyForm.patchValue({record_policivo: this.imagen_upload});
			this.storage.setObject('formLocalRSV24',this.formLocal);
		}

		if (id==6) {
			console.log(6,this.imagen_upload)
			this.formLocal.recibo_servicio = this.imagen_upload;
			this.registerProfileForm.patchValue({recibo_servicio: this.imagen_upload});
			this.registeCompanyForm.patchValue({recibo_servicio: this.imagen_upload});
			this.storage.setObject('formLocalRSV24',this.formLocal);
		}
	}

	next(){
		this.swiperInstance.slideNext();
		this.content.scrollToTop();
	}
	prev(){
		this.swiperInstance.slidePrev();
	}
	goToSlide(id: any) {
		console.log(id)
		//const index = this.swiperInstance.getSlideIndex(`#${id}`);
		this.swiperInstance.slideTo(id);
	}

	enviarRegistro(){
		this.actualiza=0;
	}

	

}

