import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  profileForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private router : Router) {
    this.createProfileForm();
  }

  ngOnInit(): void {

  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  saveProfile() {
    if (this.profileForm.dirty && this.profileForm.valid) {
      console.log(this.profileForm.value);
      // @ts-ignore
      this.profileService.createProfile({text : this.profileForm.value.text , status : 0}).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
        console.log(res);
        this.router.navigate(['/']);
      })
    }
  }

  ngOnDestroy():void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
