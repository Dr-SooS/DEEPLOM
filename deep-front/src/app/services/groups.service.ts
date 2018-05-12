import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {Specialty} from "../models/Specialty";
import {Observable} from "rxjs";
import {GroupAst} from "@angular/animations/browser/src/dsl/animation_ast";
import {Group} from "../models/Group";
import {BaseService} from "./base.service";

@Injectable()
export class GroupsService extends BaseService {
	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getGroups(): Observable<Group[]> {
		return this.http.get<Group[]>(this.host.host + "/api/Groups");
	}

	getSpecilatyGroups(id: number): Observable<Group[]> {
		return this.http.get<Group[]>(this.host.host + "/api/Groups/specialty/" + id);
	}

	getGroup(id: number): Observable<Group> {
		return this.http.get<Group>(this.host.host + "/api/Groups/" + id);
	}

	putGroup(id: number, group: Group) {
		return this.http.put(this.host.host + "/api/Groups/" + id, group);
	}

	postGroup(group: Group) {
		return this.http.post(this.host.host + "/api/Groups", group);
	}

	deleteGroup(id: number) {
		return this.http.delete(this.host.host + "/api/Groups/" + id);
	}
}