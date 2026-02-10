import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { UserFeedback } from './pages/user-feedback/user-feedback';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';
import { RegisterComponent } from './pages/register/register';
import { AdminHome } from './pages/admin-home/admin-home';
import { ManageProducts } from './pages/manage-products/manage-products';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },


  { path: 'user', component: UserFeedback, canActivate: [AuthGuard] },

// { path: 'user', component: UserFeedback },


  { path: 'admin', component: AdminHome, canActivate: [AuthGuard, AdminGuard] },

  { path: 'admin/feedback', component: AdminDashboard, canActivate: [AuthGuard, AdminGuard] },

  { path: 'admin/products', component: ManageProducts, canActivate: [AuthGuard, AdminGuard] },

  // { path: 'admin', component: AdminDashboard },

  { path: '**', redirectTo: 'login' }

];
