import { Component,Inject,OnInit,ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule,MatOption } from '@angular/material/select';
import { NgFor } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule}  from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef,MatDialog,MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormEventService } from '../../../core/services/form-event.service';
import { CustomerService } from '../../../core/services/customer.service';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-event-add-edit',
  standalone: true,
  imports: [MatDatepickerModule,MatFormFieldModule,MatInputModule,MatToolbarModule,MatIconModule,MatButtonModule,MatSelectModule,MatOption,NgFor,ReactiveFormsModule,MatDialogModule],
  templateUrl: './event-add-edit.component.html',
  styleUrl: './event-add-edit.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [DatePipe]
})
export class EventAddEditComponent {

  type: string[] = ['Boda', 'Quinceañero','Baby Shower'];
  emForm: FormGroup;
  customers : any[] = [];
  products: any[] = [];  


  constructor(private _fb : FormBuilder, private _eventService: FormEventService, private _dialogRef:MatDialogRef<EventAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any, private _customerService : CustomerService, private datePipe: DatePipe , private _productService: ProductoService
  ){
    this.emForm = this._fb.group({
      name : '' ,
      type : '' ,
      price : Number,
      numberAssistants : Number,
      description : '' ,
      date : '' ,
      location : '' ,
      idCustomer : this._fb.group({id : Number}),
      productsList: [[]]  
    })
  }
  ngOnInit(): void {
    this.emForm.patchValue(this.data);
    this.loadCustomers();
    this.loadProducts();
  }

  get idCustomerControl(): FormControl {
    return this.emForm.get('idCustomer.id') as FormControl;
  }

  loadCustomers() {
    this._customerService.getCustomerList().subscribe({
      next : (val : any) => {
        this.customers = val
      },
      error : (err : any) => {
        console.error(err)
      }
    })
  }

  loadProducts() {
    this._productService.getProductList().subscribe({
      next: (val: any) => {
        this.products = val;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  
  onFormSubmit(){
    if(this.emForm.valid){
      if(this.data){
        this._eventService.updateEvent(this.data.id,this.emForm.value).subscribe({
          next : (val : any) => {
            alert('Producto editado correctamente')
            this._dialogRef.close(true)
          },
          error : (err : any) => {
            console.error(err)
          }
        })
      }else{      
      const formattedDate = this.datePipe.transform(this.emForm.value.date, 'yyyy-MM-dd');
      const productsListFormatted = this.emForm.value.productsList.map((id: number) => ({ id }));

      const formData = {
        ...this.emForm.value,
        date: formattedDate,
        productsList: productsListFormatted  
      };
      console.log(formData)
      this._eventService.addEvent(formData).subscribe({
        next : (val: any) =>{
          alert('Proforma registrada con exito')
          this._dialogRef.close(true)
        },
        error: (err) => {
          console.error(err)
        },
      })
      }
    }
  }
}
