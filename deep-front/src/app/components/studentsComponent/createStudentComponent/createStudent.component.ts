import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Student} from "../../../models/Student";
import {User} from "../../../models/User";
import {SubGroup} from "../../../models/SubGroup";
import {StudentsService} from "../../../services/students.service";

@Component({
	selector: 'create-student',
	templateUrl: './createStudent.component.html',
})
export class CreateStudentComponent{

	student: Student = new Student();
	subGroups: SubGroup[];

	constructor(
		private http: HttpClient,
		private host: HostService,
		private studentsService: StudentsService
	) {}
	
	ngOnInit() {
		this.student.user = new User();
		this.student.subGroup = new SubGroup();
		
		this.http.get(this.host.host + "/api/SubGroups").subscribe(res => this.subGroups = res as SubGroup[])
	}

	onStudentCreate() {
		this.studentsService.postStudent(this.student).subscribe();
	}
}
