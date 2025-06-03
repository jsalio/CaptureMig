import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/login/auth.route').then(routes => routes.AUTH_ROUTES) },
  { path:  'site', loadChildren: () => import ('./modules/Site/site.route').then(routes => routes.SITE_ROUTES)},
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
