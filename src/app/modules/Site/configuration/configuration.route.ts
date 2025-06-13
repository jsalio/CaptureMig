import { Routes } from '@angular/router';
import { WorkflowListComponent } from './sections/workflow/workflow-list/workflow-list.component';
import { WorkflowFormComponent } from './sections/workflow/workflow-form/workflow-form.component';

export const CONFIGURATION_ROUTES: Routes = [
    {
        path:'',
        loadComponent:()=> import ('./configuration.component').then(c => c.ConfigurationComponent),
        children:[
            {
                path:'workflow',
                component:WorkflowListComponent
                // loadComponent:() => import('./sections/workflow/workflow-list/workflow-list.component').then(x => x.WorkflowListComponent)
            },
            {
                path:'workflow-new',
                component: WorkflowFormComponent
                // loadComponent:() => import('./sections/workflow/workflow-form/workflow-form.component').then(x => x.WorkflowFormComponent)
            },
            {
                path:'workflow/:id',
                component:WorkflowFormComponent
                // loadComponent:() => import('./sections/workflow/workflow-form/workflow-form.component').then(x => x.WorkflowFormComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];