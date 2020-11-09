import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../model/app-constants';
import { map, catchError } from 'rxjs/operators';
import { Countries } from '../model/countries.model';
import { CountryInfo } from '../model/country-info.model';

@Injectable({
  providedIn: 'root'
})
export class CountryHttpService {

  constructor(private http: HttpClient) { }

  fetchCountries() {
    return this.http
              .get(AppConstants.COUNTRY_URL, { headers: this.getHeaders() })
              .pipe(
                map((data: Countries) => {
                  return data;
                })
              );
  }

  fetchCountryByName(name:string) {
    return this.http
              .get(AppConstants.COUNTRY_URL+name, { headers: this.getHeaders() })
              .pipe(
                map((data: CountryInfo) => {
                  return data;
                })
              );
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application-json');
    // headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  }
}
