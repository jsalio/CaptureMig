import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent  implements OnInit, AfterViewChecked {

  constructor() { }

  buttonsOnRibbon = 0;

  ngOnInit() {
    const ribbonScrollContainer = document.getElementById('ribbonScroll');
    function scrollHorizontally(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      ribbonScrollContainer.scrollLeft -= (delta * 40); // Multiplied by 40
      e.preventDefault();
    }
    if (ribbonScrollContainer.addEventListener) {
      // IE9, Chrome, Safari, Opera
      ribbonScrollContainer.addEventListener('mousewheel', scrollHorizontally, false);
      // Firefox
      ribbonScrollContainer.addEventListener('DOMMouseScroll', scrollHorizontally, false);
    }
  }

  public ngAfterViewChecked(): void {
    const isBatchControlPanel = document.getElementById('batchControlPanelRibbon');
    if (!isBatchControlPanel || document.location.pathname !== '/batch-control') {
      const ribbonButtonsOnScreen = document.getElementsByClassName('c-ribbon-btn').length;
      this.buttonsOnRibbon = ribbonButtonsOnScreen;
    } else {
      this.buttonsOnRibbon = 3
    }
  }

  scrollLeft(e) {
    let wrapper = e.srcElement.closest('.controlRibbonWrapper')
    wrapper.querySelector('.batchControlRibbon').scrollLeft -= 200;
  }

  scrollRight(e) {
    let wrapper = e.srcElement.closest('.controlRibbonWrapper');
    wrapper.querySelector('.batchControlRibbon').scrollLeft += 200;
  }


}
