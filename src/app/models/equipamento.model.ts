export interface Equipamento {
    id: number;
    clienteId: number;
    inmetro: string;
    serie: string;
    nomeEquipamento: string;
    modelo: string;
    numeroOs?: string;
    dataAquisicao?: Date;
    garantiaValidade?: Date;
    estaNaGarantia?: boolean;
  }