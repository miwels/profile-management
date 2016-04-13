import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx'; // needed if we want to use the .map() method
import {Observable} from 'rxjs/Observable';

import {Profile} from '../components/profile';

@Injectable()
export class ProfileService {

    private _profilesUrl: string      = '/api/profile/get';
    private _messageUrl: string       = '/api/message/post';
    private _saveProfileUrl: string   = '/api/profile/post';
    private _deleteProfileUrl: string = '/api/profile/delete';

    constructor(private _http: Http) {
    }

    // we might have a data property sometimes:
    // res => res.json().data
    // we can use the .do() function to debug our application and check what's
    // recevied without affecting the normal flow of the application
    getProfiles() {
        return this._http.get(this._profilesUrl)
                        .map(res => res.json())
                        // .do(data => console.log('All: ' + JSON.stringify(data)))
                        .catch(this.handleError);
    }

    // Get one single profile. Useful if we need to populate the information of a model
    getProfile(username: string) {
        return this._http.get(this._profilesUrl + '/' + username)
                         .map(res => res.json())
                         // .do(data => console.log('Profile detail: ' + JSON.stringify(data)))
                         .catch(this.handleError);
    }

    // Save a new profile. We perform a POST method to do this.
    saveProfile(profile: Profile) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._saveProfileUrl, JSON.stringify(profile), {
                             headers: headers
                        })
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    // Edit a profile. The end point is the same we use for saving a profile but performing a PUT instead
    editProfile(profile: Profile) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.put(this._saveProfileUrl, JSON.stringify(profile), {
                                headers: headers
                            })
                            .map(res => res.json())
                            .catch(this.handleError);
    }

    // Deletes a profile from the database. Perfroms a DELETE in the specified end point.
    deleteProfile(profile: Profile) {
        return this._http.delete(this._deleteProfileUrl + '/' + profile.username)
                         .map(res => res.json())
                         .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}