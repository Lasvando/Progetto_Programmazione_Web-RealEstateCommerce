import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { PropertyCreateComponent } from './pages/property-create/property-create.component';
import { PaymentConfirmationComponent } from './pages/payment-confirmation/payment-confirmation.component';
import { PropertyEditComponent } from './pages/property-edit/property-edit.component';
import { authGuard } from './guards/auth.guard';
import { BookingComponent } from './pages/booking/booking.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'Welcome', data: {routeName: "Home"}},
  { path: 'login', component: LoginComponent, title: 'Login'},
  { path: 'register', component: RegisterComponent, title: 'Register'},
  { path: 'property-details/:id', component: PropertyDetailsComponent, title: 'Property Details'},
  { path: 'property-edit/:id', component: PropertyEditComponent, title: 'Property Edit', canActivate:[authGuard]},
  { path: 'property-create', component: PropertyCreateComponent, title: 'Property Create'},
  { path: 'payment-confirmation', component: PaymentConfirmationComponent, title: 'Payment Confirmed'},
  { path: 'booking', component: BookingComponent, title: 'Booking'},
  { path: '**', component: NotFoundComponent, title: 'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
