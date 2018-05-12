import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SpecialtiesService} from "../../services/specialties.service";
import {GroupsService} from "../../services/groups.service";
import {SubGroupsService} from "../../services/subGroups.service";
import {EditTeacherComponent} from "./editTeachersComponent/editTeacher.component";
import {CreateTeacherComponent} from "./createTeachersComponent/createTeacher.component";
import {TeachersService} from "../../services/teachers.service";
import {AllTeachersComponent} from "./allTeachersComponent/allTeachers.component";
import {CollegesService} from "../../services/colleges.service";

@NgModule({
	declarations: [
		AllTeachersComponent,
		EditTeacherComponent,
		CreateTeacherComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: '', component: AllTeachersComponent},
			{path: 'edit/:id', component: EditTeacherComponent},
			{path: 'create', component: CreateTeacherComponent}
		])
	],
	providers: [
		GroupsService,
		SubGroupsService,
		TeachersService,
		CollegesService
	]
})

export class TeachersModule {
}