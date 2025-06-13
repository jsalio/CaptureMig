import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WorkflowSpecialPermissions } from '../../../../../../../../interface/workflow-special-permissions';
import { Utils } from '../../../../../../../../shared/utils/Utils';

@Component({
  selector: 'app-special-permission',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './special-permission.component.html',
  styleUrl: './special-permission.component.css'
})
export class SpecialPermissionComponent implements OnInit {
  specialPermissionsForm: FormGroup;
  @Input() specialPermissions: string;
  @Input() editMode: boolean;
  specialPermissionObj:WorkflowSpecialPermissions|{} ={}

  constructor(private specialAccessFb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.editMode && this.specialPermissions) {
      const permissions = this.setPermissions(this.specialPermissions);
      this.specialPermissionsForm.patchValue(permissions);
    }
  }

  setPermissions(stringPermissions: string): WorkflowSpecialPermissions {
    const permissions = this.validateStringPermissionEmpty(stringPermissions);
    return Object.assign(this.getDefaultPermissions(), permissions);
  }

  private validateStringPermissionEmpty(stringPermitions: string) {
    const permission = Utils.castToPermissions(this.validate(stringPermitions))
    this.specialPermissionObj = permission
    return permission;
  }

  private validate(permissions: string) {
    return (permissions === undefined || permissions === '') ? '{}'
      : permissions;
  }

  getDefaultPermissions(): WorkflowSpecialPermissions {
    return {
      deletePageIndex: false,
      deletePageQaIndex: false,
      deletePageQaScan: false,
      deletePageScan: false,
      deletePageInIndexSupervision: false,
      approveAllDocumentsQaScan: false,
      approveAllDocumentsQaIndex: false,
      deleteDocuments: false,
      ignoreDefaultDocumentType: false
    };
  }

  private buildForm() {
    this.specialPermissionsForm = this.specialAccessFb.group({
      deletePageScan: new FormControl(false),
      deletePageQaScan: new FormControl(false),
      deletePageIndex: new FormControl(false),
      deletePageQaIndex: new FormControl(false),
      deletePageInIndexSupervision: new FormControl(false),
      approveAllDocumentsQaScan: new FormControl(false),
      approveAllDocumentsQaIndex: new FormControl(false),
      deleteDocuments: new FormControl(false),
      ignoreDefaultDocumentType: new FormControl(false)
    });
  }

  public getSpecialPermissions(): string {
    return JSON.stringify(this.specialPermissionsForm.getRawValue());
  }
}
