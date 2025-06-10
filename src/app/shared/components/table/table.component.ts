import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef, SimpleChange, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
import moment from 'moment';
import { CustomRowComponent } from '../custom-row/custom-row.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

export interface ColumnConfiguration {
  field: string;
  header: string;
  translate?: boolean;
  isDate?: boolean;
  style?: any;
  cellStyle?: any;
  cellStyleClass?: string;
  extra?: {
    containerType?: 'iTag' | 'aTag' | 'none';
    className?: (row: any) => string;
    toolTipText?: (row: any) => string;
  };
}

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TranslateModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    CustomRowComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class SharedTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() tableHeader?: string = "PendingBatches";
  @Input() filterValue: string = "";
  @Input() visible?: boolean;
  @Input() dataSet: any[] = [];
  @Input() cols: Array<ColumnConfiguration> = [];
  @Input() responsive?: boolean = true;
  @Input() rowPerPages?: number = 20;
  @Input() enablePagination?: boolean = true;
  @Input() emptyMessage?: string = "NoRecordFound";
  @Input() enableActionsCols?: boolean = false;
  @Input() actionStyle?: any;
  @Input() actionStyleClass?: any;
  @Input() enableFilter?: boolean = true;
  @Input() displaySelectorOfPagination: boolean = false;

  @Output() onClientSelectRow = new EventEmitter<any>();
  @Output() onValueFilterChange = new EventEmitter<string>();
  @Output() onApplyLocalFilter = new EventEmitter<Array<any>>();

  @ContentChild("actions") actionTemplateRef: TemplateRef<any>;

  @ViewChild("dt") dataTable: Table;
  @ViewChild("filter") filterInput: any;

  filterText = "";
  rowsPerPages: any[] = [];

  constructor(private translate: TranslateService) {
    this.initializeRowsPerPages();
  }

  private initializeRowsPerPages() {
    this.rowsPerPages = [];
    const defaultValue = 20;
    const limit = 100;
    const started = this.rowPerPages === defaultValue ? defaultValue : this.rowPerPages;
    for (let i = started; i <= limit; i += defaultValue) {
      this.rowsPerPages.push({ label: i, value: i });
    }
    this.rowsPerPages = this.rowsPerPages.filter((x) => x.label !== "All");
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    if (changes["visible"]) {
      if (changes["visible"].currentValue) {
        if (document.getElementById("filter") != null) {
          document.getElementById("filter").style.display = "none";
        }
      } else {
        if (document.getElementById("filter") != null) {
          document.getElementById("filter").removeAttribute("style");
        }
      }
    }

    this.rowsPerPages = this.rowsPerPages.filter((x) => x.label !== "All");
    this.rowsPerPages = this.rowsPerPages.filter(
      (x) => x.label !== this.translate.instant("All")
    );
    if (this.dataSet) {
      if (this.dataSet.length !== 0) {
        this.rowsPerPages.push({
          label: this.translate.instant("All"),
          value: this.dataSet.length,
        });
      }
    }
  }

  ngOnInit() {
    this.filterText = this.filterValue;
    if (this.enableActionsCols && !this.cols.some(col => col.field === 'actions')) {
      this.cols.push({ header: "Actions", field: "actions", translate: true });
    }
  }

  ngAfterViewInit(): void {
    this.dataTable.filterGlobal(this.filterValue, "contains");
  }

  onRowSelect = (dataRow: any) => {
    if (this.onClientSelectRow) {
      this.onClientSelectRow.emit(dataRow);
    }
  };

  getAvailableCols = (includeAction?: boolean) => {
    if (!this.cols) return [];
    
    if (includeAction) {
      return this.cols;
    }
    
    return this.cols.filter(col => col.field !== 'actions');
  };

  applyPipe = (
    value: any,
    cellConfig: ColumnConfiguration
  ) => {
    try {
      if (cellConfig.field === "actions") {
        return;
      }
      let _value = "";
      if (!cellConfig.isDate && !cellConfig.translate) {
        _value = value;
      } else {
        if (cellConfig.translate) {
          _value = this.translate.instant(value);
        }
        if (cellConfig.isDate) {
          _value = moment(value).format("M/D/YY, h:mm:ss a");
        }
      }
      return _value;
    } catch {
      return value;
    }
  };

  emitFilterValue = (value: string) => {
    this.onValueFilterChange.emit(value);
  };

  onFilter = (e: any) => {
    if (this.onApplyLocalFilter) {
      this.onApplyLocalFilter.emit(e.filteredValue);
    }
  };
} 