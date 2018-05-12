import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {ActivatedRoute} from "@angular/router";
import {College} from "../../../models/College";
import {CollegesService} from "../../../services/colleges.service";
import {Specialty} from "../../../models/Specialty";
import {SpecialtiesService} from "../../../services/specialties.service";

@Component({
	selector: 'edit-specialty',
	templateUrl: './editSpecialty.component.html',
})
export class EditSpecialtyComponent {

	specialty: Specialty = new Specialty();
	colleges: College[] = [];

	constructor(private http: HttpClient,
				private host: HostService,
				private router: ActivatedRoute,
				private specialtiesService: SpecialtiesService,
				private collegesSrevice: CollegesService) {}


	ngOnInit() {
		this.specialty.college = new College();
		this.router.params.subscribe(p => this.specialty.id = +p['id']);

		this.specialtiesService.getSpecialty(this.specialty.id).subscribe(res => this.specialty = res as Specialty);
		this.collegesSrevice.getColleges().subscribe(res => this.colleges = res as College[]);
	}

	onUpdate() {
		this.specialtiesService.putSpecialty(this.specialty.id, this.specialty).subscribe();
	}
}
