import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule, MatIconModule, MatTableModule, MatSortModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatCardModule, MatSelectModule, MatExpansionModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class MaterialModule {
}
