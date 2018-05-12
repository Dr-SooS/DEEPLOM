import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Group} from "../../../models/Group";
import {GroupsService} from "../../../services/groups.service";
import {SubGroup} from "../../../models/SubGroup";
import {SubGroupsService} from "../../../services/subGroups.service";

@Component({
	selector: 'create-subGroup',
	templateUrl: './createSubGroup.component.html',
})
export class CreateSubGroupComponent {

	subGroup: SubGroup = new SubGroup();
	groups: Group[] = [];

	constructor(
		private http: HttpClient,
		private host: HostService,
		private groupService: GroupsService,
		private subGroupsService: SubGroupsService
	) {}
	
	ngOnInit() {
		this.subGroup.group = new Group();
		this.groupService.getGroups().subscribe(res => this.groups = res as Group[]);
	}

	onCreate() {
		this.subGroupsService.postSubGroup(this.subGroup).subscribe();
	}
}
