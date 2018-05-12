import {Component, OnInit} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Director} from "../../../models/Director";
import {DirectorsService} from "../../../services/directors.service";

@Component({
	selector: 'all-directors',
	templateUrl: './allDirectors.component.html',
})
export class AllDirectorsComponent {

	directors: Director[];

	constructor(private http: HttpClient,
				private host: HostService,
				private directorsService: DirectorsService,) { }

	ngOnInit() {
		this.directorsService.getDirectors().subscribe(res => this.directors = res)
	}

	onDelete(id: number) {
		this.directorsService.deleteDirector(id).subscribe(res => {
			this.directorsService.getDirectors().subscribe(res => this.directors = res);
		});
	}
}
