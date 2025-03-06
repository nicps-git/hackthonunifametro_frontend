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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

import { FrameComponent } from './components/frame/frame.component';
import { ButtonWithLoadingComponent } from './components/button-with-loading/button-with-loading.component';
import { MatCardModule } from '@angular/material/card';
import { UsuarioService } from './service/usuario-service/usuario.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthService } from './service/auth-service/auth.service';
import { MinutesFormatPipe } from './pipe/minutes-format.pipe';
import { CpfFormatDirective } from './diretive/cpf-format.directive';
@NgModule({
  declarations: [
    AddressComponent,
    FrameComponent,
    ButtonWithLoadingComponent,
    MinutesFormatPipe,
    CpfFormatDirective,
  ],
  imports: [
    CommonModule,
      MatFormFieldModule,
       ReactiveFormsModule,
       MatInputModule,
       MatSelectModule,
       MatNativeDateModule,
       MatIconModule,
       HttpClientModule,
       MatCardModule,
       MatProgressSpinnerModule,
       MatButtonModule,
           NgxMaskDirective
  ],
  exports:[
    AddressComponent,
    FrameComponent,
    ButtonWithLoadingComponent,
    MinutesFormatPipe,
    CpfFormatDirective
  ],
  providers: [AddressService, UsuarioService, provideNgxMask(), AuthService]
  
})
export class SharedModule {}
