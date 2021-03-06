import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from './services/productos.service';
import { FormsModule} from '@angular/forms';
import { MenorPrecioPipe } from './pipes/menor-precio.pipe';
import { SelectFormComponent } from './components/select-form/select-form.component';
import { ActivoPipe } from './pipes/activo.pipe';
import { ApiComponent } from './components/api/api.component';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MenorPrecioPipe,
    SelectFormComponent,
    ActivoPipe,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [ProductosService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
