import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {ActivatedRoute} from "@angular/router";
import {College} from "../../../models/College";
import {CollegesService} from "../../../services/colleges.service";

@Component({
	selector: 'edit-college',
	templateUrl: './editCollege.component.html',
})
export class EditCollegeComponent{

	college: College = new College();

	constructor(
		private http: HttpClient,
		private host: HostService,
		private router: ActivatedRoute,
		private collegesService: CollegesService
	) {}
	

	ngOnInit() {
		this.router.params.subscribe(p => this.college.id = +p['id']);
		this.collegesService.getCollege(this.college.id).subscribe(res => this.college = res as College);
	}
	
	onUpdate() {
		this.collegesService.putCollege(this.college.id, this.college).subscribe();
	}
}
