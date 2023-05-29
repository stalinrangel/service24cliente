import { Component, ViewChild } from '@angular/core';
import { IonTabs, Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public currentTab: string = "tab1";
	@ViewChild(IonTabs) public tabs: any;
	public subscription: any;

	constructor(private platform: Platform,public navCtrl: NavController, public router: Router){}
	
	setTab(evt:any) {
    	this.currentTab = this.tabs.getSelected();
    	this.openTab(this.currentTab,evt);
	}

	ionViewDidEnter(){
	    this.subscription = this.platform.backButton.subscribe(()=>{
	    	if (this.router.url == '/tabs/tab1' || this.router.url == '/tabs/tab2' || this.router.url == '/tabs/tab3') {
			    //navigator['app'].exitApp();
		    }   
	    });
	}

	ionViewWillLeave(){
		this.subscription.unsubscribe();
	}

	openTab(tab: string, evt: MouseEvent) {
	    const tabSelected = this.tabs.getSelected();
	    if (this.router.url == '/tabs/tab1/category/subcategory/providers/detail-provider/order') {
		    return tabSelected !== tab
		    ? this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
		    : this.tabs.select(tab);
	    }   
	}

}


