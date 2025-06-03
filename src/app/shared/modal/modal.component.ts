import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, input, OnInit, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkipModalType, SkippableOptionService } from '../../services/skippable-option.service';

type ModalHeaderType = 'default' | 'danger' | 'warning' | 'info' | 'success';
type options = 'Yes/No' | 'Ok/Cancel' | 'Accept/Reject' | 'Apply/Cancel' | 'Accept' | 'Cancel' | 'Custom'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [TranslateService, SkippableOptionService]
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() showDontAskAgain: boolean = false;
  @Input() headerType: ModalHeaderType = 'danger';
  @Input() optionType: options = 'Ok/Cancel';
  @Input() isLoading = false;
  @Input() remenberKey: SkipModalType = ''
  @Input() custom: string = ''


  @Output() accept = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();
  @Output() dontAskAgainChange = new EventEmitter<boolean>();

  @ContentChild('modalContent') content!: TemplateRef<any>;

  dontAskAgain = false;
  displayTwoOptions = true;
  private readonly PREDEFINED_OPTIONS: options[] = ['Accept/Reject', 'Ok/Cancel', 'Yes/No', 'Apply/Cancel'];

  constructor(private readonly cdr: ChangeDetectorRef, private readonly useSkippable: SkippableOptionService) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkOptions(changes)

    if (this.remenberKey) {
      let isChecked = this.useSkippable.isSkippable(this.remenberKey);
      if (isChecked) {
        console.info('skipping modal because is checked');
        this.accept.emit(true);
      }
    }

    this.cdr.detectChanges()
  }

  checkOptions = (changes: SimpleChanges): void => {
    if (!changes['optionType']) return;

    const newOption = changes['optionType'].currentValue;
    const customOption = changes['custom'].currentValue;
    this.displayTwoOptions = this.shouldDisplayTwoOptions(newOption, customOption);
    console.log(this.displayTwoOptions)
  }

  shouldDisplayTwoOptions = (option: options, customText: string): boolean => {
    return this.isPredefinedOption(option) || this.isValidCustomOption(option, customText);
  }

  isPredefinedOption = (option: options): boolean => {
    return this.PREDEFINED_OPTIONS.includes(option);
  }

  isValidCustomOption = (option: string, customText: string): boolean => {
    return option === 'Custom' && customText.includes('/');
  }

  renderOkOption = () => {
    const optionRecord: Record<options, string> = {
      'Yes/No': 'Yes',
      'Ok/Cancel': 'Ok',
      'Accept/Reject': 'AcceptButton',
      'Apply/Cancel': 'Apply',
      'Accept': 'AcceptButton',
      'Cancel': 'Cancel',
      'Custom': this.custom.split('/')[0]
    };
    return optionRecord[this.optionType];
  }

  renderCancelOption = () => {
    const optionRecord: Record<options, string> = {
      'Yes/No': 'No',
      'Ok/Cancel': 'Cancel',
      'Accept/Reject': 'Reject',
      'Accept': 'AcceptButton',
      'Apply/Cancel': 'Cancel',
      'Cancel': 'Cancel',
      'Custom': this.custom.split('/')[1]
    };
    return optionRecord[this.optionType];
  }



  get headerClass(): string {
    return this.headerType === 'default' ? '' : this.headerType;
  }

  onAccept(): void {
    if (this.remenberKey === 'ResetNotificationSkip') {
      this.useSkippable.resetSkipOption();
    }
    this.accept.emit(this.dontAskAgain);
    this.isOpen = false;


  }

  onCancel(): void {
    this.cancel.emit();
    this.isOpen = false;
  }

  onDontAskAgainChange(e: Event): void {
    const isChecked = (e.target as HTMLInputElement).checked
    this.useSkippable.setSkippable(this.remenberKey, isChecked)
  }
}