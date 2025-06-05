
import { Routes } from '@angular/router';

export const SITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./site/site.component').then(m => m.SiteComponent),
    children: [
      {
        path:'dashboard',
        loadComponent:() => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path:'scan',
        loadComponent:() => import('./scan/scan.component').then(c => c.ScanComponent)
      },
      {
        path:'scan-exception',
        loadComponent:() => import('./scan-exception/scan-exception.component').then(c => c.ScanExceptionComponent)
      },
      {
        path:'qa-scan',
        loadComponent:() => import('./qa-scan/qa-scan.component').then(c => c.QaScanComponent)
      },
      {
        path:'index',
        loadComponent:() => import('./index/index.component').then(c => c.IndexComponent)
      },
      {
        path:'qa-index',
        loadComponent:() => import('./qa-index/qa-index.component').then(c => c.QaIndexComponent)
      },
      {
        path:'release',
        loadComponent:() => import('./relesea/relesea.component').then(c => c.ReleseaComponent)
      },
      {
        path:'supervision',
        loadComponent:() => import('./supervision/supervision.component').then(c => c.SupervisionComponent)
      },
      {
        path:'project',
        loadComponent:() => import('./project/project.component').then(c => c.ProjectComponent)
      },
      {
        path:'batch-control',
        loadComponent:() => import('./batch-control/batch-control.component').then(c => c.BatchControlComponent)
      },
      {
        path:'configuration',
        loadComponent:() => import('./configuration/configuration.component').then(c => c.ConfigurationComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: 'site',
  //   pathMatch: 'full'
  // }
];