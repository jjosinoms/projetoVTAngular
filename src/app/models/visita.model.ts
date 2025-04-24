export interface Visita {
    id: number;
    clienteId: number;
    data: Date;
    tecnico: string;
    descricao: string;
    observacoes?: string;
  }