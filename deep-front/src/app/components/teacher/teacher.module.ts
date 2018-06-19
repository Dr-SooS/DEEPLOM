import {NgModule} from "@angular/core";
import {TeacherComponent} from "./teacher.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { MaterialModule } from "../../material.module";
import {TeachersService} from '../../services/teachers.service';
import {EditTeacherComponent} from '../teachersComponents/editTeachersComponent/editTeacher.component';
import {AllTeacherTsiComponent} from '../tsiComponents/allTsiComponent/allTeacherTsi.component';
import {TSIsService} from '../../services/tsi.service';
import {TeacherHomeComponent} from './teacherHomeComponent/teacherHome.component';
import {SubjectsService} from '../../services/subjects.service';
import {SubGroupsService} from '../../services/subGroups.service';
import {SemestersService} from '../../services/semesters.service ';
import {ChangeLessonTopicDialog, TsiMarksComponent} from './tsiMarks/tsiMarks.component';
import {LessonsService} from '../../services/lessons.service';
import {TopicsService} from '../../services/topics.service';

@NgModule({
	declarations: [
		TeacherComponent,
    TeacherHomeComponent,
    TsiMarksComponent,
    ChangeLessonTopicDialog,
    EditTeacherComponent,
    AllTeacherTsiComponent
	],
  entryComponents: [ChangeLessonTopicDialog],
	imports: [
		MaterialModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '', component: TeacherComponent, children: [
          {path: '', component: TeacherHomeComponent},
					{path: 'groups', loadChildren: '../groupsComponents/groups.module#GroupsModule'},
					{path: 'subGroups', loadChildren: '../subGroupsComponents/subGroups.module#SubGroupsModule'},
					{path: 'students', loadChildren: '../studentsComponent/students.module#StudentsModule'},
          {path: 'tsiMarks', component: TsiMarksComponent},
          {path: 'messages', loadChildren: '../messages/messages.module#MessagesModule'}
				]
			},
		])
	],
	providers: [
	  TeachersService,
    TSIsService,
    SubjectsService,
    SubGroupsService,
    SemestersService,
    LessonsService,
    TopicsService
	]
})

export class TeacherModule {
}
