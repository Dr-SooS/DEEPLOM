import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Student} from "../../../models/Student";
import {StudentsService} from "../../../services/students.service";

@Component({
	selector: 'all-students',
	templateUrl: './allStudents.component.html',
})
export class AllStudentsComponent {

	students: Student[];
	@Input() sbId: number;

	constructor(private http: HttpClient,
				private host: HostService,
				private studentsService: StudentsService,) { }

	ngOnInit() {
		this.studentsService.getSubGroupStudents(this.sbId).subscribe(res => this.students = res as Student[])
	}

	onDelete(id: number) {
		this.studentsService.deleteStudent(id).subscribe(res => {
			this.studentsService.getSubGroupStudents(this.sbId).subscribe(res => this.students = res as Student[]);
		});
	}
}
