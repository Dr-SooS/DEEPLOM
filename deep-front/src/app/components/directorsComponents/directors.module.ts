import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CollegesService} from "../../services/colleges.service";
import {DirectorsService} from "../../services/directors.service";
import {DirectorsComponent} from "./directorsComponent/directors.component";
import {AllDirectorsComponent} from "./allDirectorsComponent/allDirectors.component";
import {CreateDirectorComponent} from "./createDirectorComponent/createDirector.component";
import {EditDirectorComponent} from "./editDirectorComponent/editDirector.component";
import {MaterialModule} from '../../material.module';


@NgModule({
	declarations: [
		DirectorsComponent,
		AllDirectorsComponent,
		CreateDirectorComponent,
		EditDirectorComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
    MaterialModule,
		RouterModule.forChild([
			{
				path: '', component: DirectorsComponent, children: [
					{path: '', component: AllDirectorsComponent},
					{path: 'edit/:id', component: EditDirectorComponent},
					{path: 'create', component: CreateDirectorComponent}]
			},
		])
	],
	providers: [
		DirectorsService,
		CollegesService,
	]
})

export class DirectorsModule {
}
