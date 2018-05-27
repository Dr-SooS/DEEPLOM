import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Student} from "../../../models/Student";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/User";
import {SubGroup} from "../../../models/SubGroup";
import {StudentsService} from "../../../services/students.service";
import {SubGroupsService} from "../../../services/subGroups.service";

@Component({
	selector: 'edit-student',
	templateUrl: './editStudent.component.html',
})
export class EditStudentComponent{

	student: Student = new Student();
	subGroups: SubGroup[] = [];
	id: number;

	constructor(
		private http: HttpClient,
		private host: HostService,
		private router: ActivatedRoute,
		private studentsService: StudentsService,
		private subGroupsService: SubGroupsService
	) {}


	ngOnInit() {
		this.student.user = new User();
		this.student.subGroup = new SubGroup();

		this.router.params.subscribe(p => this.id = +p['id']);
		this.studentsService.getStudent(this.id).subscribe(res => this.student = res as Student);
		this.subGroupsService.getSubGroups().subscribe(res => this.subGroups = res as SubGroup[])
	}

	onStudentUpdate() {
		this.studentsService.putStudent(this.id, this.student).subscribe();
	}
}
