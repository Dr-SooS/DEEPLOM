import {Component, OnInit} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {SemestersService} from "../../../services/semesters.service ";
import {Semester} from "../../../models/Semester";

@Component({
	selector: 'all-semesters',
	templateUrl: './allSemesters.component.html',
})
export class AllSemestersComponent {

	semesters: Semester[];

	constructor(private http: HttpClient,
				private host: HostService,
				private semestersService: SemestersService) { }

	ngOnInit() {
		this.semestersService.getSemesters().subscribe(res => this.semesters = res as Semester[])
	}

	onDelete(id: number) {
		this.semestersService.deleteSemester(id).subscribe(res => {
			this.semestersService.getSemesters().subscribe(res => this.semesters = res as Semester[]);
		});
	}
}
