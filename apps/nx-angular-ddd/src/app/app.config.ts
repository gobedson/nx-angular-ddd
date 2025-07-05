import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ClientRepository } from '@nx-angular-ddd/client/domain';
import { ClientDataService } from '@nx-angular-ddd/client/infrastructure';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: ClientRepository,
      useClass: ClientDataService,
    },
  ],
};
