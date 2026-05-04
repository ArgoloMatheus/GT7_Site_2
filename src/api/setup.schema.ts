import { z } from 'zod';

/**
 * Identificadores oficiais de pistas do GT7 (v1.69)
 */
export const VALID_TRACKS = [
  "Sardegna_Road_Track",
  "Sardegna_Windmills",
  "Monza",
  "Tokyo_Expressway",
  "Spa_Francorchamps",
  "Nurburgring",
  "Le_Mans",
  "Laguna_Seca",
  "Interlagos",
  "Suzuka",
  "Mount_Panorama",
  "Fuji",
  "Daytona",
  "Brands_Hatch",
  "Barcelona_Catalunya",
  "Red_Bull_Ring",
  "Trial_Mountain",
  "Grand_Valley",
  "Dragon_Trail",
  "Eiger_Nordwand",
  "Road_Atlanta",
  "Willow_Springs",
  "Autopolis",
  "Kyoto_Driving_Park",
  "Tsukuba",
  "Gilles_Villeneuve",
  "Sainte_Croix",
  "Alsace",
  "Lago_Maggiore",
  "Goodwood",
  "Blue_Moon_Bay",
  "Northern_Isle",
  "Special_Stage_Route_X",
  "Colorado_Springs",
  "Fishermans_Ranch",
  "Lake_Louise",
  "Broad_Bean",
  "BB_Raceway"
] as const;

export const VALID_CATEGORIES = ["Gr.1", "Gr.2", "Gr.3", "Gr.4", "Gr.B", "Gr.X"] as const;
export const VALID_TRACTION = ["FF", "FR", "MR", "AWD", "4WD"] as const;
export const VALID_STYLES = ["Agressivo", "Equilibrado", "Gerenciamento_Endurance"] as const;

/**
 * Esquema de Validação para Solicitação de Setup
 */
export const SetupRequestSchema = z.object({
  veiculo: z.object({
    nome: z.string().min(1, "Nome do veículo é obrigatório").max(120),
    categoria: z.enum(VALID_CATEGORIES, {
      errorMap: () => ({ message: "Categoria de veículo não reconhecida. Valores aceitos: Gr.1, Gr.2, Gr.3, Gr.4, Gr.B, Gr.X" })
    }),
    tracao: z.enum(VALID_TRACTION, {
      errorMap: () => ({ message: "Tipo de tração inválido. Valores aceitos: FF, FR, MR, AWD, 4WD" })
    }),
    potencia_bhp: z.number().min(100).max(2500),
    parametros_transmissao: z.record(z.any()).optional(),
  }),
  pista: z.object({
    id: z.enum(VALID_TRACKS, {
      errorMap: () => ({ message: "Identificador de pista não reconhecido pela base de dados" })
    }),
  }),
  estilo: z.enum(VALID_STYLES, {
    required_error: "Estilo de pilotagem é obrigatório"
  }),
});

export type SetupRequestInput = z.infer<typeof SetupRequestSchema>;
