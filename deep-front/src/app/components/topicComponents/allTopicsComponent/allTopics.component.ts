import {Component, OnInit} from '@angular/core';
import {Topic} from '../../../models/Topic';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {TopicsService} from "../../../services/topics.service";

@Component({
	selector: 'all-topics',
	templateUrl: './allTopics.component.html',
})
export class AllTopicsComponent {

	topics: Topic[];

	constructor(private http: HttpClient,
				private host: HostService,
				private topicsService: TopicsService,) { }

	ngOnInit() {
		this.topicsService.getTopics().subscribe(res => this.topics = res)
	}

	onDelete(id: number) {
		this.topicsService.deleteTopic(id).subscribe(res => {
			this.topicsService.getTopics().subscribe(res => this.topics = res);
		});
	}
}
