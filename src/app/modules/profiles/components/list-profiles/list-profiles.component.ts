import {Component, OnDestroy, OnInit} from '@angular/core';

import {ProfilesModel} from "../../models/profiles.model";
import {ProfileService} from "../../services/profile.service";
import {HttpClientOctimineService} from "../../../common-module/services/http-client-octimine.service";
import {HttpResponse} from '@angular/common/http';

import {Statuses} from "../../enums/statuses.enum";

import {takeUntil} from 'rxjs/operators';
import {Subject, Subscription, timer} from 'rxjs';


@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss']
})
export class ListProfilesComponent implements OnInit, OnDestroy {
  public profiles: ProfilesModel[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  public profileStatuses = Statuses;

  countDown: Subscription;
  public counter = 60;
  tick = 1000;

  constructor(private profileService: ProfileService, private httpClientOctimineService: HttpClientOctimineService) {
  }


  ngOnInit(): void {
    // @ts-ignore
    this.profileService.getProfiles<ProfilesModel[]>(this.httpClientOctimineService.first, true).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.profiles = res.body;
    })
    this.startCounter();
  }


  resetCounter() {
    this.counter = 60;
    this.countDown.unsubscribe();
    this.firstPage();
    this.startCounter();
  }

  startCounter() {
    this.countDown = timer(0, this.tick)
      .subscribe(() => {
        --this.counter
        if (this.counter === 0) {
          this.resetCounter();
        }
      })
  }

  public firstPage() {
    this.profiles = [];
    // @ts-ignore
    this.profileService.getProfiles(this.httpClientOctimineService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.profiles = res.body;
    })
  }

  public previousPage() {
    if (this.httpClientOctimineService.prev !== undefined && this.httpClientOctimineService.prev !== '') {
      this.profiles = [];
      // @ts-ignore
      this.profileService.getProfiles(this.httpClientOctimineService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.profiles = res.body;
      })
    }
  }

  public nextPage() {
    if (this.httpClientOctimineService.next !== undefined && this.httpClientOctimineService.next !== '') {
      this.profiles = [];
      // @ts-ignore
      this.profileService.getProfiles(this.httpClientOctimineService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.profiles = res.body;
      })
    }
  }

  public lastPage() {
    this.profiles = [];
    // @ts-ignore
    this.profileService.getProfiles(this.httpClientOctimineService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.profiles = res.body;
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
    this.countDown.unsubscribe();
  }

  updateStatus(profile: ProfilesModel) {
    // @ts-ignore
    this.profileService.getStatus(profile.id).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<ProfilesModel>) => {
      console.log(res);
      this.profiles.forEach(oneProfile => {
        if (oneProfile.id === profile.id) {
          // @ts-ignore
          oneProfile = res;
        }
      });
    })
  }

  deleteProfile(profile: ProfilesModel) {
    // @ts-ignore
    this.profileService.deleteProfile(profile.id).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<ProfilesModel>) => {
      console.log(res);
      this.profiles.forEach((oneProfile, index, object) => {
        if (oneProfile.id === profile.id) {
          // @ts-ignore
          object.splice(index, 1);
        }
      });
    })
  }


}
