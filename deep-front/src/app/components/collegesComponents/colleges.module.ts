import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AllCollegesComponent, CreateCollegeDialog} from './allCollegesComponent/allColleges.component';
import {EditCollegeComponent} from './editCollegeComponent/editCollege.component';
import {CollegesService} from '../../services/colleges.service';
import {DirectorsService} from '../../services/directors.service';
import {SpecialtiesService} from '../../services/specialties.service';
import {AllSpecialtiesComponent, CreateSpecialtyDialog} from '../specialtiesComponents/allSpecialtiesComponent/allSpecialties.component';
import {MaterialModule} from '../../material.module';


@NgModule({
  declarations: [
    CreateCollegeDialog,
    CreateSpecialtyDialog,
    AllSpecialtiesComponent,
    AllCollegesComponent,
    EditCollegeComponent],
  entryComponents: [CreateCollegeDialog, CreateSpecialtyDialog],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: AllCollegesComponent},
      {path: 'edit/:id', component: EditCollegeComponent},
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
