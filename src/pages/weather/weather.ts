import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherService } from '../../services/weather.service';
import { Chart } from 'chart.js';

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
  private forecastWeather:any;
  @ViewChild('chartCanvas') chartCanvas;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public weatherService: WeatherService) {

    this.weatherService.getCoords()
    .then(resp => {
      console.log(resp);

      //get current weather
      this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude)
      .subscribe(res => {
          this.weather = res.json();
          console.log(this.weather);
      })

      //get forecast weather
      this.weatherService.getForecastWeather(resp.coords.latitude, resp.coords.longitude)
      .subscribe(res => {
          this.forecastWeather = res.json();
          this.loadCharts();
          console.log(this.forecastWeather);
      })

    });
  }
  

  public loadCharts() {
    var myLineChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.forecastWeather.list.map(a => a.dt_txt),
        datasets: [{
            label: 'Temperatura',
            data: this.forecastWeather.list.map(a => (a.main.temp)),
            pointRadius: 1,
            backgroundColor: [
                'rgba(0, 69, 134, 0.4)'
            ],
            borderColor: [
                'rgba(0, 69, 134, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: '°C'
            }
          }],
          xAxes: [{
            ticks: {
              stepSize: 1,
              min: 0,
              display: false
            }
          }]
        }
      }
    });
  }

  ionViewDidLoad() {
    
  }

}
