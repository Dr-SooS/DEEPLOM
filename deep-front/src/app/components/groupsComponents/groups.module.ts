import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SpecialtiesService} from "../../services/specialties.service";
import {GroupsService} from "../../services/groups.service";
import {EditGroupComponent} from "./editGroupComponent/editGroup.component";
import {CreateGroupComponent} from "./createGroupComponent/createGroup.component";
import {SubGroupsService} from "../../services/subGroups.service";
import {StudentsService} from "../../services/students.service";
import {AllSubGroupsComponent} from "./allSubGroupsComponent/allSubGroups.component";
import {AllStudentsComponent} from "../subGroupsComponents/allStudentsComponent/allStudents.component";
import {StudentsModule} from "../studentsComponent/students.module";


@NgModule({
	declarations: [
		AllStudentsComponent,
		AllSubGroupsComponent,
		EditGroupComponent,
		CreateGroupComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: 'edit/:id', component: EditGroupComponent},
			{path: 'create', component: CreateGroupComponent}
		]),
	],
	providers: [
		SpecialtiesService,
		GroupsService,
		SubGroupsService,
		StudentsService
	]
})

export class GroupsModule {
}