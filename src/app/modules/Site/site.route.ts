import { Routes } from '@angular/router';

export const SITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./site/site.component').then(m => m.SiteComponent),
    children: [
      {
        path:'dashboard',
        loadComponent:() => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        data: { animation: 'dashboard',ribbon:'RibbonDashboard' }
      },
      {
        path:'scan',
        loadComponent:() => import('./scan/scan.component').then(c => c.ScanComponent),
        data: { animation: 'scan',ribbon:'RibbonScan' }
      },
      {
        path:'scan-exception',
        loadComponent:() => import('./scan-exception/scan-exception.component').then(c => c.ScanExceptionComponent),
        data: { animation: 'scan-exception',ribbon:'RibbonScanException' }
      },
      {
        path:'qa-scan',
        loadComponent:() => import('./qa-scan/qa-scan.component').then(c => c.QaScanComponent),
        data: { animation: 'qa-scan',ribbon:'RibbonQaScan' }
      },
      {
        path:'index',
        loadComponent:() => import('./index/index.component').then(c => c.IndexComponent),
        data: { animation: 'index',ribbon:'RibbonIndex' }
      },
      {
        path:'qa-index',
        loadComponent:() => import('./qa-index/qa-index.component').then(c => c.QaIndexComponent),
        data: { animation: 'qa-index',ribbon:'RibbonQaIndex' }
      },
      {
        path:'release',
        loadComponent:() => import('./relesea/relesea.component').then(c => c.ReleseaComponent),
        data: { animation: 'release',ribbon:'RibbonRelease' }
      },
      {
        path:'supervision',
        loadComponent:() => import('./supervision/supervision.component').then(c => c.SupervisionComponent),
        data: { animation: 'supervision',ribbon:'RibbonSupervision' }
      },
      {
        path:'project',
        loadComponent:() => import('./project/project.component').then(c => c.ProjectComponent),
        data: { animation: 'project' ,ribbon:'RibbonProject'}
      },
      {
        path:'batch-control',
        loadComponent:() => import('./batch-control/batch-control.component').then(c => c.BatchControlComponent),
        data: { animation: 'batch-control',ribbon:'RibbonBatchControl' }
      },
      {
        path:'configuration',
        loadComponent:() => import('./configuration/configuration.component').then(c => c.ConfigurationComponent),
        data: { animation: 'configuration',ribbon:'RibbonConfiguration' }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];