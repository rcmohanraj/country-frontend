import { Component, OnInit } from '@angular/core';
import { CountryInfo } from 'src/app/model/country-info.model';
import { CountryHttpService } from 'src/app/service/country-http.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries: CountryInfo[];
  searchValue: string;
  showError: boolean;
  showProgress: boolean;

  constructor(private countryService: CountryHttpService) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.showProgress = true;
    this.countryService
        .fetchCountries()
        .subscribe( 
          (res) => {
            this.countries = res.countries;
            this.resetOnSuccess();
            console.log("res:",this.countries);
          }, 
          (err) => {
            this.resetOnFail();
            console.log("err:",err);
          });
  }

  getCountry() {
    if (this.searchValue == undefined || this.searchValue === '') {
        return;
    }
    this.countries = undefined;
    this.showProgress = true;
    this.countryService
        .fetchCountryByName(this.searchValue)
        .subscribe( 
          (res) => {
            this.countries = [new CountryInfo(res.name, res.country_code, res.capital, res.population, res.flag_file_url)];
            this.resetOnSuccess();
          }, 
          (err) => {
            this.resetOnFail();
            console.log("err:",err);
          });
  }

  clear() {
    this.searchValue = '';
    this.showError = false;
    this.countries = undefined; 
    this.getCountries();
  }

  resetOnSuccess() {
    this.showError = false;
    this.showProgress = false;
  }

  resetOnFail() {
    this.showError = true;
    this.showProgress = false;
  }

}
