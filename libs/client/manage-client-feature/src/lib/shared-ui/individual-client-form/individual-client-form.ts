import { Component, input, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateIndividualClient } from '@nx-angular-ddd/client/domain';
import { emailValidator, phoneValidator, bicValidator, ibanValidator} from '@nx-angular-ddd/client/application'

@Component({
  selector: 'nx-angular-ddd-individual-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './individual-client-form.html',
  styleUrls: ['./individual-client-form.scss']
})
export class IndividualClientForm {
  private fb = inject(FormBuilder);
  
  isLoading = input(false);

 formSubmit = output<CreateIndividualClient>();
  
  // Liste des pays pour le sélecteur
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
  
  form: FormGroup = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
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
  
  // Getters pour faciliter l'accès aux contrôles dans le template
  get firstname() { return this.form.get('firstname'); }
  get lastname() { return this.form.get('lastname'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get address() { return this.form.get('address'); }
  get addressComplement() { return this.form.get('addressComplement'); }
  get postalCode() { return this.form.get('postalCode'); }
  get city() { return this.form.get('city'); }
  get country() { return this.form.get('country'); }
  get iban() { return this.form.get('iban'); }
  get bic() { return this.form.get('bic'); }
  
  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }
    
    const clientData: CreateIndividualClient = this.form.value;
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
  }
} 