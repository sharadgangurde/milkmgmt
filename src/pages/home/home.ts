import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AddCustomerPage } from '../add-customer/add-customer';
import { CustomerDetailPage } from '../customer-detail/customer-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
    
  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad Homepage');
   this.menu.enable(true);
  }
  gotoAddCustomer(){
    this.navCtrl.push(AddCustomerPage);
  }
  customerDetails() {
    this.navCtrl.push(CustomerDetailPage);
  }

}
