import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CollegesService} from '../../services/colleges.service';
import {EditSpecialtyComponent} from './editSpecialtyComponent/editSpecialty.component';
import {SpecialtiesService} from '../../services/specialties.service';
import {GroupsService} from '../../services/groups.service';
import {AllGroupsComponent, CreateGroupDialog} from '../groupsComponents/allGroupsComponent/allGroups.component';
import {CreateSpecialtyDialog} from './allSpecialtiesComponent/allSpecialties.component';
import {MaterialModule} from '../../material.module';


@NgModule({
  declarations: [
    CreateSpecialtyDialog,
    CreateGroupDialog,
    AllGroupsComponent,
    EditSpecialtyComponent,],
  entryComponents: [CreateSpecialtyDialog, CreateGroupDialog],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'edit/:id', component: EditSpecialtyComponent},
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
