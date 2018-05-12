import {Component, OnInit} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {CollegesService} from "../../../services/colleges.service";

@Component({
	selector: 'all-colleges',
	templateUrl: './allColleges.component.html',
})
export class AllCollegesComponent {

	colleges: College[];

	constructor(private http: HttpClient,
				private host: HostService,
				private collegesService: CollegesService,) { }

	ngOnInit() {
		this.collegesService.getColleges().subscribe(res => this.colleges = res);
	}

	onDelete(id: number) {
		this.collegesService.deleteCollege(id).subscribe(res => {
			this.collegesService.getColleges().subscribe(res => this.colleges = res);
		});
	}
}
