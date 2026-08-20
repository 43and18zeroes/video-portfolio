import { Component, HostListener, ElementRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private elementRef = inject(ElementRef);

  protected submittedSuccessfully = false;
  protected isDropdownOpen = signal(false);
  protected selectedTopicLabel = signal('');

  protected readonly topicOptions: SelectOption[] = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'shortform', label: 'Shortform' }
  ];

  protected contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    topic: ['', [Validators.required]]
  });

  protected toggleDropdown(): void {
    this.isDropdownOpen.update(open => !open);
  }

  protected selectTopic(option: SelectOption): void {
    this.contactForm.controls.topic.setValue(option.value);
    this.contactForm.controls.topic.markAsTouched();
    this.contactForm.controls.topic.markAsDirty();
    this.selectedTopicLabel.set(option.label);
    this.isDropdownOpen.set(false);
    this.hideSuccess();
  }

  protected hideSuccess(): void {
    if (this.submittedSuccessfully) {
      this.submittedSuccessfully = false;
    }
  }

  protected onSubmit(): void {
    if (this.contactForm.valid) {
      this.submittedSuccessfully = true;
      this.contactForm.reset();
      this.selectedTopicLabel.set('');
      this.isDropdownOpen.set(false);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isDropdownOpen.set(false);
    }
  }
}