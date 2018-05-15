import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {GroupsService} from "../../services/groups.service";
import {SubGroupsService} from "../../services/subGroups.service";
import {StudentsService} from "../../services/students.service";
import {EditStudentComponent} from "./editStudentComponent/editStudent.component";


@NgModule({
	declarations: [
		EditStudentComponent,
	],
	imports: [
		CommonModule,
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
