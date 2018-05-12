import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CollegesService} from "../../services/colleges.service";
import {EditSpecialtyComponent} from "./editSpecialtyComponent/editSpecialty.component";
import {CreateSpecialtyComponent} from "./createSpecialtyComponent/createSpecialty.component";
import {SpecialtiesService} from "../../services/specialties.service";
import {GroupsService} from "../../services/groups.service";
import {AllGroupsComponent} from "./allGroupsComponent/allGroups.component";


@NgModule({
	declarations: [
		AllGroupsComponent,
		EditSpecialtyComponent,
		CreateSpecialtyComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: 'edit/:id', component: EditSpecialtyComponent},
			{path: 'create', component: CreateSpecialtyComponent}
		])
	],
	providers: [
		SpecialtiesService,
		CollegesService,
		GroupsService
	]
})

export class SpecialtiesModule {
}