import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Especialidade } from 'src/app/shared/model/especialidade.model';
import { Medico } from 'src/app/shared/model/medico.model';
import { EspecialidadeService } from 'src/app/shared/service/especialidade/especialidade.service';
import { MedicoService } from 'src/app/shared/service/medico/medico.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  today: Date = new Date(); // Define a data mínima como o dia de hoje
  options: string[] = ['One', 'Two', 'Three'];
  especialidades: Especialidade[] = [];
  filteredEspecialidade!: Observable<Especialidade[]>;
  medicos: Medico[] = [];

  constructor(
    private fb: FormBuilder,
    private especialidadeService: EspecialidadeService,
    private cdr: ChangeDetectorRef,
    private medicoService: MedicoService
  ) {
    this.form = this.fb.group({
      especialidade: [null, Validators.required],
      data: [null],
    });
  }

  ngOnInit() {
    this.listEspecialidades();
    this.cdr.detectChanges();
  }

  private _filter(value: string): Especialidade[] {
    const filterValue = value.toLowerCase();
    return this.especialidades.filter((medico) =>
      medico.nome.toLowerCase().includes(filterValue)
    );
  }

  private listEspecialidades() {
    this.especialidadeService.getEspecialidadeAll().subscribe((resp) => {
      this.especialidades = resp.data;
      this.filteredEspecialidade =
        this.form.get('especialidade')?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        ) ?? new Observable<Especialidade[]>();
    });
  }

  getMedicosByEspecialidade(idEspecialidade: string) {
    this.medicoService.medicoByEspecialidade(idEspecialidade).subscribe((resp => {
      this.medicos = resp.data;
    }))
  }
}
