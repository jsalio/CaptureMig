import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastNotificationService, ToastType } from '../../../../../../../../services/toast-notification.service';

import { ApiComposeBarcodeConfigurationService } from '../../../../../../../../services/api/api-compose-barcode-configuration.service';
import { ApiPageService } from '../../../../../../../../services/api/api-page.service';
import { BarcodeFormat } from '../../../../../../../../enums/barcode-format.enum';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const MAX_TOLERANCE_LEVEL = 10;
const NUMBER_TWO = 2;
const PERCENTAGE_TO_GROW = 0.1;
const NUMBER_THREE = 3;
const NUMBER_FOUR = 4;

@Component({
  selector: 'app-bar-code-reader',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FileUploadModule, TranslateModule],
  templateUrl: './bar-code-reader.component.html',
  styleUrl: './bar-code-reader.component.css'
})
export class BarCodeReaderComponent {
  isUploading: boolean;
  barcodeImageLoaded = false;
  isBarcodeLoading = false;
  dataLoaded = false;
  fileLoaded = false;
  barcodeFormat = BarcodeFormat;
  base64String = '';
  @Input() advanceConfiguration = false;
  barcodes: any[] = [];
  context: any;
  currentToleranceLevel = 0;
  originalToleranceLevel = 0.0;
  originalBarcodeDimension: any;
  barcodeSelected: any;
  widthCanvas = 500;
  heightCanvas = 500;
  barcodesRectangules: any[] = [];
  @Output() barcodeConfigurationSelected = new EventEmitter<any>();
  @Output() barcodeToleranceChange = new EventEmitter<any>();
  @Output() barcodeChange = new EventEmitter<boolean>();
  @Output() barcodeAdvanceConfigurationSelected = new EventEmitter<any>();
  @Output() unloadData = new EventEmitter<any>();
  @Output() clear = new EventEmitter();
  @Input() createMode = true;
  @Input() separatorMode = false;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('examplePage') examplePageCanvas: ElementRef;
  barcodeFormats: any[] = [];
  composedBarcodeConfigurationForm: FormGroup;
  widthDeterminate: number;
  heightDeterminate: number;
  percentToGrowOnOriginal = 0.1;
  pageWidth: any;
  pageHeight: any;

  constructor(private pageService: ApiPageService,
              private composedBarcodeConfigurationService: ApiComposeBarcodeConfigurationService,
              private formBuilder: FormBuilder,
              private showNotificationService: ToastNotificationService) {

    this.composedBarcodeConfigurationService.getBarcodeFormats().then( (data) => {
      data.forEach(key => {
        this.barcodeFormats.push({ key: key, label: key });
        this.barcodeFormats = [...this.barcodeFormats];
      });
    });
  }


  getToleranceLevel() {
    return this.currentToleranceLevel / MAX_TOLERANCE_LEVEL;
  }

  configureBarcodeData(barcode) {
    this.setAdvanceConfigurationMode(true);

    this.composedBarcodeConfigurationForm.patchValue(barcode);
    this.dataLoaded = true;
  }

  uploadImage(base64String: string, composedBarcodeConfig?: any) {
    this.dataLoaded = true;
    this.isBarcodeLoading = true;
    this.base64String = base64String;

    this.loadExamplePage(base64String);
    if (this.createMode) {
      this.extractBarcodeOfImage(base64String);
    } else {
      const barcodeLocationConfig = composedBarcodeConfig.barcodeLocationAssignations
        ? composedBarcodeConfig.barcodeLocationAssignations[0].barcodeLocationConfiguration
        : composedBarcodeConfig;

      this.pageWidth = barcodeLocationConfig.pageWidth;
      this.pageHeight = barcodeLocationConfig.pageHeight;
      this.widthDeterminate = this.widthCanvas / barcodeLocationConfig.pageWidth;
      this.heightDeterminate = this.heightCanvas / barcodeLocationConfig.pageHeight;
      const dimension =
      this.buildBarcodeDimensionOfBarcodeConfigured(barcodeLocationConfig.positionPoint, barcodeLocationConfig, barcodeLocationConfig);
      dimension.barcodeLocationConfiguration.resultPoints =
      [[barcodeLocationConfig.positionPoint.regionLeft, barcodeLocationConfig.positionPoint.regionTop],
        [barcodeLocationConfig.positionPoint.regionRight, barcodeLocationConfig.positionPoint.regionTop],
        [barcodeLocationConfig.positionPoint.regionRight,  barcodeLocationConfig.positionPoint.regionBottom],
        [barcodeLocationConfig.positionPoint.regionLeft,  barcodeLocationConfig.positionPoint.regionBottom]];

      const constToMoveOriginal = this.getConstToMoveOfOriginalPage(dimension.barcodeLocationConfiguration);
      dimension.barcodeLocationConfiguration = this.calculateResultPoints(dimension.barcodeLocationConfiguration, constToMoveOriginal);

      this.barcodeSelected = dimension;
      this.onBarcodeSelected(this.barcodeSelected);
      this.barcodesRectangules.push(dimension);
    }

  }

  private extractBarcodeOfImage(base64String: string) {
    this.pageService.extractBarcodes(base64String).then((result: any) => {
      this.barcodeImageLoaded = true;
      this.isBarcodeLoading = false;
      this.barcodes = result.barcodeConfigurations;
      this.pageWidth = result.width;
      this.pageHeight = result.height;
      this.widthDeterminate = this.widthCanvas / result.width;
      this.heightDeterminate = this.heightCanvas / result.height;
      this.percentToGrowOnOriginal = this.getValueCalculate(PERCENTAGE_TO_GROW, result.width, this.widthCanvas);

      this.barcodes.forEach(barcodeDimension => {
        barcodeDimension.barcodeLocationConfiguration.resultPoints = barcodeDimension.barcodeLocationConfiguration
        .resultPoints.map((point) => {
          return point.split(', ').map(data => Number(data));
        });
        const positions = barcodeDimension.barcodeLocationConfiguration.resultPoints;
        const dimension = this.buildBarcodeDimensions(positions, barcodeDimension, result);
        this.barcodesRectangules.push(dimension);
      });
    }).catch((error) => {
      this.showNotificationService.show({
        message:'ErrorGettingImageInformation',
        title:'ErrorOccurredDescription',
        options:{}
      }, ToastType.Error)
      // this.showNotificationService.displayErrorNotification('ErrorOccurredDescription', 'ErrorGettingImageInformation');
    });
  }

  private buildBarcodeDimensions(positions: any, barcodeDimension: any, pageResult) {
    return {
      x: positions[0][0] * this.widthDeterminate,
      y: positions[0][1] * this.heightDeterminate,
      width: (positions[1][0] * this.widthDeterminate) - (positions[0][0] * this.widthDeterminate),
      height: (positions[NUMBER_TWO][1] * this.heightDeterminate) - (positions[0][1] * this.heightDeterminate),
      configured: false,
      barcodeFormat: barcodeDimension.barcodeFormat,
      barcodeFormatExternalId: barcodeDimension.barcodeFormatId,
      value: barcodeDimension.value,
      barcodeLocationConfiguration: {
          resultPoints: barcodeDimension.barcodeLocationConfiguration.resultPoints,
          angle: barcodeDimension.barcodeLocationConfiguration.angle,
          pageWidth: pageResult.width,
          pageHeight: pageResult.height,
          moduleSize: barcodeDimension.barcodeLocationConfiguration.moduleSize,
          regionName: barcodeDimension.barcodeLocationConfiguration.regionName,
        }
    };
  }

  private buildBarcodeDimensionOfBarcodeConfigured(position: any, barcodeDimension: any, barcodeLocationConfig) {
    return {
      x: position.regionLeft * this.widthDeterminate,
      y: position.regionTop * this.heightDeterminate,
      width: (position.regionRight * this.widthDeterminate) - (position.regionLeft * this.widthDeterminate),
      height: (position.regionBottom * this.heightDeterminate) - (position.regionTop * this.heightDeterminate),
      configured: true,
      barcodeFormat: barcodeDimension.barcodeFormat,
      barcodeFormatExternalId: barcodeDimension.barcodeFormatExternalId,
      value: barcodeDimension.extractedExampleData,
      barcodeLocationConfiguration: {
          angle: barcodeLocationConfig.angle,
          pageWidth: barcodeDimension.pageWidth,
          pageHeight: barcodeDimension.pageHeight,
          moduleSize: barcodeLocationConfig.moduleSize,
          regionName: barcodeLocationConfig.regionName,
          resultPoints: []
        }
    };
  }

  private drawBarcodeDimensions(dimension: any, color, pastDimension, growTolerance = false) {
    const constWidth = this.originalBarcodeDimension.width * this.getToleranceLevel();
    const constHeight = this.originalBarcodeDimension.height * this.getToleranceLevel();
    const constToMove = constWidth > constHeight ? constWidth : constHeight;
    pastDimension = this.calculateDimension(pastDimension, constToMove);
    if ((pastDimension.x < 0 || (pastDimension.width + pastDimension.x ) > this.widthCanvas) ||
    (pastDimension.y < 0 || (pastDimension.height + pastDimension.y) > this.heightCanvas)) {
      return;
    }

    if (growTolerance) {
      this.originalToleranceLevel = + this.percentToGrowOnOriginal;
    } else {
      this.originalToleranceLevel = - this.percentToGrowOnOriginal;
    }

    dimension = this.calculateDimension(dimension, constToMove);

    this.redrawBarcodePosition(pastDimension, dimension, color);
  }

  private calculateDimension(dimension: any, constToMove: number) {
    const constToMoveOriginal = this.getConstToMoveOfOriginalPage(this.originalBarcodeDimension.barcodeLocationConfiguration);
    dimension.x = this.originalBarcodeDimension.x - (constToMove / NUMBER_TWO);
    dimension.y = this.originalBarcodeDimension.y - (constToMove / NUMBER_TWO);
    dimension.width = this.originalBarcodeDimension.width + constToMove;
    dimension.height = this.originalBarcodeDimension.height + constToMove;

    dimension.barcodeLocationConfiguration = this.calculateResultPoints(dimension.barcodeLocationConfiguration, constToMoveOriginal);
    this.barcodeToleranceChange.emit(dimension.barcodeLocationConfiguration.resultPoints);
    return dimension;
  }

  private getConstToMoveOfOriginalPage(barcodeLocationConfiguration) {
    const constWidthOriginal = barcodeLocationConfiguration.pageWidth * this.getToleranceLevel();
    const constHeightOriginal = barcodeLocationConfiguration.pageHeight * this.getToleranceLevel();
    const constToMoveOriginal = constWidthOriginal > constHeightOriginal ? constHeightOriginal : constWidthOriginal;
    return (constToMoveOriginal / NUMBER_FOUR);
  }

  getValueCalculate(a, c, d) {
    return ((a * d) / c);
  }

  private calculateResultPoints(barcodeLocationConfiguration: any, constToMoveOriginal: number) {
    barcodeLocationConfiguration.resultPoints[0][0] =
      this.getSubtractedConstant(barcodeLocationConfiguration.resultPoints[0][0], constToMoveOriginal);
    barcodeLocationConfiguration.resultPoints[0][1] =
      this.getSubtractedConstant(barcodeLocationConfiguration.resultPoints[0][1], constToMoveOriginal);
    barcodeLocationConfiguration.resultPoints[1][0] =
      this.getConstantAdded(barcodeLocationConfiguration.resultPoints[1][0], constToMoveOriginal,
         this.pageWidth);
    barcodeLocationConfiguration.resultPoints[1][1] =
      this.getSubtractedConstant(barcodeLocationConfiguration.resultPoints[1][1], constToMoveOriginal);
    barcodeLocationConfiguration.resultPoints[NUMBER_TWO][0] =
      this.getConstantAdded(barcodeLocationConfiguration.resultPoints[NUMBER_TWO][0], constToMoveOriginal,
         this.pageWidth);
    barcodeLocationConfiguration.resultPoints[NUMBER_TWO][1] =
      this.getConstantAdded(barcodeLocationConfiguration.resultPoints[NUMBER_TWO][1], constToMoveOriginal,
        this.pageHeight);
    barcodeLocationConfiguration.resultPoints[NUMBER_THREE][0] =
      this.getSubtractedConstant(barcodeLocationConfiguration.resultPoints[NUMBER_THREE][0], constToMoveOriginal);
    barcodeLocationConfiguration.resultPoints[NUMBER_THREE][1] =
      this.getConstantAdded(barcodeLocationConfiguration.resultPoints[NUMBER_THREE][1], constToMoveOriginal,
        this.pageHeight);

    return barcodeLocationConfiguration;
  }

  getConstantAdded(point , constToMove, maxValue) {
    return Math.round(point + (constToMove / NUMBER_TWO)) >= maxValue ? point : Math.round(point + (constToMove / NUMBER_TWO));
  }

  getSubtractedConstant(point , constToMove) {
    return Math.round(point - (constToMove / NUMBER_TWO)) <= 0 ? point : Math.round(point - (constToMove / NUMBER_TWO));
  }

  setAdvanceConfigurationMode(active) {
    if (active) {
      this.buildForm();
      this.composedBarcodeConfigurationForm.controls['barcodeFormat'].setValue(-1);
    }

    this.advanceConfiguration = active;
  }

  configureAdvanceData() {
    const formResult = this.composedBarcodeConfigurationForm.getRawValue();
    const result = {
      value: formResult.extractedDataExample,
      barcodeFormat: formResult.barcodeFormat
    };
    this.dataLoaded = true;
    this.barcodeAdvanceConfigurationSelected.emit(result);
  }

  private buildForm() {
    this.composedBarcodeConfigurationForm = this.formBuilder.group({
      extractedDataExample: new FormControl('', Validators.required),
      barcodeFormat: new FormControl('', Validators.required),
    });
  }

  isBarcodeFormatValid() {
    return this.composedBarcodeConfigurationForm.controls['barcodeFormat'].value !== -1;
  }

  unloadDataEvent() {
    this.dataLoaded = false;
    this.unloadData.emit();
    this.clear.emit();
  }

  restartProcess() {
    this.unloadDataEvent();
    this.advanceConfiguration = false;
    this.barcodesRectangules = [];
    this.barcodes = [];
    this.barcodeSelected = [];
    this.currentToleranceLevel = 0;
    const context = this.examplePageCanvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.widthCanvas, this.heightCanvas);
    this.clear.emit();
  }

  decreaseTolerance() {
    if (this.currentToleranceLevel === 0) {
      this.originalBarcodeDimension = this.buildACopyOfDimensionSelected();
    }

    if (this.currentToleranceLevel > 0) {
      this.currentToleranceLevel -= 1;
    }
    const pastDimension = this.buildACopyOfDimensionSelected();
    this.drawBarcodeDimensions(this.barcodeSelected, '#5b8fdc61', pastDimension);

  }

  private buildACopyOfDimensionSelected() {
    return {
      x: this.barcodeSelected.x,
      y: this.barcodeSelected.y,
      width: this.barcodeSelected.width,
      height: this.barcodeSelected.height,
      value: this.barcodeSelected.value,
      barcodeLocationConfiguration: {
        pageWidth: this.barcodeSelected.barcodeLocationConfiguration.pageWidth,
        pageHeight: this.barcodeSelected.barcodeLocationConfiguration.pageHeight,
        resultPoints: this.barcodeSelected.barcodeLocationConfiguration.resultPoints
      }
    };
  }

  increaseTolerance() {
    if (this.currentToleranceLevel === 0) {
      this.originalBarcodeDimension = this.buildACopyOfDimensionSelected();
    }

    if (this.currentToleranceLevel < MAX_TOLERANCE_LEVEL) {
      this.currentToleranceLevel += 1;
    }
    const pastDimension = this.buildACopyOfDimensionSelected();
    this.drawBarcodeDimensions(this.barcodeSelected, '#5b8fdc61', pastDimension, true);
  }

  validateChangeTolerance() {
    if (this.barcodeSelected.configured) {
      this.showNotificationService.show({
        message:'CannotChangeTheToleranceOfAnBarcodeAlredyConfigured',
        title:'Warning',
        options:{}
      }, ToastType.Warning)
      // this.showNotificationService.displayWarningNotification('Warning', 'CannotChangeTheToleranceOfAnBarcodeAlredyConfigured');
    }
  }

  getElementId(canvas) {
    return `canvas-${canvas.x}-${canvas.y}-${canvas.width}-${canvas.height}`;
  }

  getDeterminanteValue(a: number , b: number, c: number) {
    return ((b * a) / c);
  }

  onBarcodeSelected(configuration) {
    this.barcodeSelected = configuration;
    this.barcodeConfigurationSelected.emit(configuration);
  }

  checkIfBarcodeIsSelected(item) {
    return this.barcodes.indexOf(item) === this.barcodes.indexOf(this.barcodeSelected);
  }

  clearFile() {
    this.fileLoaded = false;
    this.dataLoaded = false;
    this.createMode = true;
    this.clear.emit();
    this.fileUpload.clear();
  }

  onUpload(event) {
    this.isUploading = true;
    const self = this;
    this.barcodesRectangules = [];
    this.uploadingExamplePage(event, self);
    this.fileLoaded = true;
  }

  loadExamplePage(base64String: string) {
    this.context = this.examplePageCanvas.nativeElement.getContext('2d');
    const image = new Image();
    const seft = this;
    image.onload = function() {
      seft.context.drawImage(image, 0, 0, seft.widthCanvas, seft.heightCanvas);
    };
    image.src = 'data:image/png;base64, ' + base64String;
    this.context.save();
  }

  drawBarcodePosition(dimension, color) {
    const elementId = this.getElementId(dimension);
    const canvas: any = document.getElementById(elementId);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, dimension.width, dimension.height);
    context.beginPath();
    context.fillStyle = color;
    context.rect(0, 0, dimension.width, dimension.height);
    context.closePath();
    context.fill();
  }

  redrawBarcodePosition(originalDimension, dimension , color) {
    const elementId = this.getElementId(originalDimension);
    const canvas: any = document.getElementById(elementId);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, dimension.width, dimension.height);
    context.beginPath();
    context.fillStyle = color;
    context.rect(0, 0, dimension.width, dimension.height);
    context.closePath();
    context.fill();
  }

  private uploadingExamplePage(event: any, self: this) {
    this.buildCreatePageModels(event, self)
      .reduce((accumulate, next) => {
        return accumulate.then(arr => {
          return next.then(p => {
            return [...arr, p];
          });
        });
      }, Promise.resolve([]))
      .then((base64String: string[]) => {
        this.uploadImage(base64String[0]);
      }).catch((error: Error) => {
        this.showNotificationService.show({
          message:error.message,
          title:'ErrorOccurredDescription',
          options:{}
        }, ToastType.Error)
        // this.showNotificationService.displayErrorNotification('ErrorOccurredDescription', error.message);
      });
  }

  collides(myRect, x, y) {
    let isCollision = false;
    for (let i = 0, len = myRect.length; i < len; i++) {
      const left = myRect[i].x, right = myRect[i].x + myRect[i].width;
      const top = myRect[i].y, bottom = myRect[i].y + myRect[i].height;

      if ((left + right) >= x && left <= x && (top + bottom) >= y && top <= y) {
          isCollision = true;
          return myRect[i];
      }
    }
    return undefined;
  }

  onCanvasClick(barcodeRectangule) {
    if (this.barcodeSelected &&
      this.getElementId(this.barcodeSelected) !== this.getElementId(barcodeRectangule)
      && this.currentToleranceLevel > 0) {
      if (this.barcodeSelected.configured) {
        const index = this.barcodesRectangules.indexOf(this.barcodeSelected);
        this.barcodesRectangules[index] = this.barcodeSelected;
      }
      this.cleanDimension(this.barcodeSelected);
      this.currentToleranceLevel = 0;
      const pastDimension = this.buildACopyOfDimensionSelected();
      this.drawBarcodeDimensions(this.barcodeSelected, '#87878852', pastDimension);
    }

    this.onBarcodeSelected(barcodeRectangule);
    this.barcodeChange.emit(true);
    this.barcodesRectangules.filter(dimension => !(dimension.x === barcodeRectangule.x  && dimension.y === barcodeRectangule.y
      && dimension.width === barcodeRectangule.width && dimension.height === barcodeRectangule.height))
    .forEach( (dimension) => this.drawBarcodePosition(dimension, dimension.configured ?  '#00ff2247' : '#87878852'));

    this.drawBarcodePosition(barcodeRectangule, '#5b8fdc61');
  }

  getColor(canvas) {
    return this.barcodeSelected && this.getElementId(this.barcodeSelected) === this.getElementId(canvas)
    ? canvas.configured ? '#00ff2247' : '#5b8fdc61'
    : '#87878852';
  }

  cleanDimension(dimension) {
    const elementId = this.getElementId(dimension);
    const canvas: any = document.getElementById(elementId);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, dimension.width, dimension.height);
  }

  markAsConfigured(barcodeRectangule) {
    if (this.advanceConfiguration) {
      this.unloadDataEvent();
      return;
    }

    this.barcodeSelected.configured = true;
    const index = this.barcodesRectangules.indexOf(barcodeRectangule);
    this.barcodesRectangules[index].configured = true;
    this.drawBarcodePosition(barcodeRectangule, '#00ff2247');
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  private buildCreatePageModels(event: any, self: this) {
    return event.files
      .map((element, pageOrder) => {
        const imageUrl = element.objectURL.changingThisBreaksApplicationSecurity;
        return this.toDataURL(imageUrl).then(dataUrl => {
          dataUrl = dataUrl.substring(dataUrl.indexOf(',') + 1);
          return dataUrl;
        }).catch(() => {
          throw new Error('GettingBase64ImageError');
        });
      });
  }

  toDataURL(url): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function () {
        reject('GettingBase64ImageError');
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }
}
