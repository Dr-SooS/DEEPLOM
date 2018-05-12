import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Student} from "../models/Student";
import {HttpClient} from "@angular/common/http";
import {HostService} from "./host.service";
import {BaseService} from "./base.service";

@Injectable()
export class StudentsService extends BaseService{

	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getStudents(): Observable<Student[]> {
		return this.http.get<Student[]>(this.host.host + "/api/Students");
	}

	getSubGroupStudents(id: number): Observable<Student[]> {
		return this.http.get<Student[]>(this.host.host + "/api/Students/subgroup/" + id);
	}
	
	getStudent(id: number): Observable<Student> {
		return this.http.get<Student>(this.host.host + "/api/Students/" + id);
	}

	postStudent(student: Student) {
		return this.http.post(this.host.host + "/api/Students", student);
	}

	putStudent(id: number,  student: Student) {
		return this.http.put(this.host.host + "/api/Students/" + id, student);
	}
	
	deleteStudent(id: number) {
		return this.http.delete(this.host.host + "/api/Students/" + id);
	}
}