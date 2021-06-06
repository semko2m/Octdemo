import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProfilesComponent} from "./modules/profiles/components/list-profiles/list-profiles.component";
import {DetailsProfileComponent} from "./modules/profiles/components/details-profile/details-profile.component";
import {CreateProfileComponent} from "./modules/profiles/components/create-profile/create-profile.component";

const routes: Routes = [
  {
    path: '',
    component: ListProfilesComponent
  },
  {
    path: 'profiles/:id',
    component: DetailsProfileComponent
  },
  {
    path: 'create',
    component: CreateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
