import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CountryService {
    
    private _countriesUrl: string = '/api/countries';
    private _citiesUrl: string    = '/api/cities/';
    
    constructor(private _http: Http) {        
    }
    
    // Returns a list of countries
    getCountries() {
        return this._http.get(this._countriesUrl)
                         .map(res => res.json())
                         // .do(data => console.log('Countries: ' + data))
                         .catch(this.handleError);
    }
    
    // given a country, returns the list of cities in that country
    getCities(country: string) {
        return this._http.get(this._citiesUrl + country)
                         .map(res => res.json())
                         // .do(data => console.log('Cities: ' + data))
                         .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}