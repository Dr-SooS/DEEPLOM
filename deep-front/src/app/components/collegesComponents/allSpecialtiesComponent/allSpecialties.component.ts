import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Specialty} from "../../../models/Specialty";
import {SpecialtiesService} from "../../../services/specialties.service";

@Component({
	selector: 'all-specialties',
	templateUrl: './allSpecialties.component.html',
})
export class AllSpecialtiesComponent {

	specialties: Specialty[];
	@Input() collegeId: number;

	constructor(private http: HttpClient,
				private host: HostService,
				private specialtiesService: SpecialtiesService) { }

	ngOnInit() {
		this.specialtiesService.getCollegeSpecialties(this.collegeId).subscribe(res => this.specialties = res as Specialty[])
	}

	onDelete(id: number) {
		this.specialtiesService.deleteSpecialty(id).subscribe(res => {
			this.specialtiesService.getCollegeSpecialties(this.collegeId).subscribe(res => this.specialties = res as Specialty[]);
		});
	}
}
