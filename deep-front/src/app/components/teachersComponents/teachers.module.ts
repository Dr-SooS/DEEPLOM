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
import {AllTeacherTsiComponent, CreateTSIDialog} from '../tsiComponents/allTsiComponent/allTeacherTsi.component';
import {TSIsService} from '../../services/tsi.service';
import {SemestersService} from '../../services/semesters.service ';
import {SubjectsService} from '../../services/subjects.service';
import {LessonsService} from '../../services/lessons.service';
import {MessagesModule} from '../messages/messages.module';
import {SendMessageDialog} from '../messages/sendDialog/send-message.dialog';

@NgModule({
  declarations: [
    CreateTeacherDialog,
    AllTeachersComponent,
    EditTeacherComponent,
    AllTeacherTsiComponent,
    CreateTSIDialog,
    SendMessageDialog
  ],
  entryComponents: [CreateTeacherDialog, CreateTSIDialog, SendMessageDialog],
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
    SubjectsService,
    LessonsService
  ]
})

export class TeachersModule {
}
