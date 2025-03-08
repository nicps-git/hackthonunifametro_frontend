import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Especialidade } from 'src/app/shared/model/especialidade.model';
import { EspecialidadeService } from 'src/app/shared/service/especialidade/especialidade.service';
import { MedicoService } from 'src/app/shared/service/medico/medico.service';
import { UsuarioService } from 'src/app/shared/service/usuario-service/usuario.service';
import { formatDateYYYYMMDD } from 'src/app/shared/util/formatDate';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css'],
})
export class CreateDoctorComponent {
  public form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  public loading: boolean = false;
  public hidePassword = true;
  public hideConfirm = true;
  especialidades: Especialidade[] = [];
  filteredEspecialidade!: Observable<Especialidade[]>;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private especialidadeService: EspecialidadeService,
    private medicoService: MedicoService
  ) {
    this.form = this.fb.group(
      {
        nome: [null, Validators.required],
        sobrenome: [null, Validators.required],
        cnpj: [
          null,
          [
            Validators.required,
          ],
        ],
        crm: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ],
        ],
        dataNascimento: [null, Validators.required],
        sexo: [null, Validators.required],
        telefone: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        idEspecialidade: [null, Validators.required],
        endereco: this.fb.group({
          cep: [null],
          logradouro: [null, Validators.required],
          bairro: [null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required],
          numero: [null, Validators.required],
          complemento: [null],
        }),
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmarSenha: [null, [Validators.required]],
      },
      { validator: this.passwordConfirmarSenhaValidator() } // Aplica a validação personalizada
    );
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('br');
    this.listEspecialidades()
  }

  onSubmit() {
    this.loading = true;
    const medico = this.form.value;

    // Formatando a data antes de enviar
    medico.dataNascimento = formatDateYYYYMMDD(medico.dataNascimento);
    medico.idEspecialidade = this.especialidades.find(e => e.nome == medico.idEspecialidade)?.id; 

    this.usuarioService.createUsuarioMedico(medico).subscribe({
      next: (resp: any) => {
        if (resp?.data) {
          this.openSnackBar('Usuário cadastrado com sucesso!', '');
          setTimeout(() => {
            this.router.navigate(['/medico/lista']);
            this.loading = false;
          }, 3000);
        }
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
        this.openSnackBar(
          'Erro ao cadastrar usuário. Tente novamente.',
          'Fechar'
        );
        this.loading = false;
      },
    });
  }

  private listEspecialidades() {
    this.especialidadeService.getEspecialidadeAll().subscribe((resp) => {
      this.especialidades = resp.data;
      this.filteredEspecialidade =
        this.form.get('idEspecialidade')?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        ) ?? new Observable<Especialidade[]>();
    });
  }

  private _filter(value: string): Especialidade[] {
    const filterValue = value.toLowerCase();
    return this.especialidades.filter((medico) =>
      medico.nome.toLowerCase().includes(filterValue)
    );
  }

  passwordConfirmarSenhaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmarSenha = control.get('confirmarSenha')?.value;
      if (password && confirmarSenha && password !== confirmarSenha) {
        this.form.get('confirmarSenha')?.setErrors({ invalidPassword: true });
        return { passwordMismatch: true }; // Erro se as senhas não forem iguais
      }
      return null; //
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 30000,
    });
  }
}
