import {Component, OnDestroy, OnInit} from '@angular/core';

import {ProfilesModel} from "../../models/profiles.model";
import {ProfileService} from "../../services/profile.service";
import {HttpClientOctimineService} from "../../../common-module/services/http-client-octimine.service";
import {HttpResponse} from '@angular/common/http';

import {Statuses} from "../../enums/statuses.enum";

import {takeUntil} from 'rxjs/operators';
import {Subject, Subscription, timer} from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';


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

  durationInSeconds = 5;

  globalRunning = false;
  globalFinished = false;
  globalFailed = false;

  constructor(private profileService: ProfileService,
              private httpClientOctimineService: HttpClientOctimineService,
              private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    // @ts-ignore
    this.profileService.getProfiles<ProfilesModel[]>(this.httpClientOctimineService.first, true).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.profiles = res.body;
      this.checkIfTrainingIsRunning()
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
      this.checkIfTrainingIsRunning()
    })
  }

  public previousPage() {
    if (this.httpClientOctimineService.prev !== undefined && this.httpClientOctimineService.prev !== '') {
      this.profiles = [];
      // @ts-ignore
      this.profileService.getProfiles(this.httpClientOctimineService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.profiles = res.body;
        this.checkIfTrainingIsRunning()
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
        this.checkIfTrainingIsRunning()
      })
    }
  }

  public lastPage() {
    this.profiles = [];
    // @ts-ignore
    this.profileService.getProfiles(this.httpClientOctimineService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.profiles = res.body;
      this.checkIfTrainingIsRunning()
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
      this.checkIfTrainingIsRunning()
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
      this.checkIfTrainingIsRunning()
    })
  }

  startTraining(profile: ProfilesModel) {
    // @ts-ignore
    this.profileService.startTraining(profile.id, {status: this.profileStatuses.running, text: profile.text}).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.profiles.forEach(oneProfile => {
        if (oneProfile.id === profile.id) {
          // @ts-ignore
          oneProfile.status = this.profileStatuses.running;
        }
      });
      this.checkIfTrainingIsRunning();
    })
  }

  checkIfTrainingIsRunning() {
    this.profiles.forEach(oneProfile => {
      if (oneProfile.status === this.profileStatuses.running) {
        // @ts-ignore
        this.globalRunning = true;
      }
      if (oneProfile.status === this.profileStatuses.finished) {
        this.globalFinished = true;
        // this._snackBar.open('Finished ' + oneProfile.id, 'Close');
        console.log('Finished ' + oneProfile.id);
      }
      if (oneProfile.status === this.profileStatuses.failed) {
        this.globalFailed = true;
        console.log('Failed ' + oneProfile.id);

        // alert('Failed ' + oneProfile.id);
        // this._snackBar.open('Failed ' + oneProfile.id, 'Close');
      }
    });
  }


}
