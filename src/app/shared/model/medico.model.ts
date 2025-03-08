import { Disponibilidade } from "./disponibilidade.model";

export interface Medico {
    id: string;
    nome: string;
    sobrenome: string;
    crm: string;
    email: string;
    telefone: string;
    cnpj: string;
    dataNascimento: string; // Pode ser ajustado para Date, dependendo do uso
    especialidade: string;
    descricaoEspecialidade: string;
    sexo: string;
    createdAt: string; // Pode ser ajustado para Date, dependendo do uso
    updatedAt: string; // Pode ser ajustado para Date, dependendo do uso
    disponibilidade: Disponibilidade[]
}

export interface ResponseMedico{
    data: Medico[]
}