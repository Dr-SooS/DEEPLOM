import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../models/Subject";
import {BaseService} from "./base.service";
import {Teacher} from '../models/Teacher';

@Injectable()
export class SubjectsService extends BaseService{
	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getSubjects(): Observable<Subject[]> {
		return this.http.get<Subject[]>(this.host.host + "/api/Subjects");
	}

	getSubject(id: number): Observable<Subject> {
		return this.http.get<Subject>(this.host.host + "/api/Subjects/" + id);
	}

	putSubject(id: number, subject: Subject) {
		return this.http.put(this.host.host + "/api/Subjects/" + id, subject);
	}

	postSubject(subject: Subject) {
		return this.http.post(this.host.host + "/api/Subjects", subject);
	}

	deleteSubject(id: number) {
		return this.http.delete(this.host.host + "/api/Subjects/" + id);
	}

  getTeacherSubjects(teacherId: number, groupId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.host.host + "/api/Subjects/teacher_group?teacherId=" + teacherId + "&groupId=" + groupId);
  }

  getCollegeSubjects(id: number) {
    return this.http.get<Subject[]>(this.host.host + "/api/Subjects/college/" + id);
  }

}
