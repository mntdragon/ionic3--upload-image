import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, public cameraPlugin: Camera) {
      //create a storage ref
    this.myPhotosRef = firebase.storage().ref('/Photos/');
  }

  takePhoto(){
    this.cameraPlugin.getPicture({
      quality: 100,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      saveToPhotoAlbum: true
    }). then(imageData => {
        //send the picture to Firebase storage
          this.myPhoto = imageData;
          this.uploadPhoto(); // upload function
      },
    error =>{
      //Log an error 
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(){
    this.cameraPlugin.getPicture({
      quality: 100,      
      sourceType: this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      encodingType: this.cameraPlugin.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
        //Log an error
        console.log("ERROR => " + JSON.stringify(error));
    });
  }

  private uploadPhoto(){
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
                    .putString(this.myPhoto, 'base64', { contentType: 'image/png'})
                    .then((savedPhoto) =>{
                      this.myPhotoURL = savedPhoto.downloadURL;
                    });
      //Short and simple: including create databse ref to add downloadURL of that img to access any time
      //  const myPhotosRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
      // selfieRef.putString(profilePicture, 'base64', {contentType: 'image/png'}).then(savedProfilePicture => {
      //       firebase
      //       .database()
      //       .ref(`users/user1/profilePicture`)
      //       .set(savedProfilePicture.downloadURL);
      //   });
      // });
  }

  private generateUUID(){
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
      

}
