import { Component, EventEmitter, OnInit, Output, input, output, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DividerComponent } from '../divider/divider.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { Restriction } from '../../../../../../../../models/Restriction';
import { RestrictionSizeComponent } from '../restriction-size/restriction-size.component';
import { TranslateModule } from '@ngx-translate/core';

export type ValueWarn = {
  value: number
  warn: number
  isActive: boolean
}

export type RestrictionConfiguration = {
  DocumentLimit: ValueWarn,
  PageLimit: ValueWarn,
  SizePerBatch: ValueWarn,
  SizePerPage: ValueWarn
}


@Component({
  selector: 'app-restrictions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, DividerComponent, RestrictionSizeComponent, InputNumberModule],
  templateUrl: './restrictions.component.html',
  styleUrl: './restrictions.component.css'
})
export class RestrictionsComponent implements OnInit {
  isActiveDocumentLimitPerBatch = input<boolean>(false)
  documentLimitPerBatchQuantity = input<number>(0)
  documentLimitPerBatchQuantityWarning = input<number>(0)

  isActivePageLimitPerBatch = input<boolean>(false)
  PageLimitPerBatchQuantity = input<number>(0)
  PageLimitPerBatchQuantityWarning = input<number>(0)

  isActivePageSizePerBatch = input<boolean>(false)
  pageSizePerBatchLimit= input<number>(25)
  pageSizePerBatchLimitWarning = input<number>(350)

  isActiveSizePerPage = input<boolean>(true)
  pageSizePerImageLimit = input<number>(25)
  pageSizePerImageWarning = input<number>(350)



  restriction = signal<RestrictionConfiguration | undefined>(undefined)

  ngOnInit(): void {
    this.restriction.set({
      DocumentLimit:{
        isActive:this.isActiveDocumentLimitPerBatch(),
        value:this.documentLimitPerBatchQuantity(),
        warn:this.documentLimitPerBatchQuantityWarning()
      },
      PageLimit:{
        isActive:this.isActivePageLimitPerBatch(),
        value:this.PageLimitPerBatchQuantity(),
        warn:this.PageLimitPerBatchQuantityWarning()
      },
      SizePerBatch:{
        isActive:this.isActivePageSizePerBatch(),
        value:this.pageSizePerBatchLimit(),
        warn:this.pageSizePerBatchLimitWarning()
      },
      SizePerPage:{
        isActive:this.isActiveSizePerPage(),
        value:this.pageSizePerImageLimit(),
        warn:this.pageSizePerImageWarning()
      }
    })
    console.log(this.restriction())
  }

  @Output() onRestrictionChanges = new EventEmitter<{}>()

  changeDocumentLimitPerBatchVisibility = () => { }

  changePageLimitPerDocumentVisibility = () => { }

  isFieldInvalid = (field: string) => { }

  setLimitSizePerPage = (event: Restriction) => {
    this.restriction.update((value) => ({...value, SizePerPage:{
      isActive:this.restriction().SizePerPage.isActive,
      value:event.limit,
      warn: event.limitWarning
    }}))
  }

  setLimitSizePerBatch = (event: Restriction) => { 
    this.restriction.update((value) => ({...value, SizePerBatch:{
      isActive:this.restriction().SizePerBatch.isActive,
      value:event.limit,
      warn: event.limitWarning
    }}))

  }

  documentLimitPerBatchChange = (event: Restriction) => {
    this.restriction.update((value) => ({...value, DocumentLimit:{
      isActive:this.restriction().DocumentLimit.isActive,
      value:event.limit,
      warn: event.limitWarning
    }}))
  }

  PageLimitPerBatchQuantityChange = (event: Restriction) => { 
    this.restriction.update((value) => ({...value, PageLimit:{
      isActive:this.restriction().PageLimit.isActive,
      value:event.limit,
      warn: event.limitWarning
    }}))

  }
}
