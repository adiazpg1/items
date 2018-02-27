import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ApiComponent } from './components/api/api.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'api', component: ApiComponent},
    { path: '**', pathMatch: 'full' , redirectTo: 'home' },

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


