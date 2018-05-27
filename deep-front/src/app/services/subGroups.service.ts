import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {SubGroup} from "../models/SubGroup";
import {Observable} from "rxjs";
import {BaseService} from "./base.service";

@Injectable()
export class SubGroupsService extends BaseService{
	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getSubGroups(): Observable<SubGroup[]> {
		return this.http.get<SubGroup[]>(this.host.host + "/api/SubGroups");
	}

	getGroupSubGroups(id: number): Observable<SubGroup[]> {
		return this.http.get<SubGroup[]>(this.host.host + "/api/SubGroups/group/" + id);
	}

	getSubGroup(id: number): Observable<SubGroup> {
		return this.http.get<SubGroup>(this.host.host + "/api/SubGroups/" + id);
	}

	putSubGroup(id: number, group: SubGroup) {
		return this.http.put(this.host.host + "/api/SubGroups/" + id, group);
	}

	postSubGroup(group: SubGroup) {
		return this.http.post(this.host.host + "/api/SubGroups", group);
	}

	deleteSubGroup(id: number) {
		return this.http.delete(this.host.host + "/api/SubGroups/" + id);
	}

  getCollegeSubGroups(id: number) {
    return this.http.get<SubGroup[]>(this.host.host + "/api/SubGroups/college/" + id);
  }
}
