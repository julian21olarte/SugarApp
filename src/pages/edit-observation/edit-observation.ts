import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../services/database.service';
import { CameraService } from '../../services/camera.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the EditObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-observation',
  templateUrl: 'edit-observation.html',
})
export class EditObservationPage {

  public observation:any;
  public observationAux:any;
  public observationImg:any;

  public image:any;
  public imageData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public databaseService: DatabaseService,
    public cameraService: CameraService,
    public toastCtrl: ToastController,
    public loading: LoadingController ) {

      this.image = '';
      this.imageData = '';

    /**
     * get observation data from viewObservationPage
     */
    this.observationAux = this.navParams.get('observation');


    /**
     * Create a new observation object to prevent real observation object modification in cancel case
     */
    this.observation = {
      activityId: this.observationAux.activityId,
      createdAt: this.observationAux.createdAt,
      description: this.observationAux.description,
      id: this.observationAux.id,
      name: this.observationAux.name
    }
    if( this.observationAux.url ) {
      this.observation.url = this.observationAux.url;
      this.databaseService.downloadImg( this.observation.url )
      .then(img => {
        this.observationImg = img;
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditObservationPage');
  }


  public EditObservation() {

    if( !this.observation.name || !this.observation.description ) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 3000
      }).present();
      return false;
    }


    //loading 
    let load = this.loading.create({
      content: 'Cargando...'
    });
    load.present();


    this.databaseService.update('observations/' + this.observation.id, this.observation)
    .then(response => {

      //upload img and update observation img url if a photo was taked.
      if( this.imageData.length ) {
        this.uploadImg( this.observation.id );
      }


      load.dismiss();


      this.navCtrl.pop();
      this.toastCtrl.create({
        message: 'Observacion modificada correctamente!',
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
