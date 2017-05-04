import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopicListComponent} from "./topic-list/topic-list.component";
import {AuthGuard} from "../auth/services/auth-guard.service";

const galleryRoutes: Routes = [
  { path: 'gallery',  redirectTo: 'gallery/topics' },
  { path: 'gallery/topics',  component: TopicListComponent, canActivate: [AuthGuard] },
  { path: 'gallery/topic/:id', component: TopicListComponent, canActivate: [AuthGuard] } // TODO change to actual component
];
@NgModule({
  imports: [
    RouterModule.forChild(galleryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GalleryRoutingModule { }
