npm install firebase --save
-> Import firebase as well as firebase.initializeApp(in constructor) in app.component.ts for connecting to our Firebase project

ionic cordova plugin add cordova-plugin-camera
npm install ionic-native --save 
npm install --save @ionic-native/camera //interact with camera plugin

GO to app.module.ts
*************************************************************************************
import { Camera } from '@ionic-native/camera';

@NgModule({
  providers: [
    Camera
  ]
})
export class AppModule { }
**************************************************************************************
Taking picture from Ionic Framework 

import firebase and camera plugin and constructor(public cameraPlugin: Camera) 

takePhoto() function to start the camera and capture photo
-Call camera provider in the function takePhoto()
-Create photo storage ref with firebase.storage().ref('...');
-To store image, use .putString() to passing the base64 string which was got from the Camera Plugin

selectPhoto() function to select a photo from gallery
uploadPhoto() function to upload to Firebase Storage and using the downloadURL to display the photo


****myNote: Update your security rules with match /{allPaths=**} to indicate that public read and write access is allowed on all paths: 
**************************************************************************************
match /{allPaths=**} {
      // Allow access by all users
      allow read, write;
    }
*************************************************************************************
