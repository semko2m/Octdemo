import {Injectable} from '@angular/core';
import {HttpClientOctimineService} from "../../common-module/services/http-client-octimine.service";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClientOctimineService: HttpClientOctimineService) {
  }

  public getProfiles(page: string, pagination: boolean = false) {
    return this.httpClientOctimineService.get('/profiles' + page, pagination);
  }

  public createProfile(body: any) {
    return this.httpClientOctimineService.post('/profiles', body);
  }

  public getStatus(id: number) {
    return this.httpClientOctimineService.get('/profiles/' + id, false);
  }

  public getStatuses(ids: []) {
    return this.httpClientOctimineService.get('/profiles/' + ids, false);
  }

  public deleteProfile(id: number) {
    return this.httpClientOctimineService.delete('/profiles/' + id);
  }
}
