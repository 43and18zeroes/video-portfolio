import {
  Component,
  ElementRef,
  HostListener,
  computed,
  forwardRef,
  inject,
  input,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-custom-select',
  imports: [],
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelect),
      multi: true
    }
  ]
})
export class CustomSelect implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  options = input.required<SelectOption[]>();
  placeholder = input('');
  ariaLabelledBy = input<string>();
  invalid = input(false);

  protected isOpen = signal(false);
  protected value = signal('');
  protected disabled = signal(false);

  protected selectedLabel = computed(
    () => this.options().find(option => option.value === this.value())?.label ?? ''
  );

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }
    this.isOpen.update(open => !open);
  }

  protected select(option: SelectOption): void {
    this.value.set(option.value);
    this.isOpen.set(false);
    this.onChange(option.value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}