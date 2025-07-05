import { Client, CreateClient } from "../models";
import { Observable } from "rxjs";

export abstract class ClientRepository {
  abstract findAll(): Observable<Client[]>;
  abstract create(client: CreateClient): Observable<Client>;
}
