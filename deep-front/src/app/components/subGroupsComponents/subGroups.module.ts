import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SpecialtiesService} from "../../services/specialties.service";
import {GroupsService} from "../../services/groups.service";
import {SubGroupsService} from "../../services/subGroups.service";
import {StudentsService} from "../../services/students.service";
import {EditSubGroupComponent} from "./editSubGroupComponent/editSubGroup.component";
import {CreateSubGroupComponent} from "./createSubGroupComponent/createSubGroup.component";

@NgModule({
	declarations: [
		EditSubGroupComponent,
		CreateSubGroupComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: 'edit/:id', component: EditSubGroupComponent},
			{path: 'create', component: CreateSubGroupComponent}
		])
	],
	providers: [
		SpecialtiesService,
		GroupsService,
		SubGroupsService,
		StudentsService
	]
})

export class SubGroupsModule {
}