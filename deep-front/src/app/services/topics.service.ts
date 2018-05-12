import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "../models/Topic";
import {BaseService} from "./base.service";

@Injectable()
export class TopicsService extends BaseService{
	constructor(protected http: HttpClient, protected host: HostService)
	{
		super(http, host);
	}


	getTopics(): Observable<Topic[]> {
		return this.http.get<Topic[]>(this.host.host + "/api/Topics");
	}
	
	getTopic(id: number): Observable<Topic> {
		return this.http.get<Topic>(this.host.host + "/api/Topics/" + id);
	}

	putTopic(id: number, topic: Topic) {
		return this.http.put(this.host.host + "/api/Topics/" + id, topic);
	}

	postTopic(topic: Topic) {
		return this.http.post(this.host.host + "/api/Topics", topic);
	}

	deleteTopic(id: number) {
		return this.http.delete(this.host.host + "/api/Topics/" + id);
	}
}