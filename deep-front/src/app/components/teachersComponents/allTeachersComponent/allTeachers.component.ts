import {Component, OnInit} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Teacher} from "../../../models/Teacher";
import {TeachersService} from "../../../services/teachers.service";
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'all-teachers',
	templateUrl: './allTeachers.component.html',
})
export class AllTeachersComponent {

	teachers: Teacher[];

	constructor(private http: HttpClient,
				private host: HostService,
				private teachersService: TeachersService,
				private router: ActivatedRoute) { }

	ngOnInit() {
		this.teachersService.getCollegeTeachers(this.router.snapshot.queryParams['collegeId']).subscribe(res => this.teachers = res)
	}

	onDelete(id: number) {
		this.teachersService.deleteTeacher(id).subscribe(res => {
			this.teachersService.getCollegeTeachers(this.router.snapshot.queryParams['collegeId']).subscribe(res => this.teachers = res);
		});
	}
}
