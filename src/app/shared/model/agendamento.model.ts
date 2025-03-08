export class BodyAgendamento {
  idPaciente: string;
  idMedico: string;
  data: string;
  horario: string;

  constructor(
    idPaciente: string,
    idMedico: string,
    data: string,
    horario: string
  ) {
    this.idPaciente = idPaciente;
    this.idMedico = idMedico;
    this.data = data;
    this.horario = horario;
  }
}
export interface Medico {
  cnpj: string;
  crm: string;
  especialidade: string;
  nome: string;
  sobrenome: string;
}

export interface AgendamentosPorPaciente {
  id: string;
  data: string; // Format: ISO 8601
  horario: string; // Format: "HH:MM"
  idMedico: string;
  createdAt: string; // Format: ISO 8601
  updatedAt: string; // Format: ISO 8601
  medico: Medico;
  observacao: string | null;
  status: string; // Example: "Agendado"
  consultas: any[]; // Adjust type if needed
}


export interface ReponseAgendamentosPorPaciente {
  data: AgendamentosPorPaciente[]
}