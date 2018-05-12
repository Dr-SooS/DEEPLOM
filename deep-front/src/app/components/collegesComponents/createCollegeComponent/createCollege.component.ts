import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {College} from "../../../models/College";
import {CollegesService} from "../../../services/colleges.service";

@Component({
	selector: 'create-college',
	templateUrl: './createCollege.component.html',
})
export class CreateCollegeComponent {

	college: College = new College();

	constructor(
		private http: HttpClient,
		private host: HostService,
		private collegeService: CollegesService
	) {}
	
	ngOnInit() {
	}

	onCreate() {
		this.collegeService.postCollege(this.college).subscribe();
	}
}
