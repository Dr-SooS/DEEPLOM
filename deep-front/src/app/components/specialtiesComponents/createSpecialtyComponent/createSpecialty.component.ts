import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {College} from "../../../models/College";
import {CollegesService} from "../../../services/colleges.service";
import {Specialty} from "../../../models/Specialty";
import {SpecialtiesService} from "../../../services/specialties.service";

@Component({
	selector: 'create-specialty',
	templateUrl: './createSpecialty.component.html',
})
export class CreateSpecialtyComponent {

	specialty: Specialty = new Specialty();
	colleges: College[] = [];

	constructor(
		private http: HttpClient,
		private host: HostService,
		private collegeService: CollegesService,
		private specialtiesService: SpecialtiesService
	) {}
	
	ngOnInit() {
		this.specialty.college = new College();
		this.collegeService.getColleges().subscribe(res => this.colleges = res as College[]);
	}

	onCreate() {
		this.specialtiesService.postSpecialty(this.specialty).subscribe();
	}
}
