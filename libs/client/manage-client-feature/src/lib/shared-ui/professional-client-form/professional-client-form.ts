import { Component, input, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact, CreateProfessionalClient} from '@nx-angular-ddd/client/domain';
import {sirenValidator, emailValidator, phoneValidator, bicValidator, ibanValidator} from '@nx-angular-ddd/client/application'
import { CreateContact } from '../create-contact/create-contact';

@Component({
  selector: 'nx-angular-ddd-professional-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CreateContact],
  templateUrl: './professional-client-form.html',
  styleUrls: ['./professional-client-form.scss']
})
export class ProfessionalClientForm {
  private fb = inject(FormBuilder);
  
   isLoading = input(false);
   formSubmit = output<CreateProfessionalClient>();
  
  countries = [
    { code: 'FR', name: 'France' },
    { code: 'BE', name: 'Belgique' },
    { code: 'CH', name: 'Suisse' },
    { code: 'DE', name: 'Allemagne' },
    { code: 'ES', name: 'Espagne' },
    { code: 'IT', name: 'Italie' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'NL', name: 'Pays-Bas' },
    { code: 'UK', name: 'Royaume-Uni' }
  ];
  

  showContactForm = signal(false);

  contacts = signal<Contact[]>([]);
  
  form: FormGroup = this.fb.group({
    companyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    vatNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9A-Z]+$/)]],
    siren: ['', [Validators.required, sirenValidator()]],
    email: ['', [Validators.required, emailValidator()]],
    phone: ['', [Validators.required, phoneValidator()]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    addressComplement: [''],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    country: ['FR', Validators.required],
    iban: ['', [ibanValidator()]],
    bic: ['', [bicValidator()]],
  });
  
  
  get companyName() { return this.form.get('companyName'); }
  get vatNumber() { return this.form.get('vatNumber'); }
  get siren() { return this.form.get('siren'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get address() { return this.form.get('address'); }
  get addressComplement() { return this.form.get('addressComplement'); }
  get postalCode() { return this.form.get('postalCode'); }
  get city() { return this.form.get('city'); }
  get country() { return this.form.get('country'); }
  get iban() { return this.form.get('iban'); }
  get bic() { return this.form.get('bic'); }
  
  // Gestion des contacts
  addNewContact(): void {
    this.showContactForm.set(true);
  }
  
  handleSaveContact(contact: Contact): void {
    this.contacts.update(currentContacts => [...currentContacts, contact]);
    this.showContactForm.set(false);
  }
  
  handleCancelContact(): void {
    this.showContactForm.set(false);
  }
  
  handleDeleteContact(index: number): void {
    this.contacts.update(currentContacts => 
      currentContacts.filter((_, i) => i !== index)
    );
  }
  
  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }
    
    if (this.contacts().length === 0) {
      // Notification ou alerte pour indiquer qu'au moins un contact est requis
      alert("Veuillez ajouter au moins un contact");
      return;
    }
    
    const formValue = this.form.value;
    const clientData: CreateProfessionalClient = {
      ...formValue,
      contacts: this.contacts()
    };
    
    this.formSubmit.emit(clientData);
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
  
  resetForm(): void {
    this.form.reset({
      country: 'FR'
    });
    this.contacts.set([]);
    this.showContactForm.set(false);
  }
} 