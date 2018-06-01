import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';

import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {HostService} from './services/host.service';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {PermissionsService} from './services/permissions.service';
import {AdminGuard} from './routeProtectors/admin.guard';
import {LoginComponent} from './components/accountsComponents/loginComponent/login.component';
import {CookieService} from 'angular2-cookie/core';
import {StudentsService} from './services/students.service';
import {DirectorGuard} from './routeProtectors/director.guard';
import {UsersService} from './services/users.service';
import {TeacherGuard} from './routeProtectors/teacher.guard';
import {StudentGuard} from './routeProtectors/student.guard';
import {TsiMarksComponent} from './components/teacher/tsiMarks/tsiMarks.component';
import {TSIsService} from './services/tsi.service';
import {LessonsService} from './services/lessons.service';
import {TeachersService} from './services/teachers.service';
import {GroupsService} from './services/groups.service';
import {SubGroupsService} from './services/subGroups.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: 'accounts/login', component: LoginComponent},
      {path: 'admin', loadChildren: './components/admin/admin.module#AdminModule', canActivate: [AdminGuard]},
      {path: 'director', loadChildren: './components/director/director.module#DirectorModule', canActivate: [DirectorGuard]},
      {path: 'teacher', loadChildren: './components/teacher/teacher.module#TeacherModule', canActivate: [TeacherGuard]},
      {path: 'student', loadChildren: './components/student/student.module#StudentModule', canActivate: [StudentGuard]},
    ])
  ],
  providers: [
    StudentsService,
    AdminGuard,
    DirectorGuard,
    PermissionsService,
    CookieService,
    HostService,
    UsersService,
    TeacherGuard,
    StudentGuard,
    TSIsService,
    LessonsService,
    TeachersService,
    GroupsService,
    SubGroupsService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
