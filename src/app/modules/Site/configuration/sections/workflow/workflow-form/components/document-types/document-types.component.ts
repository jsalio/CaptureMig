import { Component, Input } from '@angular/core';
import { TransferItem, TransferPanelComponent } from "../../../../../../../../shared/components/transfer-panel/transfer-panel.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { DocumentType } from '../../../../../../../../models/document-types';
import { DocumentTypesStatus } from '../../../../../../../../enums/document-type.enum';
import { PickListModule } from 'primeng/picklist';
import { WorkflowDocumentTypeAssignment } from '../../../../../../../../models/workflow-document-type-assignment';

@Component({
  selector: 'app-document-types',
  standalone: true,
  imports: [CommonModule, PickListModule, TranslateModule, TransferPanelComponent],
  templateUrl: './document-types.component.html',
  styleUrl: './document-types.component.css'
})
export class DocumentTypesComponent {

  @Input() areDocumentTypeLoaded: boolean = true
  @Input() isBtnDefaultVisible: boolean = true
  @Input() documentTypes: Array<WorkflowDocumentTypeAssignment> = [];
  @Input() assignedDocumentTypes: Array<WorkflowDocumentTypeAssignment> = [];
  @Input() currentAssignmentDocumentType: any;
  @Input() currentDefaultDocumentType: DocumentType;

  /**
   *
   */
  constructor(private readonly translate: TranslateService) {

  }

  onTargetSelect(event) {
    if (event.items.length > 1 || event.items.length === 0) {
      this.isBtnDefaultVisible = false;
    } else {
      this.currentAssignmentDocumentType = event.items[0];
      this.isBtnDefaultVisible = true;
    }
  }

  onSetDefaultDocumentType() {
    this.assignedDocumentTypes = this.assignedDocumentTypes.map((documentType) => {
      documentType.isDefault = false;
      return documentType;
    });
    this.currentAssignmentDocumentType.isDefault = true;
    this.currentDefaultDocumentType = this.currentAssignmentDocumentType
  }

  onMoveToSource(event) {
    this.removeDefaultValue();
    if (this.assignedDocumentTypes.length > 0 && !this.isAnyDocumentTypeDefault()) {
      this.assignedDocumentTypes[0].isDefault = true;
    }

    this.isBtnDefaultVisible = false;
  }

  private isAnyDocumentTypeDefault() {
    return this.assignedDocumentTypes.some(documentType => documentType.isDefault);
  }

  onMoveAllToSource(event) {
    this.removeDefaultValue();
    this.isBtnDefaultVisible = false;
  }

  private removeDefaultValue() {
    this.documentTypes = this.documentTypes.map((documentType: any) => {
      documentType.isDefault = false;
      return documentType;
    });
  }

  onMoveToTarget(event) {
    this.setFirstAssignmentToDefault();
  }

  onMoveAllToTarget(event) {
    this.setFirstAssignmentToDefault();
  }

  private setFirstAssignmentToDefault() {
    if (this.assignedDocumentTypes.length > 0 && !this.isAnyDocumentTypeDefault()) {
      this.assignedDocumentTypes[0].isDefault = true;
    }
  }

  getDefaultMessage() {
    const message = this.translate.instant('Default');
    return `[${message}]`;
  }

  getDefaultDocumentType = () => {
    if (this.currentDefaultDocumentType) {
      return this.currentDefaultDocumentType.name;
    } else {
      return this.translate.instant('NotDefaultDocumentSelected');
    }
  }

  filterString = (e:any)=>{
    console.log(e)
  }

  onItemsChanged = (e:any) => {
    console.log(e)
  }

  getText = (e:any) => {
    return e.documentType.name
  }

  onTargetItemSelected = (item: TransferItem): void => {
    if (item['documentTypeId'] === this.currentDefaultDocumentType.id){
      this.isBtnDefaultVisible = false
    } else {
      this.isBtnDefaultVisible = true
      this.currentAssignmentDocumentType = item
    }
  }
}
