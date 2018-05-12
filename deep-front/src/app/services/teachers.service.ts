import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Teacher} from "../models/Teacher";
import {HttpClient} from "@angular/common/http";
import {HostService} from "./host.service";
import {BaseService} from "./base.service";

@Injectable()
export class TeachersService extends BaseService{

	constructor(protected http: HttpClient, protected host: HostService) 
	{ 
		super(http, host);
	}

	getTeachers(): Observable<Teacher[]> {
		return this.http.get<Teacher[]>(this.host.host + "/api/Teachers");
	}

	getCollegeTeachers(collegeId: number): Observable<Teacher[]> {
		return this.http.get<Teacher[]>(this.host.host + "/api/Teachers/college/" + collegeId);
	}
	
	getTeacher(id: number): Observable<Teacher> {
		return this.http.get<Teacher>(this.host.host + "/api/Teachers/" + id);
	}

	postTeacher(teacher: Teacher) {
		return this.http.post(this.host.host + "/api/Teachers", teacher);
	}

	putTeacher(id: number,  teacher: Teacher) {
		return this.http.put(this.host.host + "/api/Teachers/" + id, teacher);
	}
	
	deleteTeacher(id: number) {
		return this.http.delete(this.host.host + "/api/Teachers/" + id);
	}
}