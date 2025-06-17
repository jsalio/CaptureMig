import { Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DividerComponent } from '../divider/divider.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { Restriction } from '../../../../../../../../models/Restriction';
import { RestrictionSizeComponent } from '../restriction-size/restriction-size.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-restrictions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TranslateModule, DividerComponent, RestrictionSizeComponent, InputNumberModule],
  templateUrl: './restrictions.component.html',
  styleUrl: './restrictions.component.css'
})
export class RestrictionsComponent {
  isActiveDocumentLimitPerBatch = input<boolean>(false)
  isActivePageLimitPerBatch = input<boolean>(false)
  pageSizePerImageLimitWarning= input<number>(0)
  pageSizePerBatchLimitWarning= input<number>(0)
  pageSizePerImageLimit = input<number>(0)
  pageSizePerBatchLimit = input<number>(0)
  documentLimitPerBatchQuantity = input<number>(0)
  documentLimitPerBatchQuantityWarning = input<number>(0)
  PageLimitPerBatchQuantity = input<number>(0)
  PageLimitPerBatchQuantityWarning = input<number>(0)

  changeDocumentLimitPerBatchVisibility = () =>{}

  changePageLimitPerDocumentVisibility = () => {}

  isFieldInvalid = (field:string) => {}

  setLimitSizePerPage = (event:Restriction) => {}

  setLimitSizePerBatch = (event:Restriction ) => {}

  documentLimitPerBatchChange = (event:Restriction) => {}

  PageLimitPerBatchQuantityChange = (event:Restriction) =>{}
}
