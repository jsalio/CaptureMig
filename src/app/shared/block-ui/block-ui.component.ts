import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-block-ui',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.css']
})
export class BlockUIComponent {
  @Input() isBlocked: boolean = false;
  @Input() message: string = 'Loading...';
} 