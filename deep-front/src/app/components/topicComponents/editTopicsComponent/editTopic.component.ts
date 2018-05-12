import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {ActivatedRoute} from "@angular/router";
import {Topic} from "../../../models/Topic";
import {TopicsService} from "../../../services/topics.service";

@Component({
	selector: 'edit-topic',
	templateUrl: './editTopic.component.html',
})
export class EditTopicComponent{

	topic: Topic = new Topic();
	id: number;

	constructor(
		private http: HttpClient,
		private host: HostService,
		private router: ActivatedRoute,
		private topicsService: TopicsService
	) {}
	

	ngOnInit() {
		this.router.params.subscribe(p => this.id = +p['id']);
		this.topicsService.getTopic(this.id).subscribe(res => this.topic = res as Topic);
	}
	
	onUpdate() {
		this.topicsService.putTopic(this.id, this.topic).subscribe();
	}
}
