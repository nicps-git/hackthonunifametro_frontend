import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AddressComponent } from './components/address/address.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    FrameComponent,
    ButtonWithLoadingComponent,
    MinutesFormatPipe,
    CpfFormatDirective,
    AddressComponent,
    HeaderComponent,
    CustomDialogComponent
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
      NgxMaskDirective,
      MatToolbarModule,
      MatDialogModule
  ],
  exports:[
    AddressComponent,
    FrameComponent,
    ButtonWithLoadingComponent,
    MinutesFormatPipe,
    CpfFormatDirective,
    HeaderComponent
  ],
  providers: [AddressService, UsuarioService, provideNgxMask(), AuthService]
  
})
export class SharedModule {}
