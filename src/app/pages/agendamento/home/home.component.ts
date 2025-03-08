import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { BodyAgendamento } from 'src/app/shared/model/agendamento.model';
import { Especialidade } from 'src/app/shared/model/especialidade.model';
import { Medico } from 'src/app/shared/model/medico.model';
import { AgendamentoService } from 'src/app/shared/service/agendamento/agendamento.service';
import { AuthService } from 'src/app/shared/service/auth-service/auth.service';
import { EspecialidadeService } from 'src/app/shared/service/especialidade/especialidade.service';
import { MedicoService } from 'src/app/shared/service/medico/medico.service';

interface SelectDate {
  data: string;
  idMedico: string;
  horario: string;
}

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
  selectedDate: SelectDate = {} as SelectDate;
  private _snackBar = inject(MatSnackBar);
  loading: boolean = false;

  diasDisponiveis = [
    { data: new Date(2025, 2, 7), horarios: ['09:00', '11:00', '15:00'] },
    { data: new Date(2025, 3, 15), horarios: ['08:00', '13:00'] },
    { data: new Date(2025, 4, 3), horarios: ['10:00', '16:30'] },
  ];

  constructor(
    private fb: FormBuilder,
    private especialidadeService: EspecialidadeService,
    private cdr: ChangeDetectorRef,
    private medicoService: MedicoService,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private authService : AuthService
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
    this.medicoService
      .medicoByEspecialidade(idEspecialidade)
      .subscribe((resp) => {
        this.medicos = resp.data;
        this.medicos.forEach((e) => {
          e.disponibilidade = this.diasDisponiveis;
        });
      });
  }

  selecionarDataHora(data: any) {
    this.selectedDate = data;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  agendarConsulta() {
    let agendamento = new BodyAgendamento(
      this.authService.idUser(),
      this.selectedDate.idMedico,
      this.selectedDate.data,
      this.selectedDate.horario
    );
    this.loading = true;
    this.agendamentoService.agendamento(agendamento).subscribe({
      next: (resp: any) => {
        if (resp?.data) {
          this.openSnackBar('Agendamento realizado com sucesso!', '');
          setTimeout(() => {
            this.router.navigate(['/agendamento/paciente']);
            this.loading = false;

          }, 3000);
        }
      },
      error: (err) => {
        console.error('Erro ao agendar consulta:', err);
        this.openSnackBar(
          'Erro ao agendar consulta. Tente novamente.',
          'Fechar'
        );
        this.loading = false;
      },
    });
  }
}
