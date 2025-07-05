// Base interfaces used when creating clients (without `id`)
export interface CreateIndividualClient {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  // Adresse détaillée
  address: string;
  addressComplement?: string;
  postalCode: string;
  city: string;
  country: string;
  // Informations bancaires
  iban?: string;
  bic?: string;
}

export interface CreateProfessionalClient {
  companyName: string;
  vatNumber: string;
  siren: string;
  contacts: Contact[];
  email: string;
  phone: string;
  // Adresse détaillée
  address: string;
  addressComplement?: string;
  postalCode: string;
  city: string;
  country: string;
  // Informations bancaires
  iban?: string;
  bic?: string;
}

// Interface after creation (includes `id`)
export interface IndividualClient extends CreateIndividualClient {
  id: string;
}

export interface ProfessionalClient extends CreateProfessionalClient {
  id: string;
}

export type CreateClient = CreateIndividualClient | CreateProfessionalClient;

export type Client = IndividualClient | ProfessionalClient;

// Contact interface (used in professional clients)
export interface Contact {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
}
