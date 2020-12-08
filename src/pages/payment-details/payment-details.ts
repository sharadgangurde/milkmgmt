import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController, AlertController, MenuController, NavController, NavParams, Platform } from 'ionic-angular';
import * as moment from "moment";
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ServicesProvider } from '../../providers/services/services';
import { ToastProvider } from '../../providers/toast/toast';

//@IonicPage()
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {
  myDate:any;
  Total:any;
  pdfObj: any;
  options_pending: any;
  options: any;
  pendingamountmsg: any;
  milkmanuser: any;
  currentDate: any;
  paymentDetails: FormGroup;
  blobPdf: any;
  iab: any;
  validation_messages: any;
  fromDate: Date;

  selectedCustomer: any;
  getCust_id: any;
  displaydailydata: any[];
  getTotalamount: any;
  count = 0;
  total: any;
  gettot:any;
  pending: any;
  getCust_Item: any;
  displayPaymentDetails: any[];
  totalPending: any;
  pendingAmount: any;
  getpending: any;
  name: string = '';
  pdfData = [];
  


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    public services: ServicesProvider,
    public actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private file: File,
    private platform: Platform,
    private fileOpener: FileOpener,
    private callNumber: CallNumber,
   // public validation: ValidationProvider,
    public toast: ToastProvider
    ) {
    
      this.selectedCustomer = navParams.get('item');
      this.total  = navParams.get('total')
      this.gettot = Number.parseInt(this.total);
      this.gettot = this.total
      var result = JSON.parse(localStorage.getItem('currentUser'));
      this.milkmanuser = result.firstName;
      this.displayPaymentDetails = this.services.getPaymentDetails(this.selectedCustomer.cust_id); 
      this.name = this.selectedCustomer.firstName + ' ' + this.selectedCustomer.lastName;
      this.totalPending = this.getBillPending();
      
      this.paymentDetails = this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        fromDate: ['', [Validators.required]],
        paidAmount: ['', [Validators.required]],
        remark: ['', [Validators.required]],
        totalBill:['', [Validators.required]],
        pending: ['', [Validators.required]]
       
        
      })
    this.getpending = this.calculateAmount()//Number.parseInt(this.pending);
    this.currentDate = moment().format("YYYY-MM-DD");
    this.pdfData.push(this.currentDate)
    this.pdfData.push(this.totalPending)
    //this.validation_messages = this.validation.validationMessages()
  }

  ionViewDidLoad() {
    this.menu.enable(true);
    this.myDate = new Date().toISOString();
    console.log('Selected Customer for bill ', this.selectedCustomer)
    console.log('Selected Customer for bill ', this.total)
      //console.log('Selected Customers',this.selectedCustomer);
    //   console.log('Master gettot',this.gettot);
    //   console.log('Master getpending',this.getpending);
    //   console.log('Master pendingAmount',this.pendingAmount);
      console.log('DisplayPaymentDetails',this.displayPaymentDetails);
     

  }
  calculateAmount(){
    ///console.log(this.Paymentdetails.value.Paiedamount);
    return this.pending = this.calculatePendingAmount() - this.paymentDetails.value.paidAmount;
    // console.log(this.Paymentdetails.value.Paiedamount);
   }
  calculatePendingAmount(){
    return this.pendingAmount = this.gettot - this.totalPending;
    // console.log(this.Total);
   }

  Addpaymentdetails(){
   var paymentRecord = [];
   paymentRecord = this.paymentDetails.value;
   this.services.addPaymentDetails(paymentRecord, this.selectedCustomer.cust_id);
  
// console.log('add addPayment Details of id '+ this.selectedCustomer.cust_id +'PaymentRecord',this.Paymentdetails.value);
      
 // this.showAlert()
  }
  // showAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Add Payment ',
  //     subTitle:'Paid'+this.paymentDetails.value.paidAmount ,
  //     message: this.selectedCustomer.firstName,

  //     buttons: ['OK']
  //   });
  //   this.displayPaymentDetails = this.services.getPaymentDetails(this.selectedCustomer.cust_id); 
  //   alert.present();
  // }


  getBillPending() {
    if(this.displayPaymentDetails) {
      for(let i=0; i<this.displayPaymentDetails.length; i++) {
        if(this.displayPaymentDetails[i].cust_id == this.selectedCustomer.cust_id) {
          this.displayPaymentDetails.forEach(element => {
          var paidAmount =  Number.parseInt( element.PaymentDetails.pending);
          this.count = this.count + paidAmount
          });
         }
       }    
      console.log('The count ', this.count)                     
      return this.count;
      
    } else return null
  }
  

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        {
          //icon: 'mail',
          text: 'Bill Pdf',
          handler: () => {
           this.makePdf();
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
          text: 'Share',
          role: 'share',
          handler: () => {
            this.shareBill()
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
  share() {
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });

    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  call() {
    this.callNumber.callNumber(this.selectedCustomer.mobile, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  shareBill(){
    if(this.displayPaymentDetails){
        console.log(' prsent table ');

      for(let i=0; i<this.displayPaymentDetails.length; i++) {

        if(this.displayPaymentDetails[i].cust_id == this.selectedCustomer.cust_id) {

            //  console.log('loop custid  '+ this.DisplayPaymentDetails[i].cust_id);
              this.displayPaymentDetails.forEach(element => {
             this.pendingamountmsg =  Number.parseInt( element.PaymentDetails.pending);
              //    console.log('for each' + this.pendingamountmsg);
              });
         }

       }

       this.options_pending = {
        message:'Please kindly Pay Pending  Bill In few days... '+ '\n'+
        ' To Customer : '+ this.selectedCustomer.firstName + '\n' +
      // 'Total Bill =  '+ this.getTotalamount + '\n' +
        'Pending Bill =  '+ this.pending + '\n' +
        'Thank You...!!'  + '\n' +
          '             From:' +this.milkmanuser,
        subject: 'Bill Genrated',
        url: null,
        chooserTitle: 'Milk Man Send Bill' 
    }
     
    this.socialSharing.shareWithOptions(this.options_pending).then(() => {

      console.log('Success!');
      }).catch(() => {
      console.log('Error!'+ this.options_pending.message);
      });
  
      
    }else{

        this.options = {
              message:'Please kindly Pay Bill In few days... '+ '\n'+
              ' To Customer : '+ this.selectedCustomer.firstName + '\n' +
              'Total Bill =  '+ this.getTotalamount + '\n' +
            //  'Pending Bill =  '+ this.pendingamountmsg + '\n' +
              'Thank You...!!'  + '\n' +
                '            From :' +this.milkmanuser,
              subject: 'Bill Genrated',
              url: null,
              chooserTitle: 'Milk Man Send Bill' 
            }

          this.socialSharing.shareWithOptions(this.options).then(() => {

          console.log('Success!');
          }).catch(() => {
          console.log('Error!'+ this.options.message);
          });
        
        };
   }
  // viewBill() {
  //   this.navCtrl.push(PaymentDetailsPage, {
  //     item: this.selectedCustomer,
  //     total: this.total
  //   })
  // }
  makePdf() {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
    content: [
    {
    columns: [
    {
    // image: 'data:image/jpeg;base64,https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZEC36N8QXuJAef7yh06FKTlFYOhi9wgMbdg&usqp=CAU',
    // fit: [100, 100]
    },
    [
    { text: 'From', style: 'header' },
    { text: 'MilkMan', style: 'sub_header' },
    { text: 'Milkman Payment System', style: 'sub_header' },
    { text: 'WEBSITE: https://milkman.org/', style: 'url' },
    ]
    ]
    },
    { text: 'To', style: 'subheader' },
    this.name,
    this.selectedCustomer.address,
    this.selectedCustomer.mobile,
    { text: 'Bill', style: 'billtag'},
    {
      style: 'itemsTable',
      table: {
          widths: ['*', 75, 75],
          body: [
            ['Date.', 'Total Amount'],
            [ 'Pending till: '+this.currentDate, this.pending],
            ['Total:', this.pending],
          ]
      }
    },
    
    { text: 'Date', style: 'date' },
    this.currentDate
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 16,
        alignment: 'right'
      },
      subheader: {
        fontSize: 18,
        alignment: 'left'
      },
      sub_header: {
        fontSize: 12,
        alignment: 'right'
      },
      date: {
        fontSize: 12,
        alignment: 'left'
      },
      url: {
        fontSize: 12,
        alignment: 'right'
      },
      itemsTable: {
        marginTop: 70,
      },
      billtag: {
        alignment: 'center',
      }
    },
    pageSize: 'A4',
    pageOrientation: 'portrait'
    };
    //pdfmake.createPdf(docDefinition).open();
    // this.pdfObj = pdfmake.createPdf(docDefinition).open();
    // this.downloadPdf(this.pdfObj);
    var self = this;
    pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
      let utf8 = new Uint8Array(buffer);
      let binaryArray = utf8.buffer;
      self.downloadPdf(binaryArray);
    })
  }
  // downloadPdf(pdfObj) {
  //   console.log("DownloadPdf() triggered")
  //   if (this.platform.is('cordova')) {
  //     pdfObj.getBuffer((buffer) => {
  //       var blob = new Blob([buffer], { type: 'Documents/pdf' });
 
  //       // Save the PDF to the data Directory of our App
  //       this.file.writeFile(this.file.dataDirectory, 'test.pdf', blob, { replace: true }).then(fileEntry => {
  //       // Open the PDf with the correct OS tools
  //       const toast = this.toastCtrl.create({
  //         message: 'File saved to your device',
  //         duration: 3000,
  //         position: 'top'
  //         });
  //         toast.present();
      
  //       this.fileOpener.open(this.file.dataDirectory + 'test.pdf', 'Documents/pdf');
  //       })
  //     });
  //   } else {
  //     // On a browser simply use download!
  //     this.pdfObj.download();
  //   }
  // }

  downloadPdf(data: any){
    if (this.platform.is('ios')) {
    // Use inAppBrowser plugin,
    // easier and faster in iOS
      this.pdfObj.active = false;
      this.pdfObj.fileURL = URL.createObjectURL(data);
      var browser = this.iab.create(
        this.pdfObj.fileURL, 
        '_blank',
        'location=no,' +
        'toolbar=yes,' +
        'enableViewportScale=yes,' +
        'closebuttoncaption=Cerrar PDF,' +
        'hardwareback=no'
      );
      browser.show();
    } else if (this.platform.is('cordova')) {
      //alert(data)
      // lets save and then open the file
      this.blobPdf = data; // Lets store the pdf Blob
      let filedir = this.file.dataDirectory;
      this.file.writeFile( //save PDF
        filedir, 
        "bill.pdf", 
        this.blobPdf, 
        {replace:true}
      ).then(() =>{
        this.fileOpener.open( //open in native PDF
          filedir + 'bill.pdf', 
          'application/pdf'
        ).then(() => {
          this.pdfObj.active = false;
        }).catch(e => console.log('Open error', e));
      }).catch(e => console.log('Save error',e));
    } (error) => {
        alert('err')  
  }
	
	}

  
    
}
