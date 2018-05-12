import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {SubGroup} from "../../../models/SubGroup";
import {SubGroupsService} from "../../../services/subGroups.service";

@Component({
	selector: 'all-subGroups',
	templateUrl: './allSubGroups.component.html',
})
export class AllSubGroupsComponent {

	subGroups: SubGroup[];
	@Input() groupId: number;

	constructor(private http: HttpClient,
				private host: HostService,
				private subGroupsService: SubGroupsService) { }

	ngOnInit() {
		this.subGroupsService.getGroupSubGroups(this.groupId).subscribe(res => this.subGroups = res as SubGroup[])
	}

	onDelete(id: number) {
		this.subGroupsService.deleteSubGroup(id).subscribe(res => {
			this.subGroupsService.getGroupSubGroups(this.groupId).subscribe(res => this.subGroups = res as SubGroup[]);
		});
	}
}
