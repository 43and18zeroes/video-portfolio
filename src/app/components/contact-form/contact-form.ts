import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {

  private fb = inject(FormBuilder);

  submittedSuccessfully = false;

  private readonly emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  contactForm = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]
    ],

    topic: [
      '',
      Validators.required
    ]
  });

  onSubmit(): void {
    this.submittedSuccessfully = false;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log(
      'Formulardaten:',
      this.contactForm.getRawValue()
    );

    this.submittedSuccessfully = true;
  }

  hideSuccess(): void {
    this.submittedSuccessfully = false;
  }
}