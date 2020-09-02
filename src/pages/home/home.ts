import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AddCustomerPage } from '../add-customer/add-customer';
import { CustomerDetailPage } from '../customer-detail/customer-detail';
import { ServicesProvider } from '../../providers/services/services';
//import { PaymentDetailsPage } from '../payment-details/payment-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchQuery: string = '';
  items: string[];
  customers: any;
  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public services: ServicesProvider,
    ) {
     this.customers = this.services.getCustomer();
     console.log('GETTING CUSTOMERS', this.customers);
     
  }
  ionViewDidLoad() {
   // this.customers = this.services.getCustomer()
    console.log('ionViewDidLoad Homepage');
    console.log('GETTING ALL CUSTOMERS', this.customers);
   this.menu.enable(true);
  }
  
  searchItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.customers = this.customers.filter((item) => {
       //console.log(item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1)
        return (item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else this.customers = this.services.getCustomer();

  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.customers = this.services.getCustomer();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
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
  removeItem(item) {
    //sliding.stopPropagation();
    console.log('Item to be deleted-',item)
    this.services.deleteCustomer(item);
  }
  viewBill(item) {
    console.log('Bill Button tapped');
    // this.navCtrl.push(PaymentDetailsPage, {
    //   item: item
    // });
  }
  // viewDailyDetails(item) {
  //   this.navCtrl.push(ViewRecordPage, {
  //     id: item.cust_id
  //   });
  // }

}
