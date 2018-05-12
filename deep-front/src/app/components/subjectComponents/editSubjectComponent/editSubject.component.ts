import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "../../../models/Subject";
import {SubjectsService} from "../../../services/subjects.service";

@Component({
	selector: 'edit-subject',
	templateUrl: './editSubject.component.html',
})
export class EditSubjectComponent{

	subject: Subject = new Subject();
	id: number;

	constructor(
		private http: HttpClient,
		private host: HostService,
		private router: ActivatedRoute,
		private subjectsService: SubjectsService
	) {}
	

	ngOnInit() {
		this.router.params.subscribe(p => this.id = +p['id']);
		this.subjectsService.getSubject(this.id).subscribe(res => this.subject = res as Subject);
	}
	
	onUpdate() {
		this.subjectsService.putSubject(this.id, this.subject).subscribe();
	}
}
