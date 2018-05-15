import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SpecialtiesService} from "../../services/specialties.service";
import {GroupsService} from "../../services/groups.service";
import {EditGroupComponent} from "./editGroupComponent/editGroup.component";
import {SubGroupsService} from "../../services/subGroups.service";
import {StudentsService} from "../../services/students.service";
import {AllSubGroupsComponent, CreateSubGroupDialog} from '../subGroupsComponents/allSubGroupsComponent/allSubGroups.component';
import {AllStudentsComponent, CreateStudentDialog} from '../studentsComponent/allStudentsComponent/allStudents.component';
import {MaterialModule} from '../../material.module';


@NgModule({
	declarations: [
	  CreateStudentDialog,
	  CreateSubGroupDialog,
		AllStudentsComponent,
		AllSubGroupsComponent,
		EditGroupComponent
	],
  entryComponents: [CreateSubGroupDialog, CreateStudentDialog],
	imports: [
	  MaterialModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: 'edit/:id', component: EditGroupComponent}
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
