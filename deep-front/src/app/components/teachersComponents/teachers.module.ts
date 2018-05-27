import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
import {SubGroupsService} from '../../services/subGroups.service';
import {EditTeacherComponent} from './editTeachersComponent/editTeacher.component';
import {TeachersService} from '../../services/teachers.service';
import {AllTeachersComponent, CreateTeacherDialog} from './allTeachersComponent/allTeachers.component';
import {CollegesService} from '../../services/colleges.service';
import {MaterialModule} from '../../material.module';
import {AllTSIsComponent, CreateTSIDialog} from '../tsiComponents/allTsiComponent/allTsi.component';
import {TSIsService} from '../../services/tsi.service';
import {SemestersService} from '../../services/semesters.service ';
import {SubjectsService} from '../../services/subjects.service';

@NgModule({
  declarations: [
    CreateTeacherDialog,
    AllTeachersComponent,
    EditTeacherComponent,
    AllTSIsComponent,
    CreateTSIDialog
  ],
  entryComponents: [CreateTeacherDialog, CreateTSIDialog],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: AllTeachersComponent},
      {path: 'edit/:id', component: EditTeacherComponent}
    ])
  ],
  providers: [
    GroupsService,
    SubGroupsService,
    TeachersService,
    CollegesService,
    TSIsService,
    SemestersService,
    SubjectsService
  ]
})

export class TeachersModule {
}
