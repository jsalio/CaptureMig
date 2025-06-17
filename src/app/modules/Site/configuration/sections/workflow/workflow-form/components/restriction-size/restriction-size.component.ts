import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RestricctionConfigComponent } from "../restricction-config/restricction-config.component";
import { Restriction } from '../../../../../../../../models/Restriction';

@Component({
  selector: 'app-restriction-size',
  standalone: true,
  imports: [RestricctionConfigComponent],
  templateUrl: './restriction-size.component.html',
  styleUrl: './restriction-size.component.css'
})
export class RestrictionSizeComponent implements OnInit {
  @Input() pageSizeLimit: number;
  @Input() pageSizeLimitWarning: number;
  @Input() labelField: string;
  limitOfKiloBytes = 1024;
  extraData = {
    warning: 'KB',
    limit: 'KB'
  };

  // tslint:disable-next-line: no-empty
  constructor() { }

  ngOnInit(): void {
    console.log(this)
  }

  @Output() emitChanges = new EventEmitter<Restriction>();
  measureUnit: 'KB' | 'KB(MB)' | 'GB' = 'KB';

  emit = (e: Restriction) => {
    if (e.limit >= this.limitOfKiloBytes) {
      this.extraData.limit = 'KB(MB)';
    }
    if (e.limitWarning >= this.limitOfKiloBytes) {
      this.extraData.warning = 'KB(MB)';
    }
    this.emitChanges.emit(e);
  }
}
