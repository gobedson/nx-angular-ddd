import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFacade } from '@nx-angular-ddd/client/application';
import { CreateClient as CreateClientType } from '@nx-angular-ddd/client/domain';
import { IndividualClientForm } from '../../shared-ui/individual-client-form/individual-client-form';
import { ProfessionalClientForm } from '../../shared-ui/professional-client-form/professional-client-form';

@Component({
  selector: 'nx-angular-ddd-create-client',
  standalone: true,
  imports: [
    CommonModule,
    IndividualClientForm,
    ProfessionalClientForm
  ],
  templateUrl: './create-client.html',
  styleUrls: ['./create-client.scss']
})
export class CreateClient {
  private readonly clientFacade = inject(ClientFacade);

  public isLoading = signal(false);
  
  // Signals
  readonly clientType = signal<'individual' | 'professional'>('individual');
  readonly error = signal<string | null>(null);
  readonly success = signal<boolean>(false);

  // Getters for template
  get isIndividual(): boolean {
    return this.clientType() === 'individual';
  }

  get isProfessional(): boolean {
    return this.clientType() === 'professional';
  }

  setClientType(type: 'individual' | 'professional'): void {
    this.clientType.set(type);
    this.resetState();
  }

  handleSubmit(clientData: CreateClientType): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.clientFacade.addClient(clientData).subscribe({
      next: () => {
        this.success.set(true);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Une erreur est survenue lors de la création du client');
        this.isLoading.set(false);
      }
    });
  }

  resetState(): void {
    this.error.set(null);
    this.success.set(false);
  }
} 