import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {ActivatedRoute} from "@angular/router";
import {Group} from "../../../models/Group";
import {GroupsService} from "../../../services/groups.service";
import {SubGroup} from "../../../models/SubGroup";
import {SubGroupsService} from "../../../services/subGroups.service";

@Component({
	selector: 'edit-subGroup',
	templateUrl: './editSubGroup.component.html',
})
export class EditSubGroupComponent {

	subGroup: SubGroup = new SubGroup();
	groups: Group[] = [];

	constructor(private http: HttpClient,
				private host: HostService,
				private router: ActivatedRoute,
				private subGroupsService: SubGroupsService,
				private groupsSrevice: GroupsService) {}


	ngOnInit() {
		this.subGroup.group = new Group();
		this.router.params.subscribe(p => this.subGroup.id = +p['id']);
		this.groupsSrevice.getGroups().subscribe(res => this.groups = res as Group[]);
		this.subGroupsService.getSubGroup(this.subGroup.id).subscribe(res => this.subGroup = res as SubGroup);
	}

	onUpdate() {
		this.subGroupsService.putSubGroup(this.subGroup.id, this.subGroup).subscribe();
	}
}
