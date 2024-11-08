import { Component , OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierAddEditComponent } from './supplier-add-edit/supplier-add-edit.component';

@Component({
  selector: 'app-supplier',
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
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export default class SupplierComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'nameContact','phone','email','address','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, private _supplierService:SupplierService  
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }
 
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(SupplierAddEditComponent); 
    dialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getUserList();
        }
      }
    })   
  }

  getUserList(){
    this._supplierService.getSupplierList().subscribe({
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

  deleteSupplier(id:number){
    this._supplierService.deleteSupplier(id).subscribe({
      next : (res) => {
        alert("Usuario eliminado!")
        this.getUserList();
      },
      error : console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(SupplierAddEditComponent,{
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
