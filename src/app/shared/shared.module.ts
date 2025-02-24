import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from './service/address-service/address.service';

@NgModule({
  declarations: [
    AddressComponent
  ],
  imports: [
    CommonModule,
      MatFormFieldModule,
       ReactiveFormsModule,
       MatInputModule,
       MatSelectModule,
       MatNativeDateModule,
       MatIconModule,
       HttpClientModule
  ],
  exports:[AddressComponent],
  providers: [AddressService]
  
})
export class SharedModule {}
