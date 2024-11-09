import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-product-stock',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatToolbarModule,MatIconModule,MatButtonModule,MatSelectModule,MatOption,NgFor,ReactiveFormsModule,MatDialogModule],
  templateUrl: './product-stock.component.html',
  styleUrl: './product-stock.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ProductStockComponent{
  emForm: FormGroup;
  

  constructor(private _fb : FormBuilder, private _productService: ProductoService, private _dialogRef:MatDialogRef<ProductStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any
  ){
    this.emForm = this._fb.group({
      stock: Number      
    })
  }
  
  
  onFormSubmit(){
    if(this.emForm.valid){
      if(this.data){
        this._productService.updateStockProduct(this.data.id,this.emForm.value).subscribe({
          next : (val : any) => {
            alert('Stock agregado correctamente')
            this._dialogRef.close(true)
          },
          error : (err : any) => {
            console.error(err)
          }
        })
      }
    }
  }
}
