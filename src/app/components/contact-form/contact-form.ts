import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomSelect, SelectOption } from './custom-select/custom-select';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CustomSelect],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  private fb = inject(FormBuilder);

  protected submittedSuccessfully = false;

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

  constructor() {
    this.contactForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.hideSuccess());
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
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}