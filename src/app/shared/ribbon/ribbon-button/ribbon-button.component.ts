import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-ribbon-button',
  standalone: true,
  imports: [CommonModule, TranslateModule, TooltipModule],
  templateUrl: './ribbon-button.component.html',
  styleUrl: './ribbon-button.component.css'
})
export class RibbonButtonComponent {

  label = input<string>('');
  onButtonClick = input<() => void>
  display = input<boolean>(false)
  iconClass = input<string>('')
  tooltip? = input<'right' | 'left' | 'top' | 'bottom'|''>('')
  tooltipText = input<string>('')

  handleRibbonButonClick = () =>{
    this.handleRibbonButonClick()
  }
}
