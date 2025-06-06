import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../../../../../services/ribbons/configuration.service';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [],
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.css',
})
export class WorkflowListComponent implements OnInit {
  /**
   *
   */
  constructor(private configurationRibbonService: ConfigurationService) {
    
    
  }

  ngOnInit(): void {
    this.configurationRibbonService.emitSetWorkflowAdministrationActive()
  }
}
