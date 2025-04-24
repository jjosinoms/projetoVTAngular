export interface Cliente {
    id: number;
    nome: string;
    razao_social: string;
    cnpj: string;
    telefone?: string;
    telefone2?: string;
    email?: string;
    cep?: string;
    estado?: string;
    cidade?: string;
    bairro?: string;
    endereco?: string;
  }