import { Component, Input } from '@angular/core';
import { IListDetails } from '../../interfaces/list-details-response.interface';
@Component({
  selector: 'app-movieslists',
  template: '<div>Mock></div>',
})
export class MockMoviesListComponent {
  @Input() lists!: IListDetails[] | null;
  constructor() {}
}
