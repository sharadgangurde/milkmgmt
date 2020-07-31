import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AddCustomerPage } from '../add-customer/add-customer';
import { CustomerDetailPage } from '../customer-detail/customer-detail';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customers: any;
  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public services: ServicesProvider
    ) {
     this.customers = this.services.getCustomer()
     console.log('HETTING CUSTOMERS', this.customers);
  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad Homepage');
   this.menu.enable(true);
  }
  gotoAddCustomer(){
    this.navCtrl.push(AddCustomerPage);
  }
  customerDetails(item) {
    console.log(item)
    this.navCtrl.push(CustomerDetailPage, {
      item: item
    });
  }
  viewBill() {
    console.log('Bill Button tapped');
  }

}
