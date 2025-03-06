import { Endereco } from "./endereco.model";

export class Paciente {
    constructor(
      public nome: string,
      public sobrenome: string,
      public cpf: string,
      public dataNascimento: string, // formato "DD-MM"
      public sexo: "M" | "F",
      public telefone: string,
      public email: string,
      public password: string,
      public endereco: Endereco
    ) {}
  }