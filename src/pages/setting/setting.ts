import { AUTHService } from './../../services/user/AUTH.service';
import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  imagePath="";
  user:any;
  changePassword=false;
  constructor(public navCtrl: NavController
    ,public auth:AUTHService,
    public toastCtrl:ToastController,
    public alertCtrl :AlertController ,
    public navParams: NavParams,
    public camera :Camera ,
    public actionSheetCtrl :ActionSheetController
    ,public loadCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    this.user=this.auth.getUser();
    
    /*this.user={
      id: 1,
      FirstName: "Mickey",
      LastName: "mr",
      UserName: "3aziema",
      Password: "8f7rwvoj3836jtqhn9ip8f",
      Email: "tito68932@gmail.com",
      //DeviceID: "",
      Status: false,
      ImageURL: "",
      WarningScore: 0,
      BlockedBy: null
  };*/
  this.imagePath=this.user.ImageURL;
  //this.imagePath="../assets/imgs/IMG_20190118_152815.jpg"
  console.log(this.user);
  }
  updatingUser(form:NgForm)
  {
      const loading = this.loadCtrl.create({
      content:"Updating...",
       });
      loading.present();
      if(this.imagePath != this.user.ImageURL)
      { 
       const ImageRef=firebase.storage().ref("UserPictures/image-"+new Date().getMilliseconds()+".jpg");
       ImageRef.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL)
       .then((snapshot)=>{
       this.user.FirstName=form.value.FirstName;
       this.user.LastName=form.value.LastName;
       this.user.UserName=form.value.Username;
       this.user.Password=form.value.newPassword;
       this.user.Email=form.value.Email;
       this.user.ImageURL=snapshot.downloadURL;
       this.auth.updateUser(this.user.id,this.check(this.user)).subscribe((data)=>
       {
         if(data)
         {
          if(this.auth.store_user(this.user,true))
          {
            loading.dismiss();
            this.toastCtrl.create({
              message:'successfully updating',
              duration:3000
            }).present();
          } 
         }
       },(err)=>
       {
        loading.dismiss();
        this.toastCtrl.create({
        message:'problem happened during updating the data',
        duration:3000
         }).present();
       });
       }).catch(error=>{
        loading.dismiss();
        this.toastCtrl.create({
          message:'Error in saving Image : '+error,
          duration:3000
        }).present();
      });
      }else
      {
         this.user.FirstName=form.value.FirstName;
         this.user.LastName=form.value.LastName;
         this.user.UserName=form.value.Username;
         this.user.Password=form.value.newPassword;
         this.user.Email=form.value.Email;
         this.auth.updateUser(this.user.id,this.check(this.user)).subscribe((data)=>
         {
         if(data)
         {
          if(this.auth.store_user(this.user,true))
          {
            loading.dismiss();
            this.toastCtrl.create({
              message:'successfully updating',
              duration:3000
            }).present();
          } 
         }
       },(err)=>
       {
        loading.dismiss();
        this.toastCtrl.create({
        message:'problem happened during updating the data',
        duration:3000
      }).present();
       });
      }
       this.changePassword=false;
       console.log(this.user);
  }
  SaveChanges(form:NgForm)
  {
    if(this.changePassword) 
    { if(form.value.newPassword===form.value.ConfirmPassword)
      {
        this.updatingUser(form);
      }
      else
      {
        this.showAlert();
      }
      
    }else
    {
      this.updatingUser(form);
    }
    console.log(form);
  }
  check(user)
  {
     let verfingUser = user;
     if(user.Status)
     {
      verfingUser.Status=user.Status;
     }else
     {
      verfingUser.Status=false;
     }
     if(user.ImageURL)
     {
      verfingUser.ImageURL=user.ImageURL;
     }else
     {
      verfingUser.ImageURL="";
     }
     if(user.WarningScore)
     {
       verfingUser.WarningScore=user.WarningScore;
     }else
     {
       verfingUser.WarningScore=0;
     }
     if(user.BlockedBy)
     {
       verfingUser.BlockedBy=user.BlockedBy;
     }else
     {
       verfingUser.BlockedBy="";
     }
    return verfingUser;
  }
  showConfirm()
  {
    this.changePassword=true;
    console.log(this.changePassword);
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Please, be sure that the confirm password is the same as new password',
      buttons: ['OK']
    });
    alert.present();
  }
  Usecamera()
  {
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      cameraDirection:this.camera.Direction.BACK,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      })
      .then(imagedata=>{
        this.imagePath= "data:image/jpeg;base64,"+imagedata;
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in Capturing Image : '+error,
          duration:3000
        }).present();
      })
  }
  UploadImage()
  {
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      cameraDirection:this.camera.Direction.BACK,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      })
      .then(imagedata=>{
        this.imagePath= "data:image/jpeg;base64,"+imagedata;
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in Capturing Image : '+error,
          duration:3000
        }).present();
      })
  }
  LogOut()
  {
    let log;
    log=this.auth.logout();
    if(log)
    {
      this.toastCtrl.create({
        message:'Loged out Succussfully',
        duration:3000
      }).present();
    }else
    {
      this.toastCtrl.create({
        message:'there is a problem happend',
        duration:3000
      }).present();
    }
    
  }
  showActionSheet()
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Update your profile photo',
      enableBackdropDismiss:true,
      //cssClass:"actionsheat",
      buttons: [
        {
          text: 'Use Camera',
          icon:'camera',
          handler: () => {
            this.Usecamera()
          }
        },
        {
          text: 'Upload Image',
          icon:'image',
          handler: () => {
            this.UploadImage()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon:'close-circle',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
}
