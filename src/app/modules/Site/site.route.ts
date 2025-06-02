// src/app/modules/auth/auth.routes.ts
import { Routes } from '@angular/router';

export const SITE_ROUTES: Routes = [
  {
    path: 'site',
    // loadComponent: () => import('./login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'site',
    pathMatch: 'full'
  }
];