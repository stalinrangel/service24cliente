import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../servicesproveedor/user.service';
import { StorageService } from '../../servicesproveedor/storage.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  datos: any;
	contrat_url: any = null;

  constructor(
    private storage: StorageService, 
    public userService: UserService, 
    public sanitizer: DomSanitizer,
    ) { }

    ngOnInit() {
      this.getInfo();
    }
  
      getInfo(){
      let items:any=this.storage.getObject('userRPSV24');
          if (items) {
            let items1:any=this.storage.get('TRPSV24');
              if (items1) {
                this.userService.getTerminos('1',items1).subscribe(
                    data => {
                      console.log(data);
                      this.datos = data;
                      this.contrat_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.datos.varSistema.url);
                    },
                    msg => {  
                      console.log(msg);
                      
                  }
                );
              }
          } 
    }

}
