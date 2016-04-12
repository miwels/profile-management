import {Router} from 'angular2/router';
import {Component, OnInit} from 'angular2/core';

import {Profile} from './profile';
import {ProfileService} from '../services/profile.service';

@Component({
    selector: 'profile-list',
    templateUrl: 'app/templates/profile-list.component.html',
    providers: [ProfileService]
})

export class ProfileListComponent implements OnInit {

    profiles: Profile[];
    deleted: boolean = false;
    errorMessage: any;

    constructor(
        private _router         : Router,
        private _profileService : ProfileService
        ) {

    }

    ngOnInit() : void {
        this._profileService.getProfiles()
                            .subscribe(
                                profiles  => this.profiles = profiles,
                                error     => this.errorMessage = <any>error);
    }

    // ['ProfileDetal'] is the name of a route that we have defined in our app.component.ts
    // same thing happens when we define a route in our view:
    //
    // <a [routerLink]="['Profiles']">All Profiles</a>
    //
    // or
    //
    // <a [routerLink]="['ProfileDetail', {id: profile.username}]">View profile</a>
    //
    // Which is equivalent to using the code below with a (click)="gotoDetail(profile)" event
    //
    // in the previous example, 'Profiles' and 'ProfileDetail' are the names of a route
    gotoDetail(profile: Profile) : void {
        this.deleted = false;
        this._router.navigate(['ProfileDetail', { username: profile.username }]);
    }

    delete(profile: Profile): void {
        this._profileService.deleteProfile(profile)
                            .subscribe(
                                profile => {
                                    if(profile.ok === 1) {
                                        // call the ngOnInit() method to update the list of profiles
                                        // in our model and to update the view.
                                        // I don't know if this is the best way of doing it but it
                                        // works, but this means that we have to perform another ajax
                                        // request. Maybe we should loop through the array of profiles
                                        // and delete the profile that has been removed. This would be
                                        // more efficient if we have a large list of profiles.
                                        this.ngOnInit();
                                    }
                                },
                                error   => this.errorMessage = <any>error);
    }

    edit(profile: Profile): void {
        this._router.navigate(['ProfileEdit', {username: profile.username}]);
    }
}