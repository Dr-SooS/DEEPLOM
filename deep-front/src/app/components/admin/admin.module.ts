import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { MaterialModule } from "../../material.module";

@NgModule({
	declarations: [
		AdminComponent,
	],
	imports: [
		MaterialModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '', component: AdminComponent, children: [
					{path: 'colleges', loadChildren: '../collegesComponents/colleges.module#CollegesModule'},
					{path: 'directors', loadChildren: '../directorsComponents/directors.module#DirectorsModule'},
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
	]
})

export class AdminModule {
}
