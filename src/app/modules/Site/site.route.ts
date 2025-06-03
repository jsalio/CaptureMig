
import { Routes } from '@angular/router';

export const SITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./site/site.component').then(m => m.SiteComponent)
  },
  {
    path: '',
    redirectTo: 'site',
    pathMatch: 'full'
  }
];