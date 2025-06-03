import { Component } from '@angular/core';
import { LayoutComponent } from '../../../shared/layout/layout.component';
import { LayoutService } from '../../../services/layout.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  providers:[LayoutService],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {

}
