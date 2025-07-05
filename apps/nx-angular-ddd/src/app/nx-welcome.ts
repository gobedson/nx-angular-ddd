import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClient } from '@nx-angular-ddd/client/manage-client-feature';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, CreateClient],
  template: `
  <nx-angular-ddd-create-client/>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}
