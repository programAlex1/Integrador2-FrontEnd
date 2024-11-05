import { Component,ViewEncapsulation  } from '@angular/core';
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
@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatToolbarModule,MatIconModule,MatButtonModule,MatSelectModule,MatOption,NgFor,ReactiveFormsModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EmpAddEditComponent {
  emForm: FormGroup;
  roles: string[] = ['Admin', 'Vendedor'];

  constructor(private _fb : FormBuilder, private _userService: UserService, private _dialogRef:DialogRef<EmpAddEditComponent>){
    this.emForm = this._fb.group({
      name : '' ,
      password : '' ,
      phone: '' ,
      role : ''
    })
  }

  onFormSubmit(){
    if(this.emForm.valid){
      this._userService.addUser(this.emForm.value).subscribe({
        next : (val: any) =>{
          alert('Usuario registrado con exito')
          this._dialogRef.close()
        },
        error: (err) => {
          console.error(err)
        },
      })
    }
  }
}
