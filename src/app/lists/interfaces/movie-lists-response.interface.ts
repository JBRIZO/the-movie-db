import { IMeta } from 'src/app/shared/interfaces/meta-interface';
import { IListDetails } from './list-details-response.interface';

export interface IListResponse extends IMeta {
  results: IListDetails[];
}
