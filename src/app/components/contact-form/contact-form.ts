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

  private readonly endpoint = 'https://portfolio.cwgermany.de/send_mail/send_mail.php';

  protected submittedSuccessfully = false;
  protected isSubmitting = false;
  protected submitError = false;

  protected readonly topicOptions: SelectOption[] = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'shortform', label: 'Shortform' },
    { value: 'sonstiges', label: 'Sonstiges' }
  ];

  protected contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    topic: ['', [Validators.required]]
  });

  constructor() {
    this.contactForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.resetStatus());
  }

  protected resetStatus(): void {
    if (this.submittedSuccessfully) {
      this.submittedSuccessfully = false;
    }
    if (this.submitError) {
      this.submitError = false;
    }
  }

  protected async onSubmit(): Promise<void> {
    if (this.contactForm.invalid || this.submittedSuccessfully) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, topic } = this.contactForm.getRawValue();

    const fd = new FormData();
    fd.append('name', name);
    fd.append('mail', email);
    fd.append('message', topic);

    this.isSubmitting = true;
    this.submitError = false;
    this.contactForm.disable({ emitEvent: false });

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        body: fd
      });

      this.submittedSuccessfully = true;
      this.contactForm.reset({}, { emitEvent: false });
    } catch {
      this.submitError = true;
      this.contactForm.enable({ emitEvent: false });
    } finally {
      this.isSubmitting = false;
    }
  }
}