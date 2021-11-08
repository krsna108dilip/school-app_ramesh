import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatSliderModule,
MatSelectModule,
MatTableModule,
MatDatepickerModule,
MatNativeDateModule,
MatSnackBarModule,
MatGridListModule,
MatMenuModule,
MatCardModule,
MatCheckboxModule,
MatRadioModule,
MatToolbarModule,
MatSortModule,
MatPaginatorModule,
MatAutocompleteModule,
MatIconModule,

} from '@angular/material';

const materailArray = [
MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatSliderModule,
MatSelectModule,
MatTableModule,
MatDatepickerModule,
MatNativeDateModule,
MatSnackBarModule,
MatGridListModule,
MatMenuModule,
MatCardModule,
MatCheckboxModule,
MatRadioModule,
MatToolbarModule,
MatSortModule,
MatPaginatorModule,
MatAutocompleteModule,
MatIconModule,

];

@NgModule({
  declarations: [],
  imports: [materailArray],
  exports: [materailArray]

})
export class MaterialModule { }
