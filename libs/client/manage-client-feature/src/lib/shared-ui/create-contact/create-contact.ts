import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact, emailValidator, phoneValidator } from '@nx-angular-ddd/client/domain';

@Component({
  selector: 'nx-angular-ddd-create-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-contact.html',
  styleUrls: ['./create-contact.scss']
})
export class CreateContact {


  index = input(0);
  showDeleteButton = input(false);


  @Output() saveContact = new EventEmitter<Contact>();
  @Output() cancelContact = new EventEmitter<void>();
  @Output() deleteContact = new EventEmitter<number>();

  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, emailValidator()]],
      phone: ['', [Validators.required, phoneValidator()]],
      role: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get firstname() { return this.contactForm.get('firstname'); }
  get lastname() { return this.contactForm.get('lastname'); }
  get email() { return this.contactForm.get('email'); }
  get phone() { return this.contactForm.get('phone'); }
  get role() { return this.contactForm.get('role'); }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }
    
    this.saveContact.emit(this.contactForm.value);
    this.contactForm.reset();
  }

  onCancel(): void {
    this.cancelContact.emit();
  }

  onDelete(): void {
    this.deleteContact.emit(this.index());
  }

  // Marquer tous les champs comme touchés pour afficher les erreurs
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
} 