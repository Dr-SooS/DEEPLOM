import {NgModule} from '@angular/core';
import {StudentComponent} from './student.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {DirectorsService} from '../../services/directors.service';
import {StudentHomeComponent} from './studentHome/studentHome.component';
import {EditDirectorComponent} from '../directorsComponents/editDirectorComponent/editDirector.component';
import {CollegesService} from '../../services/colleges.service';
import {StudentsService} from '../../services/students.service';
import {EditStudentComponent} from '../studentsComponent/editStudentComponent/editStudent.component';
import {SubGroupsService} from '../../services/subGroups.service';
import {AllStudentsTsiComponent} from '../tsiComponents/allTsiComponent/allStudentsTsi.component';
import {TSIsService} from '../../services/tsi.service';
import {GroupsService} from '../../services/groups.service';
import {TsiMarksComponent} from '../teacher/tsiMarks/tsiMarks.component';
import {LessonsService} from '../../services/lessons.service';

@NgModule({
  declarations: [
    StudentComponent,
    StudentHomeComponent,
    EditDirectorComponent,
    EditStudentComponent,
    AllStudentsTsiComponent,
    TsiMarksComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: StudentComponent, children: [
          {path: '', component: StudentHomeComponent},
          {path: 'colleges', loadChildren: '../collegesComponents/colleges.module#CollegesModule'},
          {path: 'specialties', loadChildren: '../specialtiesComponents/specialties.module#SpecialtiesModule'},
          {path: 'groups', loadChildren: '../groupsComponents/groups.module#GroupsModule'},
          {path: 'subGroups', loadChildren: '../subGroupsComponents/subGroups.module#SubGroupsModule'},
          {path: 'students', loadChildren: '../studentsComponent/students.module#StudentsModule'},
          {path: 'teachers', loadChildren: '../teachersComponents/teachers.module#TeachersModule'},
          {path: 'marks', loadChildren: '../marksComponents/marks.module#MarksModule'},
          {path: 'tsiMarks', component: TsiMarksComponent}
        ]
      },
    ])
  ],
  providers: [
    DirectorsService,
    CollegesService,
    StudentsService,
    SubGroupsService,
    TSIsService,
    GroupsService,
    LessonsService
  ]
})

export class StudentModule {
}
