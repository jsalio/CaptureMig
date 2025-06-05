import { Component } from '@angular/core';
import { LayoutComponent } from '../../../shared/layout/layout.component';
import { LayoutService } from '../../../services/layout.service';
import { RouterOutlet } from '@angular/router';
import {routeTransitionAnimations} from '../../../animations'

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  providers:[LayoutService],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css',
  animations:[routeTransitionAnimations]
})
export class SiteComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
