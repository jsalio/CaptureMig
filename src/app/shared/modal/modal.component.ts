import { Component, Output, EventEmitter, ContentChild, TemplateRef, signal, computed, effect, input } from '@angular/core';
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
export class ModalComponent {

  isOpen = input<boolean> (false);
  title = input<string>('');
  showDontAskAgain = input<boolean> (false);
  headerType = input<ModalHeaderType>('danger');
  optionType = input<options>('Ok/Cancel');
  isLoading = input<boolean> (false);
  remenberKey = input<SkipModalType>('');
  custom = input<string> ('');

  @Output() accept = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();
  @Output() dontAskAgainChange = new EventEmitter<boolean>();
  @Output() onCloseModal = new EventEmitter<boolean>()

  @ContentChild('modalContent') content!: TemplateRef<any>;

  dontAskAgain = signal(false);
  displayTwoOptions = signal(true);
  private readonly PREDEFINED_OPTIONS: options[] = ['Accept/Reject', 'Ok/Cancel', 'Yes/No', 'Apply/Cancel'];

  headerClass = computed(() => 
    this.headerType() === 'default' ? '' : this.headerType()
  );

  constructor(private readonly useSkippable: SkippableOptionService) {

    effect(() => {
      const currentOption = this.optionType();
      const customOption = this.custom();
      this.displayTwoOptions.set(this.shouldDisplayTwoOptions(currentOption, customOption));
    }, { allowSignalWrites: true });

    effect(() => {
      const key = this.remenberKey();
      if (key) {
        const isChecked = this.useSkippable.isSkippable(key);
        if (isChecked) {
          console.info('skipping modal because is checked');
          this.accept.emit(true);
        }
      }
    }, { allowSignalWrites: true });
  }

  private shouldDisplayTwoOptions(option: options, customText: string): boolean {
    return this.isPredefinedOption(option) || this.isValidCustomOption(option, customText);
  }

  private isPredefinedOption(option: options): boolean {
    return this.PREDEFINED_OPTIONS.includes(option);
  }

  private isValidCustomOption(option: string, customText: string): boolean {
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
      'Custom': this.custom().split('/')[0]
    };
    return optionRecord[this.optionType()];
  }

  renderCancelOption = () => {
    const optionRecord: Record<options, string> = {
      'Yes/No': 'No',
      'Ok/Cancel': 'Cancel',
      'Accept/Reject': 'Reject',
      'Accept': 'AcceptButton',
      'Apply/Cancel': 'Cancel',
      'Cancel': 'Cancel',
      'Custom': this.custom().split('/')[1]
    };
    return optionRecord[this.optionType()];
  }

  onAccept(): void {
    if (this.remenberKey() === 'ResetNotificationSkip') {
      this.useSkippable.resetSkipOption();
    }
    this.accept.emit(this.dontAskAgain());
    // this.isOpen.set(false);
    this.onCloseModal.emit(true)
  }

  onCancel(): void {
    this.cancel.emit();
    this.onCloseModal.emit(true)
    // this.isOpen.set(false);
  }

  onDontAskAgainChange(e: Event): void {
    const isChecked = (e.target as HTMLInputElement).checked;
    this.useSkippable.setSkippable(this.remenberKey(), isChecked);
    this.dontAskAgain.set(isChecked);
  }
}