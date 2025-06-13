import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-tab',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="tab-pane" [class.active]="active" [class.show]="active">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-pane {
      display: block;
      visibility: hidden;
      position: absolute;
      height: 0;
      overflow: hidden;
    }
    .tab-pane.active {
      visibility: visible;
      position: relative;
      height: auto;
      overflow: visible;
    }
  `]
})
export class CustomTabComponent {
  @Input() heading: string;
  @Input() active = false;
}

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomTabComponent],
  template: `
    <div class="custom-tabs">
      <ul class="nav nav-tabs" [class.nav-justified]="justified">
        <li class="nav-item" *ngFor="let tab of tabs" [class.active]="tab.active">
          <a class="nav-link" [class.active]="tab.active" (click)="selectTab(tab)">
            {{ tab.heading | translate }}
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .custom-tabs {
      width: 100%;
    }
    .nav-tabs {
      border-bottom: 1px solid #ddd;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .nav-tabs .nav-item {
      margin-bottom: -1px;
      flex: 0 0 auto;
      margin-right: 2px;
    }
    .nav-tabs .nav-link {
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      cursor: pointer;
      color: #565656;
      padding: 0.5rem 1rem;
      white-space: nowrap;
      text-align: center;
    }
    .nav-tabs .nav-link:hover {
      border-color: #eee #eee #ddd;
    }
    .nav-tabs .nav-link.active {
      color: #555;
      background-color: #fff;
      border: 1px solid #ddd;
      border-bottom-color: transparent;
    }
    .tab-content {
      padding: 1rem 0;
    }
    .nav-tabs.nav-justified {
      display: flex;
      justify-content: flex-start;
      width: 100%;
    }
    .nav-tabs.nav-justified .nav-item {
      flex: 0 0 auto;
    }
    /* Estilo para la barra de desplazamiento */
    .nav-tabs::-webkit-scrollbar {
      height: 6px;
    }
    .nav-tabs::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    .nav-tabs::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }
    .nav-tabs::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `]
})
export class CustomTabsComponent implements AfterContentInit {
  @Input() justified = false;
  @Output() tabChange = new EventEmitter<CustomTabComponent>();
  
  @ContentChildren(CustomTabComponent) tabs: QueryList<CustomTabComponent>;

  ngAfterContentInit() {
    // Activar el primer tab por defecto si no hay ninguno activo
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: CustomTabComponent) {
    // Desactivar todos los tabs
    this.tabs.forEach(t => t.active = false);
    
    // Activar el tab seleccionado
    tab.active = true;
    this.tabChange.emit(tab);
  }
}