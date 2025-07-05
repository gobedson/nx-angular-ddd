import { Injectable } from '@angular/core';
import { Client, ClientRepository, CreateClient } from '@nx-angular-ddd/client/domain';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientDataService implements ClientRepository {

     findAll(): Observable<Client[]> {
        throw new Error('Method not implemented.');
    }
     create(client: CreateClient): Observable<Client> {
        throw new Error('Method not implemented.');
    }

 

}