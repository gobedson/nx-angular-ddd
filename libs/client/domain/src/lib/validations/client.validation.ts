import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validateur pour les emails
 * Format standard d'email
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(control.value) ? null : { email: true };
  };
}

/**
 * Validateur pour les numéros de téléphone français
 * Formats acceptés : +33612345678, 0612345678, etc.
 */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(control.value) ? null : { phone: true };
  };
}

/**
 * Validateur pour les numéros SIREN
 * Format : 9 chiffres
 */
export function sirenValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const sirenRegex = /^[0-9]{9}$/;
    return sirenRegex.test(control.value) ? null : { siren: true };
  };
}

/**
 * Validateur pour les IBAN
 * Format : deux lettres suivies de chiffres et lettres
 */
export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    // Validation basique de format IBAN (un vrai validateur IBAN devrait aussi vérifier la somme de contrôle)
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
    return ibanRegex.test(control.value) ? null : { iban: true };
  };
}

/**
 * Validateur pour les BIC
 * Format : 8 ou 11 caractères (lettres et chiffres)
 */
export function bicValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    return bicRegex.test(control.value) ? null : { bic: true };
  };
}
