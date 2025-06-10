import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-app-custom-row',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  template: `
    <div *ngIf="containerType === 'aTag'">
       <a [tooltip]="getToolTipText()">
          <span [ngClass]="className">
          </span>
          {{text}}
      </a>
    </div>

    <div *ngIf="containerType === 'iTag'">
        <span class="fa fa-circle c-warning" [ngClass]="className">
        </span>
        {{text}}
    </div>

    <div *ngIf="containerType === 'none'">
      {{text}}
    </div>
  `,
  styles: [``]
})
export class CustomRowComponent {
  @Input() containerType: 'iTag' | 'aTag' | 'none';
  @Input() text: string;
  @Input() className?: string;
  @Input() tooltipText :any //| (data?: any) => string| string;

  getToolTipText = ():string => {
   if (typeof(this.tooltipText) === 'string'){
    return this.tooltipText;
   } else {
    return this.tooltipText()
   }
  }
} 