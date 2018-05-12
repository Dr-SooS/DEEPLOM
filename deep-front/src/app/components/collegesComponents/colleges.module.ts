import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AllCollegesComponent} from "./allCollegesComponent/allColleges.component";
import {EditCollegeComponent} from "./editCollegeComponent/editCollege.component";
import {CreateCollegeComponent} from "./createCollegeComponent/createCollege.component";
import {CollegesService} from "../../services/colleges.service";
import {DirectorsService} from "../../services/directors.service";
import {SpecialtiesService} from "../../services/specialties.service";
import {AllSpecialtiesComponent} from "./allSpecialtiesComponent/allSpecialties.component";


@NgModule({
	declarations: [
		AllSpecialtiesComponent,
		AllCollegesComponent,
		EditCollegeComponent,
		CreateCollegeComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forChild([
			{path: '', component: AllCollegesComponent},
			{path: 'edit/:id', component: EditCollegeComponent},
			{path: 'create', component: CreateCollegeComponent},
		])
	],
	providers: [
		DirectorsService,
		CollegesService,
		SpecialtiesService
	]
})

export class CollegesModule {
}