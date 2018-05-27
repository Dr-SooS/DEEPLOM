import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {MarksComponent} from './marksComponent/marks.component';
import {TeachersService} from '../../services/teachers.service';
import {SubjectsService} from '../../services/subjects.service';
import {SubGroupsService} from '../../services/subGroups.service';
import {StudentsService} from '../../services/students.service';
import {SemestersService} from '../../services/semesters.service ';


@NgModule({
  declarations: [MarksComponent],
  entryComponents: [],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: MarksComponent},
    ])
  ],
  providers: [
    TeachersService,
    SubjectsService,
    SubGroupsService,
    StudentsService,
    SemestersService
  ]
})

export class MarksModule {
}
