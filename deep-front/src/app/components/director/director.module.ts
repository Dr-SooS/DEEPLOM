import {NgModule} from "@angular/core";
import {DirectorComponent} from "./director.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { MaterialModule } from "../../material.module";
import {DirectorsService} from '../../services/directors.service';

@NgModule({
	declarations: [
		DirectorComponent,
	],
	imports: [
		MaterialModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '', component: DirectorComponent, children: [
					{path: 'colleges', loadChildren: '../collegesComponents/colleges.module#CollegesModule'},
					{path: 'specialties', loadChildren: '../specialtiesComponents/specialties.module#SpecialtiesModule'},
					{path: 'groups', loadChildren: '../groupsComponents/groups.module#GroupsModule'},
					{path: 'subGroups', loadChildren: '../subGroupsComponents/subGroups.module#SubGroupsModule'},
					{path: 'students', loadChildren: '../studentsComponent/students.module#StudentsModule'},
					{path: 'teachers', loadChildren: '../teachersComponents/teachers.module#TeachersModule'},
          {path: 'marks', loadChildren: '../marksComponents/marks.module#MarksModule'}
				]
			},
		])
	],
	providers: [
	  DirectorsService
	]
})

export class DirectorModule {
}
