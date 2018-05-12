import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Topic} from "../../../models/Topic";
import {TopicsService} from "../../../services/topics.service";

@Component({
	selector: 'create-topic',
	templateUrl: './createTopic.component.html',
})
export class CreateTopicComponent {

	topic: Topic = new Topic();

	constructor(
		private http: HttpClient,
		private host: HostService,
		private topicService: TopicsService
	) {}
	
	ngOnInit() {
	}

	onCreate() {
		this.topicService.postTopic(this.topic).subscribe();
	}
}
