import { Component, signal } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { RibbonButtonComponent } from '../ribbon-button/ribbon-button.component';
import { RibbonComponent } from "../ribbon.component";
import { Document } from '../../../models/document';
import { Batch } from '../../../models/batch';
import { FormsModule } from '@angular/forms';
import { TwainSource } from '../../../interface/twain-source';
import { ScannerProfile } from '../../../models/scanner-profile';
import { PixelTypeConfiguration } from '../../../models/pixel-type-configuration';

@Component({
  selector: 'app-ribbon-scan',
  standalone: true,
  imports: [SliderComponent, CommonModule,FormsModule, ModalComponent, RibbonButtonComponent, TranslateModule],
  templateUrl: './ribbon-scan.component.html',
  styleUrl: './ribbon-scan.component.css'
})
export class RibbonScanComponent {
  isReadyToWork = signal<boolean>(true)
  canRedigitilize = signal<boolean>(false)
  isRejectedDocumentView= signal<boolean>(false)
  returnedRecognitionMode= signal<boolean>(false)
  canUpdateScannerProfile = signal<boolean>(false)

  currentDocument: Document;
  currentBatch:Batch;
  pagesLength = 0;

  twainSources: TwainSource[] = [];
  selectedTwainSource: TwainSource = null;
  scannerProfiles: ScannerProfile[] = [];
  selectedScannerProfile: ScannerProfile;

  pixelTypes: PixelTypeConfiguration[] = [];
  pixelType: PixelTypeConfiguration;


  newBatch = () => {
    alert('call me')
  }

  digitalizeDocuments =() => {}

  redigitalizeDocument = () => {}

  importPages = () => {}

  sendToRecognition = () => {}

  sendToExceptionQueue = () =>{}

  storeScannerSource() {}

  onChangeScannerProfile() {}

  uniqueScannerProfiles() {
    const uniqueProfile = this.scannerProfiles.filter((scannerProfile, index, self) =>{
      return index === self.findIndex((t) => (
        t.id === scannerProfile.id
      ))
    }).sort((a, b) => (a.name > b.name) ? 1 : -1);

    return uniqueProfile;
  }

  setScannerColorConfiguration = (e:any) => {}

  getPixelTypeIcon(pixel: PixelTypeConfiguration) {
    if (pixel.id === 1) {
      return '/assets/images/ribbon/grayscale.png';
    }
    return pixel.id === 2 ? '/assets/images/ribbon/fullcolor.png' : '/assets/images/ribbon/bw.png';
  }
  
}
