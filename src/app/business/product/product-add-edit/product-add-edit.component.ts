import { Component,Inject,numberAttribute,OnInit,ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule,MatOption } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule}  from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef,MatDialog,MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductoService } from '../../../core/services/producto.service';
import { SupplierService } from '../../../core/services/supplier.service';
@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatToolbarModule,MatIconModule,MatButtonModule,MatSelectModule,MatOption,NgFor,ReactiveFormsModule,MatDialogModule],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ProductAddEditComponent implements OnInit{
  type: string[] = ['Mesa', 'Silla'];
  emForm: FormGroup;
  suppliers : any[] = [];

  constructor(private _fb : FormBuilder, private _productService: ProductoService, private _dialogRef:MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any, private _supplierService : SupplierService
  ){
    this.emForm = this._fb.group({
      name : '' ,
      type : '' ,
      stock: Number ,
      priceUnit : '',
      idSupplier : this._fb.group({id : Number}),
    })
  }
  ngOnInit(): void {
    this.emForm.patchValue(this.data);
    this.loadSuppliers();
  }

  get idSupplierControl(): FormControl {
    return this.emForm.get('idSupplier.id') as FormControl;
  }

  loadSuppliers() {
    this._supplierService.getSupplierList().subscribe({
      next : (val : any) => {
        this.suppliers = val
      },
      error : (err : any) => {
        console.error(err)
      }
    })
  }
  
  onFormSubmit(){
    if(this.emForm.valid){
      if(this.data){
        this._productService.updateProduct(this.data.id,this.emForm.value).subscribe({
          next : (val : any) => {
            alert('Producto editado correctamente')
            this._dialogRef.close(true)
          },
          error : (err : any) => {
            console.error(err)
          }
        })
      }else{      
        this._productService.addProduct(this.emForm.value).subscribe({
          next : (val: any) =>{
            alert('Producto registrado con exito')
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
