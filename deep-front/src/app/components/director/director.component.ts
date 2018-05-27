import {Component} from '@angular/core';
import {Director} from '../../models/Director';
import {College} from '../../models/College';
import {UsersService} from '../../services/users.service';
import {DirectorsService} from '../../services/directors.service';
import {User} from '../../models/User';

@Component({
	selector: 'director',
	templateUrl: './director.component.html',
})
export class DirectorComponent {

  director: Director = new Director();

	constructor(
	  private userService: UsersService,
    private directorService: DirectorsService) {}

	ngOnInit() {
	  this.director.college = new College();
	  this.userService.getUser().subscribe(res => {
	    this.directorService.getDirectorByUser((res as User).id).subscribe(res => {
	      this.director = res as Director;
      })
    })
  }
}
