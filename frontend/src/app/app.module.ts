import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { PropertyCreateComponent } from './pages/property-create/property-create.component';
import { AuthInterceptor } from './interceptors/auth-interceptor.interceptor';
import { PropertyImageCarouselComponent } from './pages/property-details/property-image-carousel/property-image-carousel.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { PaymantConfirmationComponent } from './pages/paymant-confirmation/paymant-confirmation.component';
import { PropertyEditComponent } from './pages/property-edit/property-edit.component';

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
    PropertyCreateComponent,
    PropertyImageCarouselComponent,
    PaypalComponent,
    PaymantConfirmationComponent,
    PropertyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
