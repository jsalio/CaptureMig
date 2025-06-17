import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Restriction } from '../../../../../../../../models/Restriction';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-restricction-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, InputNumberModule],
  templateUrl: './restricction-config.component.html',
  styleUrl: './restricction-config.component.css',
})
export class RestricctionConfigComponent implements OnDestroy {
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
  private subscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.restrictionForm = this.fb.group({
      restrictionValue: new FormControl(0, [Validators.required]),
      restrictionActive: new FormControl(false),
      restrictionWarningValue: new FormControl(0, [Validators.required])
    });
  }

  ngOnInit() {
    this.isRestrictionActive = this.limit > 0;
    
    if (this.isRestrictionActive) {
      this.restrictionForm.patchValue({
        restrictionValue: this.limit,
        restrictionActive: true,
        restrictionWarningValue: this.limitWarning
      });
    } else {
      this.restrictionForm.patchValue({
        restrictionValue: 0,
        restrictionActive: false,
        restrictionWarningValue: 0
      });
      this.restrictionForm.get('restrictionValue').disable();
      this.restrictionForm.get('restrictionWarningValue').disable();
    }

    this.subscription = this.restrictionForm.valueChanges.subscribe((values) => {
      const current: Restriction = {
        limit:values['restrictionValue'],
        limitWarning: values['restrictionWarningValue']
      }
      this.emitChanges.emit(current)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  isFieldInvalid = (field: string) => {
    return !this.restrictionForm.get(field).valid && this.restrictionForm.get(field).touched;

  }

  emit = () => {
    const cfg: Restriction = {
      limit: this.restrictionForm.controls['restrictionValue'].value,
      limitWarning: this.restrictionForm.controls['restrictionWarningValue'].value
    }
    this.emitChanges.emit(cfg);
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

  validateChanges = (e:any) => {
    console.log(e)
  }
}
