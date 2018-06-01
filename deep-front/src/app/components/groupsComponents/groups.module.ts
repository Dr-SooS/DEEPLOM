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
import {AllSemestersComponent, CreateSemesterDialog} from '../semestersComponents/allSemestersComponent/allSemesters.component';
import {SemestersService} from '../../services/semesters.service ';
import {AllGroupTsiComponent} from '../tsiComponents/allTsiComponent/allGroupTsi.component';


@NgModule({
	declarations: [
	  CreateStudentDialog,
	  CreateSubGroupDialog,
		AllStudentsComponent,
		AllSubGroupsComponent,
		EditGroupComponent,
    AllSemestersComponent,
    CreateSemesterDialog,
    AllGroupTsiComponent
	],
  entryComponents: [CreateSubGroupDialog, CreateStudentDialog, CreateSemesterDialog],
	imports: [
	  MaterialModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: 'edit/:id', component: EditGroupComponent}
		]),
	],
  exports: [AllGroupTsiComponent],
	providers: [
		SpecialtiesService,
		GroupsService,
		SubGroupsService,
		StudentsService,
    SemestersService,
	]
})

export class GroupsModule {
}
