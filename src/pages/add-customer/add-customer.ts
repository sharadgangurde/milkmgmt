import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  validation_messages = {
    'firstName': [
      {type: 'required', message: 'Enter a name'},
      {type: 'pattern', message: 'Enter a valid name'}
    ],
    'lastName': [
      {type: 'required', message: 'Enter a last name'},
      {type: 'pattern', message: 'Enter a valid name'}
    ],
    'email': [
      {type: 'required', message: 'Enter email-id'},
      {type: 'email', message: 'Enter a valid email'}
    ],
    'mobile': [
      {type: 'required', message: 'Enter mobile number'},
      {type: 'minlength', message: 'Enter a valid Number'}
    ],
    'address': [
      {type: 'required', message: 'Enter the address'},
    ],
    'fromDate': [
      {type: 'required', message: 'Select a date'},
    ]
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      fromDate: ['', [Validators.required]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustomerPage');
  }
  addCustomer() {
    if (this.customerForm.invalid) {
      return;
  } 
    console.log(this.customerForm.value)
    console.log('view load for add customer');
  }
}
