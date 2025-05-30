import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.css']
})
export class BlockUIComponent {
  @Input() isBlocked: boolean = false;
  @Input() message: string = 'Loading...';
} 