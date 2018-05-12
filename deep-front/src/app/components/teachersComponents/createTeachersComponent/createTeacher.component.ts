import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Teacher} from "../../../models/Teacher";
import {User} from "../../../models/User";
import {College} from "../../../models/College";
import {TeachersService} from "../../../services/teachers.service";
import {CollegesService} from "../../../services/colleges.service";

@Component({
	selector: 'create-teacher',
	templateUrl: './createTeacher.component.html',
})
export class CreateTeacherComponent{

	teacher: Teacher = new Teacher();
	colleges: College[] = []
	
	constructor(
		private http: HttpClient,
		private host: HostService,
		private teachersService: TeachersService,
		private collegeService: CollegesService
	) {}
	
	ngOnInit() {
		this.teacher.user = new User();
		this.collegeService.getColleges().subscribe(res => this.colleges = res as College[]);
	}

	onTeacherCreate() {
		this.teachersService.postTeacher(this.teacher).subscribe();
	}
}
