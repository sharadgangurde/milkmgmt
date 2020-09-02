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
  dailyData: any;
  customers=[];
  billData: any;
  totalArray: any;
  //isLoggedIn: boolean = false;
  isLoggedIn = new BehaviorSubject(false);
  constructor(public storage: Storage) {
    console.log('Hello ServicesProvider Provider');
    this.getCurrentUser()
    
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
    //Added customer Id 
    var currentCustomers = JSON.parse(tmpdata)
    
    if(currentCustomers) {
      //var length = currentCustomers.length;
      for(let i=0; i<currentCustomers.length; i++) {
      var cust_id = currentCustomers[i].cust_id;
    }
      data['cust_id'] = cust_id + 1;
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
    this.customers = JSON.parse(localStorage.getItem('customer'));
    return this.customers;
  }
  // getCustomerDetails(id) {
  //   console.log('customer id for Details',id)
  // }
  deleteCustomer(item) {
    console.log('customer id for delete',item)
      console.log('current Customers',this.customers);
  
      for(let i = 0; i < this.customers.length; i++) {
        if(this.customers[i].cust_id == item.cust_id){       
          this.customers.splice(i, 1);
        }
        console.log('After Delete ', this.customers)
        localStorage.setItem('customer', JSON.stringify(this.customers));
      
      }
  }
  addDailyRecord(data, id) {
    var newArray={};
    var newData={};
    console.log('DAILY DATA =====WORK IN PROGRESS=======',id)
    // var paymentArray = JSON.parse(localStorage.getItem('paymentDetails'));
    var tmpData = localStorage.getItem('dailyData');
    if(tmpData) {
      Object.assign(newData, {'cust_id': id});
      var dailydata = Object.assign(newData, {'dailydata': data});
      //console.log('CurrentData', dailydata)
      this.dailyData = JSON.parse(tmpData);
      this.dailyData.push(dailydata);
      //Object.assign(this.dailyData, dailydata)
      console.log('----FINAL DAILY DATA CHECK ---- ', this.dailyData)
      localStorage.setItem('dailyData', JSON.stringify(this.dailyData));
      // if(paymentArray) {
      //   for(let i = 0; i < paymentArray.length; i++) {
      //     if(paymentArray[i].cust_id == id) {
      //       paymentArray[i].total =  data.amount + paymentArray[i].total;
      //       //console.log(paymentArray)
      //       localStorage.setItem('paymentDetails', JSON.stringify(paymentArray));
      //     } 
      //   }
      //   Object.assign(totalArray, {'cust_id': id})
      //   Object.assign(totalArray, {'total': data.amount})
      //   paymentArray.push(totalArray);
      //   console.log('ELSE 1 EXECUTED',paymentArray)
      //   localStorage.setItem('paymentDetails', JSON.stringify(paymentArray));
      // }

    } else {
      Object.assign(newArray, {'cust_id':id});
      Object.assign(newArray, {'dailydata':data});
      localStorage.setItem('dailyData', JSON.stringify([newArray]));
      // Object.assign(totalArray, {'cust_id': id})
      // Object.assign(totalArray, {'total': data.amount})
      // // console.log(totalArray)
      // localStorage.setItem('paymentDetails', JSON.stringify([totalArray]));
    }
    
    
    console.log('-----New Data format----Checking----',newArray);
  }
  getDailyDetails(id) {
    var allDailyRecords: any;
    let requestedRecord=[];
    console.log('Get Daily Record of one customer ', id)
    allDailyRecords = JSON.parse(localStorage.getItem('dailyData'));
    //console.log(allDailyRecords.length)
    if(allDailyRecords) {
      for(let i=0; i<allDailyRecords.length; i++) {
        //console.log('loop executed with data', allDailyRecords[i])
        if(allDailyRecords[i].cust_id == id) {
          requestedRecord.push(allDailyRecords[i]);
          
        }
      }
      return requestedRecord;
    }
    return null;

  }
  addPaymentDetails(data, id) {
    var newArray={};
    var newData={};
  //  paymentDetails['total'] = newValue;
    var tmpData = localStorage.getItem('PaymentDetails');
    if(tmpData) {
      Object.assign(newData, {'cust_id': id});
      var paymentdata = Object.assign(newData, {'PaymentDetails': data});
      //console.log('CurrentData', BillData)
      this.billData = JSON.parse(tmpData);
      this.billData.push(paymentdata);
      //Object.assign(this.BillData, BillData)
    
      localStorage.setItem('PaymentDetails', JSON.stringify(this.billData));
    } else {
      Object.assign(newArray, {'cust_id':id});
      Object.assign(newArray, {'PaymentDetails':data});
      localStorage.setItem('PaymentDetails', JSON.stringify([newArray]));
    }
    
  }

  getPaymentDetails(id) {
    var paymentDetails: any;
    var requestedRecord=[];
    //console.log('Get Daily Record of one customer ', id);
    paymentDetails = JSON.parse(localStorage.getItem('PaymentDetails'));
    if(paymentDetails) {
      for(let i=0; i<paymentDetails.length; i++) {
        if(paymentDetails[i].cust_id == id) {

          requestedRecord.push(paymentDetails[i]);
        //  i++;
        }
      }
      return requestedRecord;
    }
    return null;

  }
}
