import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {ActivatedRoute} from "@angular/router";
import {Specialty} from "../../../models/Specialty";
import {SpecialtiesService} from "../../../services/specialties.service";
import {Group} from "../../../models/Group";
import {GroupsService} from "../../../services/groups.service";

@Component({
	selector: 'edit-group',
	templateUrl: './editGroup.component.html',
})
export class EditGroupComponent {

	group: Group = new Group();
	specialties: Specialty[] = [];

	constructor(private http: HttpClient,
				private host: HostService,
				private router: ActivatedRoute,
				private groupsService: GroupsService,
				private specialtiesSrevice: SpecialtiesService) {}


	ngOnInit() {
		this.group.specialty = new Specialty();
		this.router.params.subscribe(p => this.group.id = +p['id']);
		this.specialtiesSrevice.getSpecialties().subscribe(res => this.specialties = res as Specialty[]);
		this.groupsService.getGroup(this.group.id).subscribe(res => this.group = res as Group);
		
	}

	onUpdate() {
		this.groupsService.putGroup(this.group.id, this.group).subscribe();
	}
}
