import { inject } from "@angular/core";
import { Client, ClientRepository } from "@nx-angular-ddd/client/domain";
import { Observable } from "rxjs";

export class ListClientsUseCase {
  private readonly repository = inject(ClientRepository);

   execute(): Observable<Client[]> {
    return this.repository.findAll();
  }
}