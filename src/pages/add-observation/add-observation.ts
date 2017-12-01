import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { DatabaseService } from '../../services/database.service';
import { CameraService } from '../../services/camera.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the AddObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-observation',
  templateUrl: 'add-observation.html',
})
export class AddObservationPage {

  public image:string;
  public progressImg:number;
  public name:string;
  public description:string;
  public activityId:string;
  public imageData:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public file: FileChooser, 
    public databaseService: DatabaseService,
    public cameraService: CameraService,
    public toastCtrl: ToastController,
    public loading: LoadingController) {
      this.activityId = this.navParams.get('activity');
      this.image = '';
      this.imageData = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddObservationPage');
  }


  public addObservation() {

    if( !this.name || !this.description ) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 3000
      }).present();
      return false;
    }

    //create new empty observation and get id
    let id = this.databaseService.getId('observations');


    //new observation object
    let newObservation = {
      id: id,
      activityId: this.activityId,
      name: this.name,
      description: this.description,
      //url: photoTaked.snapshot.downloadURL,
      createdAt: new Date().getTime()
    }


    //loading 
    let load = this.loading.create({
      content: 'Cargando...'
    });
    load.present();


    this.databaseService.insert('observations', newObservation)
    .then(response => {

      //upload img and update observation img url if a photo was taked.
      if( this.imageData.length ) {
        this.uploadImg( id );
      }


      load.dismiss();


      this.navCtrl.pop();
      this.toastCtrl.create({
        message: 'Observacion agregada correctamente!',
        duration: 3000
      }).present();


    })
    .catch(err => {
      console.error( err );
    });

  }





  /**
   * upload and update created observation img
   * @param id (observation)
   */
  private uploadImg( id:string ) {
    let photoTaked = this.databaseService.uploadImage(
      `imgs/img_${new Date().getTime()}.jpg`,
      this.cameraService.getBase64Image(this.imageData));
      photoTaked
      .then(img => {
        this.databaseService.update('observations/' + id, {
          url: photoTaked.snapshot.downloadURL
        })
      })
      .catch(err => console.error('no se guardo la imagen'));
  }






/**
 * take a picture with device camera.
 */
  public takeImg() {
   this.cameraService.takePhoto()
   .then(imgData => {
        this.image = this.cameraService.getBase64Image(imgData);
        this.imageData = imgData;
   })
   .catch(err => {
    console.error(err);
   });
  }




  public cancel() {
    this.navCtrl.pop();
  }

}
