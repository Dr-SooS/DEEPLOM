import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {College} from "../../../models/College";
import {SubGroupsService} from "../../../services/subGroups.service";
import {Semester} from "../../../models/Semester";
import {SemestersService} from "../../../services/semesters.service ";
import {Specialty} from "../../../models/Specialty";
import {SubGroup} from "../../../models/SubGroup";

@Component({
	selector: 'create-semester',
	templateUrl: './createSemester.component.html',
})
export class CreateSemesterComponent {

	semester: Semester = new Semester();
	subGroups: SubGroup[] = [];

	constructor(
		private http: HttpClient,
		private host: HostService,
		private subGroupsService: SubGroupsService,
		private semestersService: SemestersService
	) {}
	
	ngOnInit() {
		this.semester.subGroup = new SubGroup();
		this.subGroupsService.getSubGroups().subscribe(res => this.subGroups = res as SubGroup[]);
	}

	onCreate() {
		this.semestersService.postSemester(this.semester).subscribe();
	}
}
