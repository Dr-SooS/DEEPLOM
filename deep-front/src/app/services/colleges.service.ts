import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {College} from "../models/College";
import {BaseService} from "./base.service";
import {Director} from "../models/Director";
import { Observable } from "rxjs";

@Injectable()
export class CollegesService extends BaseService{
	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}

	getColleges(): Observable<College[]> {
		return this.http.get<College[]>(this.host.host + "/api/Colleges");
	}

	getFreeColleges(): Observable<College[]> {
		return this.http.get<College[]>(this.host.host + "/api/Colleges/free");
	}

	getCollege(id: number): Observable<College> {
		return this.http.get<College>(this.host.host + "/api/Colleges/" + id);
	}

	putCollege(id: number, college: College) {
		return this.http.put(this.host.host + "/api/Colleges/" + id, college);
	}

	postCollege(college: College) {
		return this.http.post(this.host.host + "/api/Colleges", college);
	}

	deleteCollege(id: number) {
		return this.http.delete(this.host.host + "/api/Colleges/" + id);
	}
}