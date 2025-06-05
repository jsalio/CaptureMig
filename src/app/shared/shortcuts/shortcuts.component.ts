import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-shortcuts',
  standalone: true,
  imports: [AccordionModule, TableModule, TranslateModule],
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.css'
})
export class ShortcutsComponent {
 

  indexShortcuts: {action: string; key: string}[] = [
    { action: 'IndexDescription', key: 'Shift + i' },
    { action: 'RejectDescription', key: 'Shift + r' },
    { action: 'AppendDescription', key: 'Shift + p' },
    { action: 'SkipDocument', key: 'Shift + k' },
    { action: 'NextDocument', key: 'Shift + d' },
    { action: 'PreviousDocument', key: 'Shift + a' },
    { action: 'Suspend', key: 'Alt + s' }];
  
    scanShortcuts: {action: string; key: string}[] = [
    { action: 'DigitalizeDocument', key: 'Shift + e' },
    { action: 'Suspend', key: 'Alt + s' },
    { action: 'SendRecognition', key: 'Shift + r' }];
  
    documentViewerShortcuts: {action: string; key: string}[] = [
    { action: 'DeletePageTitle', key: 'Alt + q' },
    { action: 'ZoomImageIn', key: 'Alt + m' },
    { action: 'ZoomImageOut', key: 'Alt + n' },
    { action: 'SelectAllPages', key: 'Alt + a' },
    { action: 'UnselectAllPages', key: 'Alt + d' },
    { action: 'SelectOrUnselectPage', key: 'Alt + x' },
    { action: 'PreviousPage', key: 'Alt + z' },
    { action: 'NextPage', key: 'Alt + c' },
    { action: 'ResetImage', key: 'Alt + r' },
    { action: 'FullWidthImage', key: 'Alt + f' }];
    

}