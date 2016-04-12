import {Component, Input, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {Profile} from './profile';
import {ProfileService} from '../services/profile.service';

@Component({
    // selector: 'profile-detail', <- we don't need selector unless we are implementing the
    //                                directive in a template/view
    templateUrl: 'app/templates/profile-detail.component.html',
    providers: [ProfileService]
})

export class ProfileDetailComponent implements OnInit {
    @Input() profile: Profile;
    errorMessage : any;

    constructor(
        private _router         : Router,
        private _routeParams    : RouteParams,
        private _profileService : ProfileService
        ) {

    }

    ngOnInit(): void {
        let username = this._routeParams.get('username');
        this._profileService.getProfile(username)
                            .subscribe(
                                profile => this.profile = profile[0],
                                error   => this.errorMessage = <any>error);
    }

    // Lets define an method to go back to the previous page. It's a function
    // that returns a type void (nothing) and uses the router to take the user
    // to a different location defined in our app.component.js
    onBack(): void {
        this._router.navigate(['Profiles']);
    }
}