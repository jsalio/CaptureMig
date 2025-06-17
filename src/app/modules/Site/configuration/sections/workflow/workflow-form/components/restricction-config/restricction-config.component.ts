import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Restriction } from '../../../../../../../../models/Restriction';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-restricction-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, InputNumberModule],
  templateUrl: './restricction-config.component.html',
  styleUrl: './restricction-config.component.css'
})
export class RestricctionConfigComponent {
  isRestrictionActive = false;
  restrictionForm: FormGroup;
  @Output() emitChanges = new EventEmitter<Restriction>();
  @Input() limit: number;
  @Input() limitWarning: number;
  @Input() limitStartAt: number;
  @Input() limitEndAt: number;
  @Input() limitWarningStartAt: number;
  @Input() limitWarningEndAt: number;
  @Input() restrictionName: string;
  @Input() warningLimitLabel: string;
  @Input() limitLabel: string;
  @Input() extraLabel?: {
    warning?: string;
    limit?: string;
  };

  constructor(private fb: FormBuilder) {
    this.restrictionForm = this.fb.group({
      restrictionValue: new FormControl(this.limit, [
        Validators.required,
        // Validators.min(this.limitStartAt),
        // Validators.max(this.limitEndAt)
      ]),
      restrictionActive: new FormControl(this.limit > 0),
      restrictionWarningValue: new FormControl(this.limitWarning, [
        Validators.required,
      //   Validators.min(this.limitWarningStartAt),
      //   Validators.max(this.limitWarningEndAt)
      ])
    })
  }


  ngOnInit() {
    console.log(this.extraLabel);
    this.isRestrictionActive = this.limit > 0;
    ;
  }

  isFieldInvalid = (field: string) => {
    return !this.restrictionForm.get(field).valid && this.restrictionForm.get(field).touched;

  }

  emit = () => {
    // const cfg: Restriction = {
    //   limit: this.restrictionForm.controls['restrictionValue'].value,
    //   limitWarning: this.restrictionForm.controls['restrictionWarningValue'].value
    // }
    // this.emitChanges.emit(cfg);
  }

  updateRestrictionVisibility() {
    this.isRestrictionActive = !this.isRestrictionActive;

    if (this.isRestrictionActive) {
      this.restrictionForm.controls['restrictionValue'].enable();
      this.restrictionForm.controls['restrictionValue'].setValue(this.limitStartAt);
      this.restrictionForm.controls['restrictionWarningValue'].enable();
      this.restrictionForm.controls['restrictionWarningValue'].setValue(this.limitWarningStartAt);
    } else {
      this.restrictionForm.controls['restrictionWarningValue'].disable();
      this.restrictionForm.controls['restrictionWarningValue'].setValue(0);

      this.restrictionForm.controls['restrictionValue'].disable();
      this.restrictionForm.controls['restrictionValue'].setValue(0);
    }
    const cfg: Restriction = {
      limit: this.restrictionForm.controls['restrictionValue'].value,
      limitWarning: this.restrictionForm.controls['restrictionWarningValue'].value
    }
    this.emitChanges.emit(cfg);
  }
}
