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
