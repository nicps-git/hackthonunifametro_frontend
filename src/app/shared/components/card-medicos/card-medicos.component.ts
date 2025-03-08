import { Component, Input, signal, ViewEncapsulation } from '@angular/core';
import { Medico } from '../../model/medico.model';

@Component({
  selector: 'app-card-medicos',
  templateUrl: './card-medicos.component.html',
  styleUrls: ['./card-medicos.component.css'],
  encapsulation: ViewEncapsulation.None, // Remove o encapsulamento de estilos
})
export class CardMedicosComponent {
  @Input() medico: Medico | undefined;
  readonly panelOpenState = signal(false);
  selected: Date | null = null; // Inicializa como null
  today: Date = new Date(); // Define a data mínima como o dia de hoje
  
    diasDisponiveis = [
      { data: new Date(2025, 2, 7), horarios: ['09:00', '11:00', '15:00'] },
      { data: new Date(2025, 3, 15), horarios: ['08:00', '13:00'] },
      { data: new Date(2025, 4, 3), horarios: ['10:00', '16:30'] }
    ];
  
    // Gera os meses a partir do dia atual
    getMesesAPartirDoAtual(): any[] {
      const diasDoAno = this.getTodosDiasDoAno();
      return diasDoAno.filter(dia => dia.data >= new Date());
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
      const diaEncontrado = this.diasDisponiveis.find(d =>
        new Date(d.data).toISOString().split('T')[0] === dia.toISOString().split('T')[0]
      );
      return diaEncontrado ? diaEncontrado.horarios : [];
    }

    getDiasComHorariosDisponiveis(): any[] {
      return this.diasDisponiveis.filter(dia => dia.horarios && dia.horarios.length > 0);
    }

    selectedHorario: string | null = null;

selecionarHorario(horario: string): void {
  this.selectedHorario = this.selectedHorario === horario ? null : horario; // Alterna entre selecionar e desmarcar
}

isHorarioSelecionado(horario: string): boolean {
  return this.selectedHorario === horario;
}

    
    
}
