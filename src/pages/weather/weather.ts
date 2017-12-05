import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherService } from '../../services/weather.service';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  private weather:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public weatherService: WeatherService) {
  }

  ionViewDidLoad() {
    this.weatherService.getCoords()
    .then(resp => {
        this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude)
        //.map(res => res.json())
        .subscribe(res => {
            this.weather = res.json();
            console.log(this.weather);
        })
    });
  }

}
