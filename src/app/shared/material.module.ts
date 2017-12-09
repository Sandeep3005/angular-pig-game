import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { 
  MatSnackBarModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatDialogModule, 
  MatButtonModule, 
  MatToolbarModule } from "@angular/material";

@NgModule({
  imports:[
    CommonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule 
  ],
  exports: [
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule 
  ]
})

export class MaterialModule {

}