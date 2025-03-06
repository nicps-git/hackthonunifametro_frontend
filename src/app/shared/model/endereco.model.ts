export class Endereco {
    constructor(
      public cep: string,
      public logradouro: string,
      public numero: string,
      public complemento: string | undefined,
      public bairro: string,
      public cidade: string,
      public estado: string
    ) {}
  }