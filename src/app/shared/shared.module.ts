import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from './service/address-service/address.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { CardMedicosComponent } from './components/card-medicos/card-medicos.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    FrameComponent,
    ButtonWithLoadingComponent,
    MinutesFormatPipe,
    CpfFormatDirective,
    AddressComponent,
    HeaderComponent,
    CardMedicosComponent,
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
    MatExpansionModule,
    MatDatepickerModule
    
  ],
  exports: [
    AddressComponent,
    FrameComponent,
    ButtonWithLoadingComponent,
    MinutesFormatPipe,
    CpfFormatDirective,
    HeaderComponent,
    CardMedicosComponent
  ],
  providers: [AddressService, UsuarioService, provideNgxMask(), AuthService,     { provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class SharedModule {}
