import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { HomePage } from '../home/home';
import { PaymentDetailsPage } from '../payment-details/payment-details';
import { ViewRecordPage } from '../view-record/view-record';


@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {
  selectedCustomer: any;
  dailyDetailForm: FormGroup;
  currentDate: any = new Date().toISOString();
  amount: any;
  items: any;
  total = 0;
  name: string = '';
  validation_messages = {
    'milkType': [
      {type: 'required', message: 'Select Type'}
    ],
    'session': [
      {type: 'required', message: 'Select a session'}
    ],
    'quantity': [
      {type: 'required', message: 'Enter Quantity'}
    ]
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController,
    public services: ServicesProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    ) {
     this.dailyDetailForm = this.formBuilder.group({
      currentDate: ['', [Validators.required]],
      milkType: ['', [Validators.required,]],
      session: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      remark: ['', []],
    });
      this.selectedCustomer = navParams.get('item');
      console.log('Selected Customer is-',this.selectedCustomer)
      this.items = this.services.getDailyDetails(this.selectedCustomer.cust_id)
      this.name = this.selectedCustomer.firstName + ' ' + this.selectedCustomer.lastName;
      this.getTotal()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }
  getTotal() {
    if(this.items) {
      for(let i=0; i<this.items.length; i++) {
        this.total = this.total + this.items[i].dailydata.amount;
      } 
    }                                 
    console.log('Total is-', this.total);
  }
  //Daily record of customer
  addDailyRecord() {
    var dailyRecord = [];
    dailyRecord = this.dailyDetailForm.value;
   // dailyRecord['cust_id'] = this.selectedCustomer.cust_id;
    //console.log(dailyRecord)
    this.services.addDailyRecord(dailyRecord, this.selectedCustomer.cust_id);
    this.showAlert()
  }
  calculateAmount(){
    this.amount = this.selectedCustomer.amount * this.dailyDetailForm.value.quantity;
    console.log(this.amount)
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      subTitle: 'Record is updated',
      buttons: [
        {
        text: 'OK',
        handler: () => {
          this.navCtrl.setRoot(HomePage)
        }
      },
    ]
    });
    alert.present();
  }
  viewDailyDetails() {
    this.navCtrl.push(ViewRecordPage, {
      id: this.selectedCustomer.cust_id
    })
  }
  // share() {
  //   // Check if sharing via email is supported
  //   this.socialSharing.canShareViaEmail().then(() => {
  //     // Sharing via email is possible
  //   }).catch(() => {
  //     // Sharing via email is not possible
  //   });

  //   // Share via email
  //   this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
  //     // Success!
  //   }).catch(() => {
  //     // Error!
  //   });
  // }
  // call() {
  //   this.callNumber.callNumber(this.selectedCustomer.mobile, true)
  // .then(res => console.log('Launched dialer!', res))
  // .catch(err => console.log('Error launching dialer', err));
  // }
  viewBill() {
    this.navCtrl.push(PaymentDetailsPage, {
      item: this.selectedCustomer,
      total: this.total
    })
  }

  goBack() {
    this.navCtrl.pop()
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        // {
        //   text: 'View Bill',
        //   role: 'view-record',
        //   handler: () => {
        //     this.navCtrl.push(PaymentDetailsPage, {
        //       item: this.selectedCustomer,
        //       total: this.total
        //     })
        //   }
        // },
        // {
        //   text: 'Call',
        //   role: 'call',
        //   handler: () => {
               
        //   }
        // },
        // {
        //   text: 'Edit',
        //   role: 'edit',
        //   handler: () => {
        //     //console.log('Cancel clicked');
        //   }
        // },{
        //   text: 'Share',
        //   role: 'share',
        //   handler: () => {
        //     this.share()
        //   }
        // },{
        //   text: 'Delete',
        //   role: 'delete',
        //   handler: () => {
        //     //console.log('Cancel clicked');
        //   }
        // }
      ]
    });
    actionSheet.present();
  }
  
    
}
