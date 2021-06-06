import {Statuses} from '../enums/statuses.enum'

/**
 * Interface model for profiles
 * created by Semir
 */
export interface ProfilesModel {
  id : number;
  text: string;
  status : Statuses
}
