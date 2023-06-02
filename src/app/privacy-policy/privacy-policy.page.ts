import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  datos: any;
	contrat_url: any;

  constructor(
  	private storage: StorageService, 
	public userService: UserService, 
	public sanitizer: DomSanitizer,
  ) { }

   ngOnInit() {
  	this.getInfo();
  }

  	getInfo(){
  		this.storage.getObject('ZONESV24').then(items => {
	      if (items != '' && items != null) {
	        this.userService.getPolice(items.pais_id).subscribe(
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
	    }); 
	}

}
