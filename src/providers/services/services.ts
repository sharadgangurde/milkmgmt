//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.)
*/
@Injectable()
export class ServicesProvider {
  currentUser: any;
  newData: any;
  formData: any;
  customers=[];
  //isLoggedIn: boolean = false;
  isLoggedIn = new BehaviorSubject(false);
  constructor(public storage: Storage) {
    console.log('Hello ServicesProvider Provider');
    this.getCurrentUser()
    this.customers = JSON.parse(localStorage.getItem('customer'));
  }
  setRegistrationData(data) {
   localStorage.setItem('user', JSON.stringify([data]));
  }
  getLogin(data) {
    var result = JSON.parse(localStorage.getItem('user'));
    result.forEach(item => {
        console.log('Item', item);
        if(item.email == data.userName && item.password == data.password) {
          localStorage.setItem('currentUser', JSON.stringify(item));
          this.isLoggedIn.next(true);
        }
      });
  }
  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser) {
      this.isLoggedIn.next(true);
      return this.currentUser;
    } else {
      this.isLoggedIn;
    }

  }
  addCustomer(data) {
    let tmpdata = localStorage.getItem('customer');
    //Added customer Id by counting all cstomers
    var currentCustomers = JSON.parse(tmpdata)
    
    if(currentCustomers) {
      var length = currentCustomers.length;
      data['cust_id'] = length + 1;
    } else
      data['cust_id'] = 1;
    console.log('customerId-', data);
    //push new customer after old one
    if (tmpdata){
        this.newData = currentCustomers;
        this.newData.push(data);
        localStorage.setItem('customer',JSON.stringify(this.newData));
    
      }else{
    
        localStorage.setItem('customer', JSON.stringify([data]));
        
      }
  }
  
  getCustomer(){
    return this.customers;
  }
  getCustomerDetails(id) {
    console.log('customer id for Details',id)
  }
  deleteCustomer(id) {
    console.log('customer id for delete',id)
  }
  addDailyRecord(data, id) {
    //console.log(data)
    let tmpdata = localStorage.getItem('dailyrecord');
    // var dailyRecord = [];
    // dailyRecord = {id: data};
    // console.log('Your Daily record is-',dailyRecord)
    if (tmpdata){
        this.newData = JSON.parse(tmpdata);
        this.newData.push(data);
        localStorage.setItem('dailyrecord',JSON.stringify(this.newData));
    
      }else{
    
        localStorage.setItem('dailyrecord', JSON.stringify([data]));
        
      }
  }
}
