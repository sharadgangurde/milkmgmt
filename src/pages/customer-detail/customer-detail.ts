import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {
  selectedCustomer: any;
  dailyDetailForm: FormGroup
  currentDate: any = new Date().toISOString();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController,
    public services: ServicesProvider
    ) {
      this.dailyDetailForm = new FormGroup({
        currentDate: new FormControl(),
        milkType: new FormControl(),
        session: new FormControl(),
        amount: new FormControl(),
        quantity: new FormControl(),
        remark: new FormControl()
     });
      this.selectedCustomer = navParams.get('item');
      console.log('Selected Customer is-',this.selectedCustomer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }
  //Daily record of customer
  addDailyRecord() {
    var dailyRecord = [];
    dailyRecord = this.dailyDetailForm.value;
    dailyRecord['cust_id'] = this.selectedCustomer.cust_id;
    //console.log(dailyRecord)
    this.services.addDailyRecord(dailyRecord);
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        {
          text: 'View Bill',
          role: 'view-bill',
          handler: () => {
            //console.log('Destructive clicked');
          }
        },{
          //icon: 'mail',
          text: 'Message',
          handler: () => {
            //console.log('Archive clicked');
          }
        },{
          text: 'Call',
          role: 'call',
          handler: () => {
               
          }
        },{
          text: 'Edit',
          role: 'edit',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },{
          text: 'Delete',
          role: 'delete',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
