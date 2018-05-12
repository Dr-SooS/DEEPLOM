import {Component, OnInit} from '@angular/core';
import {Subject} from '../../../models/Subject';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {SubjectsService} from "../../../services/subjects.service";

@Component({
	selector: 'all-subjects',
	templateUrl: './allSubjects.component.html',
})
export class AllSubjectsComponent {

	subjects: Subject[];

	constructor(private http: HttpClient,
				private host: HostService,
				private subjectsService: SubjectsService,) { }

	ngOnInit() {
		this.subjectsService.getSubjects().subscribe(res => this.subjects = res)
	}

	onDelete(id: number) {
		this.subjectsService.deleteSubject(id).subscribe(res => {
			this.subjectsService.getSubjects().subscribe(res => this.subjects = res);
		});
	}
}
