import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComposedBarcodeConfiguration } from '../../../../../../../../models/composed-barcode-configuration';
import { CompoundSplittersAssignments } from '../../../../../../../../models/compound-splitters-assigments';
import { ActivatedRoute } from '@angular/router';
import { PickListModule,PickList } from 'primeng/picklist';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-compound-splitters-configuration',
  standalone: true,
  imports: [PickListModule, CommonModule, TranslateModule],
  templateUrl: './compound-splitters-configuration.component.html',
  styleUrl: './compound-splitters-configuration.component.css'
})
export class CompoundSplittersConfigurationComponent {
  
  /**
   * Current available configuration
   *
   * @type {Array<ComposedBarcodeConfiguration>}
   * @memberof CompoundSplittersConfigurationComponent
   */
  @Input() availableCompoundSplitters: Array<ComposedBarcodeConfiguration> = [];
  /**
   * current configuration applied on current workflow
   *
   * @type {Array<ComposedBarcodeConfiguration>}
   * @memberof CompoundSplittersConfigurationComponent
   */
  @Input() assignedCompoundSplitters: Array<ComposedBarcodeConfiguration> = [];
  /**
   * callback function for emit selection when this is modified or loaded
   *
   * @returns {Array<CompoundSplittersAssignments>} list of configuration
   * @memberof CompoundSplittersConfigurationComponent
   */
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSelectionChange = new EventEmitter<Array<CompoundSplittersAssignments>>();

  availableListItem: Array<{ key: number, name: string }>;
  assignedListItem: Array<{ key: number, name: string }>;
  workflowId: number;

  @ViewChild('compoundSplitterTransferPanel') transferPanel: PickList;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.workflowId = Number(this.route.snapshot.paramMap.get('id'));
    this.availableListItem = this.availableCompoundSplitters.map((x) => ({ key: x.id, name: this.getCompoundSplitterName(x) }));
    this.assignedListItem = this.assignedCompoundSplitters.map((x) => ({ key: x.id, name: this.getCompoundSplitterName(x) }));
    const currentSelection = this.getSelectedAssignedConfiguration();
    this.onSelectionChange.emit(currentSelection);
  }


  /**
   * @deprecated this function is not optimized for use a corrector text format instead use getSelectedAssignedConfiguration function
   *
   * @returns {Array<CompoundSplittersAssignments>}
   * @memberof CompoundSplittersConfigurationComponent
   */
  public getAssignedCompoundSplitters(): Array<CompoundSplittersAssignments> {
    const compoundSplitters = new Array<CompoundSplittersAssignments>();
    this.assignedCompoundSplitters.forEach(compoundSplitter => compoundSplitters
      .push(new CompoundSplittersAssignments(this.workflowId, compoundSplitter.id)));
    return compoundSplitters;
  }

  /**
 * return a list of items that represents a  CompoundSplittersAssignments as key and display name
 *
 * @returns {Array<{key,name}>} Array<key, name>[]
 * @memberof CompoundSplittersConfigurationComponent
 */
  public getSelectedAssignedConfiguration = (): Array<CompoundSplittersAssignments> => {
    return this.assignedListItem.map((x) => new CompoundSplittersAssignments(this.workflowId, x.key));
  }

  // tslint:disable-next-line: variable-name
  resetTransferPanelFilter(_event: any) {
    this.transferPanel.resetFilter();
    const currentSelection = this.getSelectedAssignedConfiguration();
    this.onSelectionChange.emit(currentSelection);
  }

  getCompoundSplitterName(composedBarcodeConfiguration: ComposedBarcodeConfiguration): string {
    const barcodeHandler = composedBarcodeConfiguration.composedBarcodeConfigurationDetails.find(x => x.elementType === 'BarcodeHandler');
    let name = barcodeHandler.example;
    composedBarcodeConfiguration.composedBarcodeConfigurationDetails.forEach((value) => {
      name = name + '|' + value.elementType;
    });

    return name;
  }
}
