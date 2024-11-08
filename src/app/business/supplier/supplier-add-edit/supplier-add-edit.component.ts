import { Component ,Inject,OnInit,ViewEncapsulation} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule,MatOption } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule}  from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef,MatDialog,MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-add-edit',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatToolbarModule,MatIconModule,MatButtonModule,MatSelectModule,MatOption,NgFor,ReactiveFormsModule,MatDialogModule],
  templateUrl: './supplier-add-edit.component.html',
  styleUrl: './supplier-add-edit.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SupplierAddEditComponent implements OnInit{
  emForm: FormGroup;

  constructor(private _fb : FormBuilder, private _supplierService: SupplierService, private _dialogRef:MatDialogRef<SupplierAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any
  ){
    this.emForm = this._fb.group({
      name : '' ,
      nameContact : '' ,
      email: '' ,
      phone : '',
      address : '',
    })
  }
  ngOnInit(): void {
    this.emForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.emForm.valid){
      if(this.data){
        this._supplierService.updateSupplier(this.data.id,this.emForm.value).subscribe({
          next : (val : any) => {
            alert('Cliente editado correctamente')
            this._dialogRef.close(true)
          },
          error : (err : any) => {
            console.error(err)
          }
        })
      }else{      
      this._supplierService.addSupplier(this.emForm.value).subscribe({
        next : (val: any) =>{
          alert('Cliente registrado con exito')
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
