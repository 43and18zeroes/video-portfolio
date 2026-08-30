import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomSelect, SelectOption } from './custom-select/custom-select';
import { I18nService } from '../../i18n/i18n';
import { LEGAL_DATA } from '../../private-data.config';

/* The message runs twelve German words, which is about four seconds at a slow
   reading pace, plus the entry animation. Anything beyond that is dead time,
   because the toast covers the first two fields - it hides the very inputs it is
   asking to correct. */
const ERROR_VISIBLE_MS = 4500;

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CustomSelect],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly t = inject(I18nService).t;

  /* Same source as the imprint, so the address cannot drift between the two */
  protected readonly legal = LEGAL_DATA;

  private readonly endpoint = 'https://portfolio.cwgermany.de/send_mail/send_mail.php';

  /* Signals rather than plain fields: the app runs zoneless, so a value changed
     from a timer or after an await would not repaint on its own. */
  protected readonly submittedSuccessfully = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal(false);

  private errorTimeout?: ReturnType<typeof setTimeout>;

  /* Handed to the toast as a CSS custom property so the draining bar and the
     timer cannot drift apart. */
  protected readonly errorVisibleMs = ERROR_VISIBLE_MS;

  /* Only the labels are localised. The submitted values stay as they are, so the
     mail endpoint keeps receiving what it already expects. */
  protected readonly topicOptions = computed<SelectOption[]>(() => {
    const options = this.t().contactForm.topic.options;

    return [
      { value: 'youtube', label: options.youtube },
      { value: 'shortform', label: options.shortform },
      { value: 'sonstiges', label: options.other },
    ];
  });

  protected contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
    ],
    topic: ['', [Validators.required]],
  });

  constructor() {
    /* Editing clears the error early - it is asking for a correction, and once one
       is under way the message has done its job. The success message is deliberately
       not cleared here: it stays until the page is reloaded. */
    this.contactForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.dismissError());
    this.destroyRef.onDestroy(() => clearTimeout(this.errorTimeout));
  }

  /* Only the error is dismissed on a timer. The success message stays: the form
     is disabled afterwards, so there is nothing underneath left to reach. */
  private dismissError(): void {
    clearTimeout(this.errorTimeout);
    this.submitError.set(false);
  }

  protected async onSubmit(): Promise<void> {
    if (this.contactForm.invalid || this.submittedSuccessfully()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, topic } = this.contactForm.getRawValue();

    const fd = new FormData();
    fd.append('name', name);
    fd.append('mail', email);
    fd.append('message', topic);

    this.isSubmitting.set(true);
    this.dismissError();
    this.contactForm.disable({ emitEvent: false });

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        body: fd,
      });

      this.submittedSuccessfully.set(true);
      this.contactForm.reset({}, { emitEvent: false });
    } catch {
      this.submitError.set(true);
      this.contactForm.enable({ emitEvent: false });

      /* The toast sits over the first two fields, so leaving it up would block
         the very correction it asks for. */
      this.errorTimeout = setTimeout(() => this.submitError.set(false), ERROR_VISIBLE_MS);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
