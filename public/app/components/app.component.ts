import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {ProfileListComponent} from './profile-list.component';
import {ProfileDetailComponent} from './profile-detail.component'
import {ProfileAddComponent} from './profile-add.component';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{ title }}</h1>
        <nav>
            <a [routerLink]="['Profiles']">Profiles</a> |
            <a [routerLink]="['ProfileAdd']">Add Profile</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['app/css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    // The providers array tells Angular to create a fresh instance of the HeroService when it creates a new HeroesComponent. The HeroesComponent can use that service to get heroes and so can every child component of its component tree.
    providers: [ROUTER_PROVIDERS]
})

// the <router-outlet></router-outlet> directive tells the view where to place the
// content of the component that is being displayed in that moment
@RouteConfig([
    {
        path: '/profiles',
        name: 'Profiles',
        component: ProfileListComponent
    },
    {
        path: '/profile-add',
        name: 'ProfileAdd',
        component: ProfileAddComponent
    },
    {   // we can define multiple routes with the same path with or without params. This is useful to reuse a component with optional params
        path: '/profile-add/:username',
        name: 'ProfileEdit',
        component: ProfileAddComponent  
    },
    {
        path: '/profile/:username',
        name: 'ProfileDetail',
        component: ProfileDetailComponent
    }
])

export class AppComponent {
    title = "Manage Incidents";
}
