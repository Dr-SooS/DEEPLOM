import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {College} from "../../../models/College";
import {SpecialtiesService} from "../../../services/specialties.service";
import {Group} from "../../../models/Group";
import {GroupsService} from "../../../services/groups.service";
import {Specialty} from "../../../models/Specialty";

@Component({
	selector: 'create-group',
	templateUrl: './createGroup.component.html',
})
export class CreateGroupComponent {

	group: Group = new Group();
	specialties: Specialty[] = [];

	constructor(
		private http: HttpClient,
		private host: HostService,
		private specialtiesService: SpecialtiesService,
		private groupsService: GroupsService
	) {}
	
	ngOnInit() {
		this.group.specialty = new Specialty();
		this.specialtiesService.getSpecialties().subscribe(res => this.specialties = res as Specialty[]);
	}

	onCreate() {
		this.groupsService.postGroup(this.group).subscribe();
	}
}
