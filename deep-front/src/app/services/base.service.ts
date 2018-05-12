import {HostService} from "./host.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class BaseService {

	constructor(protected http: HttpClient,
				protected host: HostService) { }
}