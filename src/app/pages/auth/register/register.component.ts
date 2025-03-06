import { Component, Inject, inject, OnInit } from '@angular/core';
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
import { UsuarioService } from 'src/app/shared/service/usuario-service/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  public loading: boolean = false;
  public hidePassword = true;
  public hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.form = this.fb.group(
      {
        nome: [null, Validators.required],
        sobrenome: [null, Validators.required],
        cpf: [
          null,
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(14),
          ],
        ],
        dataNascimento: [null, Validators.required],
        sexo: [null, Validators.required],
        responsavel: [null],
        parentesco: [null],
        telefone: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
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
      this.dateAdapter.setLocale('br')
  }

  onSubmit() {
    this.loading = true;
    const paciente = this.form.value;
    console.log(paciente);

    // Formatando a data antes de enviar
    paciente.dataNascimento = this.formatarDataNascimento(
      paciente.dataNascimento
    );


    this.usuarioService.createUsuarioPaciente(paciente).subscribe({
      next: (resp: any) => {
        if (resp?.data) {
          this.openSnackBar('Usuário cadastrado com sucesso!', '');
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
        }
        this.loading = false;
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

  formatarDataNascimento(data: string): string {
    const [day, month, year] = data.split("/");
    const nascimento = new Date(`${year}-${month}-${day}T00:00:00`);
    const dia = nascimento.getDate().toString().padStart(2, '0'); // Pega o dia e adiciona zero à esquerda se necessário
    const mes = (nascimento.getMonth() + 1).toString().padStart(2, '0'); // Meses começam em 0, então adicionamos +1
    return `${dia}-${mes}`;
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

  menorDeIdade(dataNascimento: string): boolean {
    const hoje = new Date();
    const [day, month, year] = dataNascimento.split("/");
    const nascimento = new Date(`${year}-${month}-${day}T00:00:00`);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    this.validacaoReponsavel(idade);

    return idade < 18;
  }

  validacaoReponsavel(idade: number) {
    const responsavelControl = this.form.get('responsavel');
    const parentesco = this.form.get('parentesco');

    if (idade < 18) {
      responsavelControl?.setValidators(Validators.required);
      parentesco?.setValidators(Validators.required);
    } else {
      responsavelControl?.clearValidators();
      parentesco?.clearValidators();
    }

    responsavelControl?.updateValueAndValidity();
    parentesco?.updateValueAndValidity();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
