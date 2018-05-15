import {Component, Inject, Input, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {Specialty} from '../../../models/Specialty';
import {SpecialtiesService} from '../../../services/specialties.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {College} from '../../../models/College';
import {CollegesService} from '../../../services/colleges.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'all-specialties',
  templateUrl: './allSpecialties.component.html',
})
export class AllSpecialtiesComponent {

  @Input() collegeId: number;

  newSpecialty: Specialty = new Specialty();
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private host: HostService,
              private specialtiesService: SpecialtiesService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.specialtiesService.getCollegeSpecialties(this.collegeId).subscribe(res => {
      this.dataSource.data = res as Specialty[];
    });
  }

  onDelete(id: number) {
    this.specialtiesService.deleteSpecialty(id).subscribe(res => {
      this.specialtiesService.getCollegeSpecialties(this.collegeId).subscribe(res => {
        this.dataSource.data = res as Specialty[];
        this.snackBar.open('Специальность успешно удалена');
      });
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateSpecialtyDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {name: this.newSpecialty.name, college: this.newSpecialty.college}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== "")).subscribe(result => {
      this.newSpecialty = result;
      this.specialtiesService.postSpecialty(this.newSpecialty).subscribe(result => {
        this.specialtiesService.getCollegeSpecialties(this.collegeId).subscribe(res => {
          this.dataSource.data = res as Specialty[];
          this.snackBar.open('Специальность успешно создана', null, {duration: 2000});
        });
      });
    });
  }
}

@Component({
  selector: 'create-specialty-dialog',
  templateUrl: 'create-specialty-dialog.html',
})
export class CreateSpecialtyDialog {

  colleges: College[];

  constructor(
    public dialogRef: MatDialogRef<CreateSpecialtyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private collegesService: CollegesService) { }

  ngOnInit() {
    this.collegesService.getColleges().subscribe(res => this.colleges = res as College[]);
  }

}
