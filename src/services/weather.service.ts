import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class WeatherService {
    private appId:string;
    private baseUrl:string;

    constructor(public http: Http,
        public geolocation: Geolocation) {
            this.appId = '511e6db17d58303c967ca52bf616f6bf';
            this.baseUrl = 'http://api.openweathermap.org/data/2.5/'

    }


    //get coordinates (latitude and longitude) using ionic 3 location native component
    public getCoords() {
        return this.geolocation.getCurrentPosition({ 
            enableHighAccuracy: true, 
            timeout: 5000
        });
    }


    //get weather info by latitude and longitude
    public getWeather(lat:number, lon:number) {
        let url = this.baseUrl + 'weather';
        url += '?appId=' + this.appId;
        url += '&lat=' + lat.toString();
        url += '&lon=' + lon.toString();

        return this.http.get( url );
    }
}