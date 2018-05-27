import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Teacher} from "../../../models/Teacher";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/User";
import {College} from "../../../models/College";
import {TeachersService} from "../../../services/teachers.service";
import {CollegesService} from "../../../services/colleges.service";

@Component({
	selector: 'edit-teacher',
	templateUrl: './editTeacher.component.html',
})
export class EditTeacherComponent{

	teacher: Teacher = new Teacher();
	id: number;

	constructor(
		private http: HttpClient,
		private host: HostService,
		private router: ActivatedRoute,
		private teachersService: TeachersService
	) {}


	ngOnInit() {
		this.teacher.user = new User();

		this.router.params.subscribe(p => this.id = +p['id']);
		this.teachersService.getTeacher(this.id).subscribe(res => this.teacher = res as Teacher);
	}

	onUpdate() {
		this.teachersService.putTeacher(this.id, this.teacher).subscribe();
	}
}
