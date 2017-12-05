import { Component, ViewChild  } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('barCanvas') barCanvas;
  
  barChart: any;
  public cycles:Array<any>;
  public cyclesData: Array<any>;
  public current_user:any;
  public weather:any;

  constructor(public navCtrl: NavController, 
    public databaseService: DatabaseService, 
    public authService: AuthService, 
    public weatherService: WeatherService,
    public platform: Platform) {
        
    this.databaseService.getBy('cycles', {
      orderByChild: 'userId',
      equalTo: this.authService.userData.uid
    }).subscribe(cycles => {
      this.cycles = cycles;
      this.cyclesData = this.cycles.map((cycle, index) => {
          return {
            name: cycle.name, 
            nick: 'Ciclo '+(index++),
            color: this.random_rgba()
          }
      })
      this.loadCharts();
    });

    
    
  }


  ionViewDidLoad() {
   
  }

  private loadCharts() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: this.cyclesData.map(a => a.nick),
            datasets: [{
                label: 'Progreso de los Cultivos',
                data: [12, 50, 3, 5, 2, 3],
                backgroundColor: this.cyclesData.map(a => a.color),
                borderColor: this.cyclesData.map(a => a.color),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }

    });
  }

  
    public random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
    }
}
