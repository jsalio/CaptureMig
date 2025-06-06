import { Routes } from '@angular/router';

export const CONFIGURATION_ROUTES: Routes = [
    {
        path:'',
        loadComponent:()=> import ('./configuration.component').then(c => c.ConfigurationComponent),
        children:[
            {
                path:'workflow',
                loadComponent:() => import('./sections/workflow-list/workflow-list.component').then(x => x.WorkflowListComponent)
            },
            {
                path:'workflow-new',
                loadComponent:() => import('./sections/workflow-form/workflow-form.component').then(x => x.WorkflowFormComponent)
            },
            {
                path:'worlflow/:id',
                loadComponent:() => import('./sections/workflow-form/workflow-form.component').then(x => x.WorkflowFormComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
];