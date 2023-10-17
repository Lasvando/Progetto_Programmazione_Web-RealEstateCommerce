import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { PropertyCreateComponent } from './pages/property-create/property-create.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
    NavbarComponent,
    PropertyCardComponent,
    LoginComponent,
    RegisterComponent,
    PropertyDetailsComponent,
    PropertyCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
