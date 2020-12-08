import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { ToastProvider } from '../../providers/toast/toast';
import { ValidationProvider } from '../../providers/validation/validation';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {
  customerForm: FormGroup;
  validation_messages: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public services: ServicesProvider,
    public alertCtrl: AlertController,
    public toast: ToastProvider,
    public validation: ValidationProvider
    ) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      milkType: ['', [Validators.required]],
      session: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })

    this.validation_messages = this.validation.validationMessages()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustomerPage');
  }
  addCustomer() {
    if (this.customerForm.invalid) {
      return;
  }
    this.services.addCustomer(this.customerForm.value)
    this.toast.presentToast('Customer added successfully')
    this.navCtrl.setRoot(HomePage)
    //this.navCtrl.pop()
  }
  // showAlert() {
  //   const alert = this.alertCtrl.create({
  //     subTitle: 'Customer added successfully',
  //     buttons: [
  //       {
  //       text: 'OK',
  //       handler: () => {
  //         this.navCtrl.setRoot(HomePage)
  //       }
  //     },
  //   ]
  //   });
  //   alert.present();
  // }
}
