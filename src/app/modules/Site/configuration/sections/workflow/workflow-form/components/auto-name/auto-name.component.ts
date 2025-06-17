import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiConfigurationService } from '../../../../../../../../services/api/configuration.service';
import { AutoName } from '../../../../../../../../models/auto-name';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auto-name',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './auto-name.component.html',
  styleUrl: './auto-name.component.css'
})
export class AutoNameComponent {
  @Input() nameExpression: string;
  @Input() autonameExample: string;

  autoName: string;
  tagNames: Array<AutoName> = [];
  autoNameExample = '';
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAutoNameChanges = new EventEmitter<{nameExpression:string, example:string}>();


  constructor(private readonly configurationService: ApiConfigurationService) { }

  ngOnInit() {
    this.onAutoNameChanges.emit({nameExpression:this.nameExpression,example:''});
    this.configurationService.getAutoNameVariables().then(autoNames => {
      this.tagNames = autoNames;
      this.addDefaultAutoName();
      this.refreshAutoNameExample(this.autonameExample);
    });
  }

  addToAutoName(currentAutoName: AutoName): void {
    const currentAutoNameValue = this.autonameExample + currentAutoName.value;
    this.autonameExample = currentAutoNameValue;
    this.refreshAutoNameExample(currentAutoNameValue);
  }

  private refreshAutoNameExample(tagValue: string): void {
    this.nameExpression = tagValue
    this.autoNameExample = this.nameExpression
    for (const tag of this.tagNames) {
      const ex = new RegExp(tag.value, 'g')
      this.autoNameExample = this.autoNameExample.replaceAll(ex, tag.example)
    }
    this.onAutoNameChanges.emit({nameExpression:this.nameExpression,example:this.autoNameExample})
  }

  private addDefaultAutoName(): void {
    let defaultAutoNameValues = '';
    for (const autoName of this.tagNames) {
      if (autoName.isDefault) {
        defaultAutoNameValues += autoName.value;
      }
    }
    this.autonameExample = defaultAutoNameValues;
  }
}
