import { Component,Inject,OnInit,ViewEncapsulation  } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule,MatOption } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule}  from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { error } from 'console';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef,MatDialog,MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatToolbarModule,MatIconModule,MatButtonModule,MatSelectModule,MatOption,NgFor,ReactiveFormsModule,MatDialogModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EmpAddEditComponent implements OnInit{
  emForm: FormGroup;
  roles: string[] = ['Admin', 'Vendedor'];

  constructor(private _fb : FormBuilder, private _userService: UserService, private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any
  ){
    this.emForm = this._fb.group({
      name : '' ,
      password : '' ,
      phone: '' ,
      role : ''
    })
  }

  ngOnInit(): void {
    this.emForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.emForm.valid){
      if(this.data){
        this._userService.updateUser(this.data.user_id,this.emForm.value).subscribe({
          next : (val : any) => {
            alert('Usuario editado correctamente')
            this._dialogRef.close(true)
          },
          error : (err : any) => {
            console.error(err)
          }
        })
      }else{      
      this._userService.addUser(this.emForm.value).subscribe({
        next : (val: any) =>{
          alert('Usuario registrado con exito')
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
