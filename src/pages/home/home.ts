import { Component, ViewChild  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('barCanvas') barCanvas;
  
  barChart: any;
  public cycles:Array<any>;
  public cycleNames: Array<string>;
  public current_user:any;

  constructor(public navCtrl: NavController, public databaseService: DatabaseService, public authService: AuthService) {
    this.databaseService.getBy('cycles', {
      orderByChild: 'userId',
      equalTo: this.authService.userData.uid
    }).subscribe(cycles => {

      this.cycles = cycles;
      this.cycleNames = this.cycles.map(a => a.name);
      this.loadCharts();
    })
    
  }


  ionViewDidLoad() {

  }

  private loadCharts() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'horizontalBar',
        data: {
            //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            labels: this.cycleNames,
            datasets: [{
                label: 'Progreso de los ciclos',
                data: [12, 50, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }
}
