import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class WeatherService {

    private OpenWeatherApi: {
        baseUrl:string,
        appId:string
    };
    private WeatherBitApi: {
        baseUrl:string,
        appId:string
    };


    constructor(public http: Http,
        public geolocation: Geolocation) {

            this.OpenWeatherApi = {
                baseUrl: 'http://api.openweathermap.org/data/2.5/',
                appId: '511e6db17d58303c967ca52bf616f6bf'
            };

            this.WeatherBitApi = {
                baseUrl: 'https://api.weatherbit.io/v2.0/',
                appId: '32e7e46ee6584766947315b71f4afe98'
            };

    }


    //get coordinates (latitude and longitude) using ionic 3 location native component
    public getCoords() {
        return this.geolocation.getCurrentPosition({ 
            enableHighAccuracy: true, 
            timeout: 20000,
            maximumAge: 3600000
        });
    }


    //get weather info by latitude and longitude
    public getWeather(lat:number, lon:number) {
        let url = this.OpenWeatherApi.baseUrl + 'weather';
        url += '?appId=' + this.OpenWeatherApi.appId;
        url += '&lat=' + lat.toString();
        url += '&lon=' + lon.toString();
        url += '&units=metric';

        return this.http.get( url );
    }



    //get forecast weather (each 3 hours per 5 days) info by latitude and longitude
    public getForecastWeather(lat:number, lon:number) {
        let url = this.OpenWeatherApi.baseUrl + 'forecast';
        url += '?appId=' + this.OpenWeatherApi.appId;
        url += '&lat=' + lat.toString();
        url += '&lon=' + lon.toString();
        url += '&units=metric';

        return this.http.get( url );
    }
}