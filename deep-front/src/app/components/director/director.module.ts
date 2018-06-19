import {NgModule} from "@angular/core";
import {DirectorComponent, GenerateReportDialog} from './director.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { MaterialModule } from "../../material.module";
import {DirectorsService} from '../../services/directors.service';
import {DirectorHomeComponent} from './directorHome/directorHome.component';
import {EditDirectorComponent} from '../directorsComponents/editDirectorComponent/editDirector.component';
import {CollegesService} from '../../services/colleges.service';
import {TSIsService} from '../../services/tsi.service';
import {ChangeLessonTopicDialog, TsiMarksComponent} from '../teacher/tsiMarks/tsiMarks.component';
import {TopicsService} from '../../services/topics.service';

@NgModule({
	declarations: [
		DirectorComponent,
    DirectorHomeComponent,
    EditDirectorComponent,
    TsiMarksComponent,
    ChangeLessonTopicDialog,
    GenerateReportDialog,
	],
  entryComponents: [ChangeLessonTopicDialog, GenerateReportDialog],
	imports: [
		MaterialModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '', component: DirectorComponent, children: [
          {path: '', component: DirectorHomeComponent},
					{path: 'colleges', loadChildren: '../collegesComponents/colleges.module#CollegesModule'},
					{path: 'specialties', loadChildren: '../specialtiesComponents/specialties.module#SpecialtiesModule'},
					{path: 'groups', loadChildren: '../groupsComponents/groups.module#GroupsModule'},
					{path: 'subGroups', loadChildren: '../subGroupsComponents/subGroups.module#SubGroupsModule'},
					{path: 'students', loadChildren: '../studentsComponent/students.module#StudentsModule'},
					{path: 'teachers', loadChildren: '../teachersComponents/teachers.module#TeachersModule'},
          {path: 'tsiMarks', component: TsiMarksComponent},
          {path: 'marks', loadChildren: '../marksComponents/marks.module#MarksModule'},
          {path: 'messages', loadChildren: '../messages/messages.module#MessagesModule'}
				]
			},
		])
	],
	providers: [
	  DirectorsService,
    CollegesService,
    TSIsService,
    TopicsService
	]
})

export class DirectorModule {
}
