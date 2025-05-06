export interface User {
    id: string;
    nome: string;
    idade: number;
    score: number;
    ativo: boolean;
    pais: string;
    equipe: {
      nome: string;
      lider: boolean;
      projetos: { nome: string; concluido: boolean }[];
    };
    logs: { data: string; acao: string }[];
  }