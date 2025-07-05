import { inject } from '@angular/core';
import { Client, ClientRepository, CreateClient } from '@nx-angular-ddd/client/domain';
import { Observable } from 'rxjs';


export class CreateClientUseCase {
  private readonly repository = inject(ClientRepository);

   execute(client: CreateClient): Observable<Client> {
    return this.repository.create(client);
  }
}