import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {ActivatedRoute} from "@angular/router";
import {SubGroup} from "../../../models/SubGroup";
import {SubGroupsService} from "../../../services/subGroups.service";
import {Semester} from "../../../models/Semester";
import {SemestersService} from "../../../services/semesters.service ";

@Component({
	selector: 'edit-semester',
	templateUrl: './editSemester.component.html',
})
export class EditSemesterComponent {

	semester: Semester = new Semester();
	subGroups: SubGroup[] = [];
	id: number;

	constructor(private http: HttpClient,
				private host: HostService,
				private router: ActivatedRoute,
				private semestersService: SemestersService,
				private subGroupsSrevice: SubGroupsService) {}


	ngOnInit() {
		this.semester.subGroup = new SubGroup();
		this.router.params.subscribe(p => this.id = +p['id']);
		this.subGroupsSrevice.getSubGroups().subscribe(res => this.subGroups = res as SubGroup[]);
		this.semestersService.getSemester(this.id).subscribe(res => this.semester = res as Semester);
	}

	onUpdate() {
		this.semestersService.putSemester(this.id, this.semester).subscribe();
	}
}
