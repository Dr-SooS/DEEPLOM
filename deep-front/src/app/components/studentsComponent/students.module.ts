import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {GroupsService} from "../../services/groups.service";
import {SubGroupsService} from "../../services/subGroups.service";
import {StudentsService} from "../../services/students.service";
import {EditStudentComponent} from "./editStudentComponent/editStudent.component";
import {MaterialModule} from '../../material.module';
import {AllStudentsTsiComponent} from '../tsiComponents/allTsiComponent/allStudentsTsi.component';


@NgModule({
	declarations: [
		EditStudentComponent,
    AllStudentsTsiComponent,
	],
	imports: [
		CommonModule,
    MaterialModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: 'edit/:id', component: EditStudentComponent},
		])
	],
	exports: [
		EditStudentComponent,
	],
	providers: [
		GroupsService,
		SubGroupsService,
		StudentsService
	]
})

export class StudentsModule {
}
