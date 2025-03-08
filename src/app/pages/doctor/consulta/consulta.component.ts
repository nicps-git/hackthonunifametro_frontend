import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      laudoMedico: [''],
      prescricaoMedica: [''],
      afastamento: ['2021-01-01'],
      retorno: ['2021-01-01'],
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    // Lógica para salvar os dados
  }

  onReset(): void {
    this.form.reset();
  }
}
