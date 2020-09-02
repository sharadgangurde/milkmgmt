import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Component } from '@angular/core';

@Component({
  selector: 'page-view-record',
  templateUrl: 'view-record.html',
})
export class ViewRecordPage {
 id: any;
 total = 0;
 items: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider) {
    this.id = this.navParams.get('id');
    
  }

  ionViewDidLoad() {
    
    this.items = this.services.getDailyDetails(this.id)
    this.getTotal()
    console.log('ionViewDidLoad ViewRecordPage');
    console.log('DATA=', this.items)
  }
  getTotal() {
    for(let i=0; i<this.items.length; i++) {
      this.total = this.total + this.items[i].dailydata.amount;
    }                                  
    console.log('Total is-', this.total);
  }

}
