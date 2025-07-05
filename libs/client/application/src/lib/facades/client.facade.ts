import { Injectable } from "@angular/core";
import { ListClientsUseCase } from "../use-cases/list-clients.use-case";
import { CreateClientUseCase } from "../use-cases/create-client.use-case";
import { Observable } from "rxjs";
import { Client, CreateClient } from "@nx-angular-ddd/client/domain";

@Injectable({ providedIn: 'root' })
export class ClientFacade {
  private readonly listClients = new ListClientsUseCase();
  private readonly createClient = new CreateClientUseCase();

  loadClients(): Observable<Client[]> {
   return this.listClients.execute();
  }

   addClient(client: CreateClient): Observable<Client> {
    return this.createClient.execute(client);
  }
}