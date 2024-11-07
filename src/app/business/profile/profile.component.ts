import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import { MatSortModule,MatSort } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserService } from '../../core/services/user.service';
import { error } from 'node:console';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatPaginator,
    MatSort
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit{

  displayedColumns: string[] = ['user_id', 'name', 'phone','role','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, private _userService:UserService  
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }
 
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent); 
    dialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getUserList();
        }
      }
    })   
  }

  getUserList(){
    this._userService.getUserList().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id:number){
    this._userService.deleteUser(id).subscribe({
      next : (res) => {
        alert("Usuario eliminado!")
        this.getUserList();
      },
      error : console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getUserList();
        }
      }
    })         
  }
}