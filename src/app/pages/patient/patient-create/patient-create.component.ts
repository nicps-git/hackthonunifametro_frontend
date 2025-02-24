import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {

  public form : FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group(
      {
        nomeCompleto: ['', Validators.required],
        cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        dataNascimento: ['', Validators.required],
        sexo: ['', Validators.required],
        responsavel: [''],
        parentesco: [''],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        endereco: this.fb.group({
          cep: [''],
          logradouro: ['', Validators.required],
          bairro: ['', Validators.required],
          cidade: ['', Validators.required],
          estado: ['', Validators.required],
          numero: ['', Validators.required],
          complemento: ['']
        }),
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
      
  }

  onSubmit(){}

  menorDeIdade(dataNascimento: Date): boolean {
    const hoje = new Date();
    const nascimento = dataNascimento;
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();
  
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }

    this.validacaoReponsavel(idade)

    return idade < 18;
  }

  validacaoReponsavel(idade: number){
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
}
