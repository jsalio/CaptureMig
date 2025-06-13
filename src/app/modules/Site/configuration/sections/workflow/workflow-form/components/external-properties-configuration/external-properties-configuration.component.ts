import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ExternalProperty } from '../../../../../../../../models/external-property';
import { ExternalPropertiesAssigments } from '../../../../../../../../models/external-properties-assigments';
import { ActivatedRoute } from '@angular/router';
import { PickList, PickListModule } from 'primeng/picklist';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-external-properties-configuration',
  standalone: true,
  imports: [PickListModule, TranslateModule],
  templateUrl: './external-properties-configuration.component.html',
  styleUrl: './external-properties-configuration.component.css'
})
export class ExternalPropertiesConfigurationComponent {
  @Input() availableExternalProperties: Array<ExternalProperty> = [];
  @Input() assignedExternalProperties: Array<ExternalProperty> = [];
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSelectionChange = new EventEmitter<Array<ExternalPropertiesAssigments>>();
  workflowId: number;
  @ViewChild('externalPropertyTransferPanel') transferPanel: PickList;

  constructor(private route: ActivatedRoute) {
    this.workflowId = Number(this.route.snapshot.paramMap.get('id'));

  }

  ngOnInit() {
    this.onSelectionChange.emit(this.getAssignedExternalProperties());
  }

  public getAssignedExternalProperties(): Array<ExternalPropertiesAssigments> {
    const externalProperties = new Array<ExternalPropertiesAssigments>();
    this.assignedExternalProperties.forEach(externalProperty => externalProperties
      .push(new ExternalPropertiesAssigments(this.workflowId, externalProperty.id)));
    return externalProperties;
  }

  resetTransferPanelFilter(event) {
    this.transferPanel.resetFilter();
    this.onSelectionChange.emit(this.getAssignedExternalProperties());
  }
}
