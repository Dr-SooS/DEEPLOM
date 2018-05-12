import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {College} from "../models/College";
import {Specialty} from "../models/Specialty";
import {BaseService} from "./base.service";

@Injectable()
export class SpecialtiesService extends BaseService{
	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getSpecialties(): Observable<Specialty[]> {
		return this.http.get<Specialty[]>(this.host.host + "/api/Specialties");
	}
	
	getCollegeSpecialties(collegeId: number): Observable<Specialty[]> {
		return this.http.get<Specialty[]>(this.host.host + "/api/Specialties/college/" + collegeId);
	}

	getSpecialty(id: number): Observable<Specialty> {
		return this.http.get<Specialty>(this.host.host + "/api/Specialties/" + id);
	}

	putSpecialty(id: number, specialty: Specialty) {
		return this.http.put(this.host.host + "/api/Specialties/" + id, specialty);
	}

	postSpecialty(specialty: Specialty) {
		return this.http.post(this.host.host + "/api/Specialties", specialty);
	}

	deleteSpecialty(id: number) {
		return this.http.delete(this.host.host + "/api/Specialties/" + id);
	}
}