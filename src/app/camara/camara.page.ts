import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '../../environments/environment';
import { UserService } from 'src/services/user/user.service';



@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  autocomplete:any;

  constructor(private user: UserService) { }

  ngOnInit() {
    let self=this;
    setTimeout(() => {
      self.createMap();
      }, 500);
  }

  @ViewChild('map')
  mapRef:any= ElementRef<HTMLElement>;
  newMap:any= GoogleMap;

  async createMap() {
    console.log(environment.api)
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.maps,
      config: {
        center: {
          lat: environment.lat,
          lng: environment.lng,
        },
        zoom: 15,
      },
    });

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
    /*const marker = new google.maps.Marker({
      position: latLng,
      map: this.newMap,
      draggable: true,
    });*/
    //this.markers.push(marker)
    let self=this;

    const markerId = await this.newMap.addMarker({
      coordinate: latLng,
      map: this.newMap,
      draggable: true
    });
    await this.newMap.setCamera({
      coordinate: latLng
    });

    console.log(markerId)
    this.newMap.setOnMarkerDragEndListener((pos: any) => {
      console.log(pos);
      const latLng={
        lat:pos.latitude,
        lng:pos.longitude
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




