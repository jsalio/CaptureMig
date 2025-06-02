import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/login/auth.route').then(routes => routes.AUTH_ROUTES) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
