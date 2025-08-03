import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';

export const routes: Routes = [
   { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];