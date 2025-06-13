import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoName } from '../../../../../../../../models/auto-name';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auto-name',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './auto-name.component.html',
  styleUrl: './auto-name.component.css'
})
export class AutoNameComponent {
  @Input() currentAutoName: string;
  autoName: string;
  autoNames: Array<AutoName> = [];
  autoNameExample = '';
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAutoNameChanges = new EventEmitter();
  autoNameControl: AbstractControl;

  constructor() { }

  ngOnInit() {
    this.addDefaultAutoName();
    this.autoName = this.currentAutoName;
    this.onAutoNameChanges.emit(this.autoName);
  }

  addToAutoName(currentAutoName: AutoName): void {
    const currentAutoNameValue = this.autoNameControl.value + currentAutoName.value;
    this.autoNameControl.setValue(currentAutoNameValue);
    this.refreshAutoNameExample(currentAutoNameValue);
  }

  prepareAutoNameRefreshSubscription(): void {
    const autoNameControl = this.autoNameControl;
    autoNameControl.valueChanges.forEach((value: string) => {
      this.refreshAutoNameExample(value);
    });
  }

  private refreshAutoNameExample(value: string): void {
    this.autoNameExample = value;
    for (const autoName of this.autoNames) {
      const expression = new RegExp(autoName.value, 'g');
      this.autoNameExample = this.autoNameExample.replace(expression, autoName.example);
    }
  }

  private addDefaultAutoName(): void {
    let defaultAutoNameValues = '';
    for (const autoName of this.autoNames) {
      if (autoName.isDefault) {
        defaultAutoNameValues += autoName.value;
      }
    }
    this.autoNameControl.setValue(defaultAutoNameValues);
  }
}
