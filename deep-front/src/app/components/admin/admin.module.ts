import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';

@NgModule({
	bootstrap: [AdminComponent],
	declarations: [
		AdminComponent,
	],
	imports: [
		MatButtonModule,
		MatToolbarModule,
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
					{path: 'teachers', loadChildren: '../teachersComponents/teachers.module#TeachersModule'}
				]
			},
		])
	],
	providers: [
	]
})

export class AdminModule {
}