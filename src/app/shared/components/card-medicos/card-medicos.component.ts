import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Medico } from '../../model/medico.model';

@Component({
  selector: 'app-card-medicos',
  templateUrl: './card-medicos.component.html',
  styleUrls: ['./card-medicos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardMedicosComponent implements OnInit{
  @Input() medico: Medico | undefined;
  @Output() eventSelectDate: EventEmitter<any> = new EventEmitter();
  readonly panelOpenState = signal(false);
  selected: Date | null = null; 
  diaSelecionado: string = '';
  today: Date = new Date(); 
  diasPorMes: { [mes: string]: any[] } = {};
  meses: string[] = []; 

  getHorariosPorData(dia: Date): string[] {
    const diaEncontrado = this.medico?.disponibilidade.find(
      (d) =>
        new Date(d.data).toISOString().split('T')[0] ===
        dia.toISOString().split('T')[0]
    );
    return diaEncontrado ? diaEncontrado.horarios : [];
  }

  getDiasComHorariosDisponiveis(): any[] {
    return (
      this.medico?.disponibilidade.filter(
        (dia) => dia.horarios && dia.horarios.length > 0
      ) || []
    );
  }
  ngOnInit(): void {
    this.diasPorMes = this.agrupaPorMes(this.getDiasComHorariosDisponiveis());
    this.meses = Object.keys(this.diasPorMes); // Obtém as chaves (nomes dos meses)
  }

  selectedHorario: string | null = null;

  selecionarHorario(horario: string, dia: any): void {
    this.selectedHorario = this.selectedHorario === horario ? null : horario;
    this.diaSelecionado = this.diaSelecionado === dia ? null : dia;
    this.eventSelectDate.emit({
      data: new Date(dia).toISOString().slice(0, 10),
      horario: this.selectedHorario,
      idMedico: this.medico?.id,
    });
  }

  isHorarioSelecionado(dia: string, horario: string): boolean {
    return this.diaSelecionado === dia && this.selectedHorario == horario;
  }

  agrupaPorMes(dias: any[]): { [mes: string]: any[] } {
    return dias.reduce((acc, dia) => {
      const mes = new Date(dia.data).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
      acc[mes] = acc[mes] || [];
      acc[mes].push(dia);
      return acc;
    }, {});
  }
  
}
