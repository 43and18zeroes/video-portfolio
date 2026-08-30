import {
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  viewChild,
  viewChildren,
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
      multi: true,
    },
  ],
})
export class CustomSelect implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  private readonly triggerEl = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly optionEls = viewChildren<ElementRef<HTMLElement>>('option');

  options = input.required<SelectOption[]>();
  placeholder = input('');
  ariaLabelledBy = input<string>();
  invalid = input(false);

  protected isOpen = signal(false);
  protected value = signal('');
  protected disabled = signal(false);

  /* Roving tabindex: the options carry tabindex="-1" and receive real focus one
     at a time, so a screen reader announces the one being moved to. Deliberately
     not aria-activedescendant, which would need the trigger to be a combobox and
     every option to carry a document-unique id. */
  protected activeIndex = signal(0);

  protected selectedLabel = computed(
    () => this.options().find((option) => option.value === this.value())?.label ?? '',
  );

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    /* The list is created by @if, so it cannot be focused in the same turn the
       menu opens. Reacting to the rendered elements covers both cases with one
       rule: the first render after opening, and every arrow key after that. */
    effect(() => {
      if (!this.isOpen()) {
        return;
      }
      this.optionEls()[this.activeIndex()]?.nativeElement.focus();
    });
  }

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }
    if (this.isOpen()) {
      this.close();
      return;
    }
    this.open();
  }

  protected select(option: SelectOption): void {
    this.value.set(option.value);
    this.isOpen.set(false);
    this.onChange(option.value);
    this.onTouched();
  }

  /* Enter and Space are left to the button's own click handling, so they are not
     listed here - handling them again would toggle the menu twice. */
  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open();
      return;
    }

    if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
    }
  }

  protected onMenuKeydown(event: KeyboardEvent): void {
    const count = this.options().length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((index) => (index + 1) % count);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((index) => (index - 1 + count) % count);
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(0);
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(count - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.select(this.options()[this.activeIndex()]);
        this.triggerEl()?.nativeElement.focus();
        break;
      case 'Escape':
      case 'Tab':
        /* Tab is swallowed rather than passed on: closing removes the focused
           option from the DOM, and the browser would then have nothing to move
           away from. Focus goes back to the trigger, from where Tab works. */
        event.preventDefault();
        this.close();
        break;
    }
  }

  private open(): void {
    const selected = this.options().findIndex((option) => option.value === this.value());
    this.activeIndex.set(selected >= 0 ? selected : 0);
    this.isOpen.set(true);
  }

  private close(): void {
    this.isOpen.set(false);
    this.triggerEl()?.nativeElement.focus();
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
