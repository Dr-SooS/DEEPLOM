import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Director} from "../models/Director";
import {HttpClient} from "@angular/common/http";
import {HostService} from "./host.service";
import {BaseService} from "./base.service";

@Injectable()
export class DirectorsService extends BaseService{

	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getDirectors(): Observable<Director[]> {
		return this.http.get<Director[]>(this.host.host + "/api/Directors");
	}

	getDirector(id: number): Observable<Director> {
		return this.http.get<Director>(this.host.host + "/api/Directors/" + id);
	}

	postDirector(director: Director) {
		return this.http.post(this.host.host + "/api/Directors", director);
	}

	putDirector(id: number,  director: Director) {
		return this.http.put(this.host.host + "/api/Directors/" + id, director);
	}

	deleteDirector(id: number) {
		return this.http.delete(this.host.host + "/api/Directors/" + id);
	}

  getDirectorByUser(id: string) {
    return this.http.get<Director>(this.host.host + "/api/Directors/user/" + id);
  }
}
