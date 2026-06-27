import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Employees } from './pages/employees/employees';
import { Leaves } from './pages/leaves/leaves';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'employees', component: Employees, canActivate: [authGuard] },
  { path: 'leaves', component: Leaves, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
