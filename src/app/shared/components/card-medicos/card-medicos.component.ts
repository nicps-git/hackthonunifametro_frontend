import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Medico } from '../../model/medico.model';
import { formatDateYYYYMMDD } from '../../util/formatDate';

@Component({
  selector: 'app-card-medicos',
  templateUrl: './card-medicos.component.html',
  styleUrls: ['./card-medicos.component.css'],
  encapsulation: ViewEncapsulation.None, // Remove o encapsulamento de estilos
})
export class CardMedicosComponent {
  @Input() medico: Medico | undefined;
  @Output() eventSelectDate: EventEmitter<any> = new EventEmitter();
  readonly panelOpenState = signal(false);
  selected: Date | null = null; // Inicializa como null
  today: Date = new Date(); // Define a data mínima como o dia de hoje

  // Gera os meses a partir do dia atual
  getMesesAPartirDoAtual(): any[] {
    const diasDoAno = this.getTodosDiasDoAno();
    return diasDoAno.filter((dia) => dia.data >= new Date());
  }

  // Gera todos os dias do ano
  getTodosDiasDoAno(): any[] {
    const ano = new Date().getFullYear();
    const diasDoAno = [];
    for (let i = 0; i < 365; i++) {
      const dia = new Date(ano, 0, 1 + i);
      const horariosDisponiveis = this.getHorariosPorData(dia);
      diasDoAno.push({ data: dia, horarios: horariosDisponiveis });
    }
    return diasDoAno;
  }

  // Retorna os horários disponíveis para uma data específica
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

  selectedHorario: string | null = null;

  selecionarHorario(horario: string, dia: any): void {
    this.selectedHorario = this.selectedHorario === horario ? null : horario;
    this.eventSelectDate.emit({
      data: new Date(dia).toISOString().slice(0, 10),
      horario: this.selectedHorario,
      idMedico: this.medico?.id,
    });
  }

  isHorarioSelecionado(horario: string): boolean {
    return this.selectedHorario === horario;
  }
}
