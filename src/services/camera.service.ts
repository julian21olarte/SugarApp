import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraService {

  options: CameraOptions = {
    quality: 85,
    targetHeight: 200,
    targetWidth: 200,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true
  }

  constructor(private camera: Camera) { }


  /**
   * Take a photo with native camera
   * @returns promise
   */
  public takePhoto():Promise<any> {
    return this.camera.getPicture(this.options);
  }


  public getBase64Image(imageData:string) {
    return 'data:image/jpeg;base64,' + imageData;
  }
}