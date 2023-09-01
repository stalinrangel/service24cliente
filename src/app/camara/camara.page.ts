import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '../../environments/environment';
import { UserService } from 'src/services/user/user.service';
import { Camera, CameraResultType } from '@capacitor/camera'; 
import { ImagenService } from '../services/imagen.service';
//import { File } from '@awesome-cordova-plugins/file';

declare var google:any;

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  autocomplete:any;
  map:any;

  imagen:any='';
  fileimagen:any='';
  base64Data: string='';
  constructor(private user: UserService,private imageService: ImagenService) { }
  ngOnInit() {
    let self=this;
    setTimeout(() => {
      //self.createMap();
      self.initMap();
      }, 500);
  }

  takePicture2 = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image;
    this.imagen = imageUrl;
    console.log('takePicture');
    console.log(imageUrl);
    this.onConvert();
    this.onConvert2();
    this.onConvert3();
    //const blob = new Blob([this.imagen], { type: 'image/jpeg' });
    //const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    
    //console.log(file)
    //this.imagen=file;
    // Can be set to the src of an image now
    //var imageElement.src = imageUrl;
    //this.onFileSelected();
  };

  takePicture = async () => {
    console.log('entro')
    const image = await Camera.getPhoto({
    quality: 70,
    allowEditing: false,
    resultType: CameraResultType.Uri
    });
    
    var imageUrl = image.webPath;
    this.imagen = imageUrl;
    console.log(this.imagen);
    this.startUpload(image);
    };
    
    async startUpload(file:any) {
    let blob = await fetch(file.webPath).then(r => r.blob());
    const formData = new FormData();
    formData.append('file', blob, Date.now().toString() );
    this.uploadData(formData, file);
    }
    
    uploadData(formData: FormData, file:any) {
    this.user.subir_imagen(formData).subscribe((response:any)=>{
    console.log(response)
    //this.editPhoto(response);
    }, (err:any)=>{
    console.log(err)
    });
    }
  
  upload() {

    
    
  }

  uploadPhoto(file:any){
    let self = this;
    let formData = new FormData();
    console.log(file);
    console.log(JSON.stringify(file))
    console.log('uploadPhoto2');
    formData.append("file", file);
    this.user.subir_imagen(formData).subscribe({
      next(data){
        console.log(data);
        alert('success')
      },error(err){
        console.log(err);
        alert(JSON.stringify(err))
      }
    })
  }

  onFileSelected() {
    const file = this.imagen;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Data = reader.result as string;
    };
  }

  onConvert() {
    console.log('onConvert');
    //console.log(this.imagen.dataUrl);
    const file = this.imageService.base64toFile(this.imagen.dataUrl, 'usuario.'+this.imagen.format);
    console.log(file)
    this.fileimagen=file;
    this.uploadPhoto(file);
  }

  onConvert2() {
    console.log('onConvert2');
    //console.log(this.imagen.dataUrl);
    const base64Image = this.imagen.dataUrl; // Replace with your base64 image
    const byteCharacters = atob(base64Image.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], 'image2.png', { type: 'image/png' });
    this.uploadPhoto(file);
  }

  async onConvert3() {
    console.log('onConvert3');
    //console.log(this.imagen.dataUrl);
    const base64Image = this.imagen.dataUrl; // Replace with your base64 image
    const response = await fetch(base64Image);
    const blob = await response.blob();
    const file = new File([blob], 'image3.png', { type: 'image/png' });
    this.uploadPhoto(file);
  }

  async initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    this.map = new Map(document.getElementById("map"), {
      center: { lat: environment.lat, lng: environment.lng },
      zoom: 8,
    });
    this.createMap()
  }


  async createMap() {
    console.log(environment.api)


      const center = {  lat: environment.lat, lng: environment.lng, };
      // Create a bounding box with sides ~10km away from the center point
      const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
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
    
      const latLng = {
        lat: self.autocomplete.getPlace().geometry.location.lat(),
        lng: self.autocomplete.getPlace().geometry.location.lng()
      };

      self.addMarker(latLng);

    }, 500);
    
  }

  async geolocate(){
    console.log('geolocate')

    const coordinates = await Geolocation.getCurrentPosition();
    
    console.log('Current position:', coordinates);

    const latLng = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };

    this.addMarker(latLng);
  }

  async addMarker(latLng:any){

    this.map.panTo(latLng);
    this.map.setZoom(15);
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      draggable: true,
    });
    
    marker.addListener('dragend',(event:any) => { 
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
      const latLng={
        lat:event.latLng.lat(),
        lng:event.latLng.lng()
      };
      this.geocodePosition(latLng);
    });
    

  }

  geocodePosition(latLng:any) {
    let self=this;
    this.user.getDirections(latLng.lat,latLng.lng).subscribe((data: any) => {
      console.log(data)
      console.log(data.results[0].formatted_address)
    },
      (error: { error: any; }) => {
      console.log(error)
    });
  }

    

}




