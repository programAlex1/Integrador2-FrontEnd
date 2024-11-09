import { Component , OnInit,ViewChild} from '@angular/core';
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
import { ProductoService } from '../../core/services/producto.service';
import { FormEventService } from '../../core/services/form-event.service';
import { EventAddEditComponent } from './event-add-edit/event-add-edit.component';

@Component({
  selector: 'app-form-event',
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
    MatSort],
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css'
})
export default class FormEventComponent {
  displayedColumns: string[] = ['id', 'name', 'type','numberAssistants','description','price','date','location','idCustomer','productsList','action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, private _eventService:FormEventService  
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductNames(productsList: any[]): string {
    return productsList.map(product => product.name).join(', ');
  }

  getProductList(){
    this._eventService.getEventList().subscribe({
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
  openProductForm() {
    const dialogRef = this._dialog.open(EventAddEditComponent); 
    dialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getProductList();
        }
      }
    })   
  }

  openStockForm(data:any) {
    const dialogRef = this._dialog.open(EventAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getProductList();
        }
      }
    })    
  }

  deleteProduct(id:number){
    this._eventService.deleteEvent(id).subscribe({
      next : (res) => {
        alert("Producto eliminado!")
        this.getProductList();
      },
      error : console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EventAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getProductList();
        }
      }
    })         
  }

}
