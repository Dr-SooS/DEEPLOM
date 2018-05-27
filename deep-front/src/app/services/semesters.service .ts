import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Semester} from "../models/Semester";
import {BaseService} from "./base.service";
import {Subject} from '../models/Subject';

@Injectable()
export class SemestersService extends BaseService{
	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getSemesters(): Observable<Semester[]> {
		return this.http.get<Semester[]>(this.host.host + "/api/Semesters");
	}

	getSemester(id: number): Observable<Semester> {
		return this.http.get<Semester>(this.host.host + "/api/Semesters/" + id);
	}

	putSemester(id: number, group: Semester) {
		return this.http.put(this.host.host + "/api/Semesters/" + id, group);
	}

	postSemester(group: Semester) {
		return this.http.post(this.host.host + "/api/Semesters", group);
	}

	deleteSemester(id: number) {
		return this.http.delete(this.host.host + "/api/Semesters/" + id);
	}

  getSubjectGroupSemesters(teacher: number, group: number, subject: number): Observable<Semester[]> {
    return this.http.get<Semester[]>(this.host.host + "/api/Semesters/teacher_group_subject?teacherId=" + teacher + "&groupId=" + group + "&subjectId=" + subject);
  }

  getSubGroupSemesters(id: number) {
    return this.http.get<Semester[]>(this.host.host + "/api/Semesters/subGr/" + id);
  }

  getGroupSemesters(groupId: number) {
    return this.http.get<Semester[]>(this.host.host + "/api/Semesters/Gr/" + groupId);
  }
}
