export interface Especialidade {
    id: string;
    nome: string;
    descricao: string;
    createdAt: string;
    updatedAt: string;
  }
  

  export interface ResponseEspecialidades {
    data: Especialidade[]
  }