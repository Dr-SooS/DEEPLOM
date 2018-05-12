import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Subject} from "../../../models/Subject";
import {SubjectsService} from "../../../services/subjects.service";

@Component({
	selector: 'create-subject',
	templateUrl: './createSubject.component.html',
})
export class CreateSubjectComponent {

	subject: Subject = new Subject();

	constructor(
		private http: HttpClient,
		private host: HostService,
		private subjectService: SubjectsService
	) {}
	
	ngOnInit() {
	}

	onCreate() {
		this.subjectService.postSubject(this.subject).subscribe();
	}
}
