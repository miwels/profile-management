import {Component, Input, Injectable} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Profile} from './profile';
import {ProfileService} from '../services/profile.service';
import {CountryService} from '../services/country.service';

@Injectable()

@Component({
    selector: 'profile-add',
    templateUrl: 'app/templates/profile-add.component.html',
    providers: [ProfileService, CountryService]
})

export class ProfileAddComponent {
    // Initialize our Profile model with blank values so that nothing is displayed in the form
    // This also prevents our component to throw an error due the fact that profile.name, profile.age, etc.
    // are not defined if the object is empty
    profile: Profile = new Profile('', '', 0, '', '');

    errorMessage: any;
    submitted: boolean = false;
    submittedMessage: any = false;
    edit: boolean = false;
    countries: Object[] = [];

    // -- start constructor
    constructor(
        private _profileService: ProfileService,
        private _countryService: CountryService,
        private _routeParams: RouteParams)
        {
            // Pull the list of countries for each user:
            this._countryService.getCountries()
                                .subscribe(
                                    countries => this.countries = countries,
                                    error => this.errorMessage = <any>error);
                                
            // This bit is a bit esotheric. This component accepts an optional parameter :username
            // If we don't have this parameter we initialize our model with blank values (first condition)
            // If there is a :username parameter (else) we call our service and search the user in the database.
            // If we find the user we populate our form (model) with the appropriate values. The good thing about
            // doing this is that we don't need to create a new instance of the Profile class, Angular will
            // populate all fields of our model for us.
            // We define this bit in the constructor so that this operation is performed when the route is called.
            // I assume that we can also do this using an OnInit but I haven't tried
            let username = this._routeParams.get('username');

            if(username) {
                this._profileService.getProfile(username)
                                    .subscribe(
                                        profile => {
                                            // don't display unexisting profiles
                                            if(profile.length) {
                                                // assign the profile found to our template model and set the edit variable to true
                                                // so that we replace the "Save" button of our template with an "Edit" button
                                                // (each button is linked to a different event)
                                                this.profile = profile[0];
                                                this.edit = true;
                                            }
                                        },
                                        error   => this.errorMessage = <any>error);
            }
        }
    // -- end constructor

    // if set to true, displays a message in the same page with all the information we've sent to the server
    obSubmit(): void {
        // this.submitted = true;
    }

    // Saves a profile in the database. We return an object with the following structure:
    // response = {
    //    status: "OK|ERROR",
    //    message: "Some message"
    // }
    saveProfile(): void {
        this._profileService.saveProfile(this.profile)
                            .subscribe(
                                response => this.saveEditCallbackSuccess(response),
                                error    => this.saveEditCallbackError(error));
    }

    // This function edits a profile. The behaviour is pretty much the same of the saveProfile() method but
    // we are performing a PUT instead.
    //
    // NOTE: Keep in mind that we user the username to search in the database so this field
    // Can't be edited!!!
    editProfile(profile: Profile): void {
        this._profileService.editProfile(this.profile)
                            .subscribe(
                                response => this.saveEditCallbackSuccess(response),
                                error    => this.saveEditCallbackError(error));
    }

    // we can also replace this with an arrow function
    //
    // response  => {
    //      this.submitted = response.status == "OK" ? true : false;
    //      this.submittedMessage = response.message;
    //      }

    saveEditCallbackSuccess(response: any): void {
        this.submitted = response.status == "OK" ? true : false;
        this.submittedMessage = response.message;
    }

    // we can also use an arrow function
    // error     => this.errorMessage = <any>error
    saveEditCallbackError(error: any): void {
        this.errorMessage = <any>error;
    }
}