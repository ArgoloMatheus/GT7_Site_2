import { z } from 'zod';

export const SetupRequestSchema = z.object({
  pista: z.object({
    id: z.string().min(1, "O identificador da pista é obrigatório")
  }),
  veiculo: z.object({
    nome: z.string().min(1),
    // Injeção da Categoria Gr.X para Hypercars Elétricos
    categoria: z.enum(["Gr.1", "Gr.2", "Gr.3", "Gr.4", "Gr.B", "Gr.X"]),
    tracao: z.enum(["FR", "MR", "AWD", "4WD", "FF"]),
    // Limite superior elevado para suportar o Xiaomi SU7 Ultra '25 (1.526 BHP)
    potencia_bhp: z.number().min(100).max(2500),
  }),
  estilo: z.enum(["Agressivo", "Equilibrado", "Gerenciamento_Endurance"]),
  // Variável de controle para auditar tentativa de manipulação de PP
  parametros_transmissao: z.record(z.any()).optional()
});

export type SetupRequest = z.infer<typeof SetupRequestSchema>;
