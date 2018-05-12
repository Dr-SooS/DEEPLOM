import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {GroupsService} from "../../../services/groups.service";
import {Group} from "../../../models/Group";

@Component({
	selector: 'all-groups',
	templateUrl: './allGroups.component.html',
})
export class AllGroupsComponent {

	groups: Group[];
	@Input() specialtyId: number;
	
	constructor(private http: HttpClient,
				private host: HostService,
				private groupsService: GroupsService) { }

	ngOnInit() {
		this.groupsService.getSpecilatyGroups(this.specialtyId).subscribe(res => this.groups = res as Group[])
	}

	onDelete(id: number) {
		this.groupsService.deleteGroup(id).subscribe(res => {
			this.groupsService.getSpecilatyGroups(this.specialtyId).subscribe(res => this.groups = res as Group[]);
		});
	}
}
