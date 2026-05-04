/**
 * GT7 Setup Advisor — Static Track Data (v1.69)
 */

import { VALID_TRACKS } from '@/api/setup.schema';

export interface TrackData {
  id: typeof VALID_TRACKS[number];
  nome: string;
  regiao: 'Americas' | 'Europa' | 'Asia_Oceania';
  zebrasAgressivas: boolean;
  exigeDownforce: boolean;
  tipoCircuito: 'road' | 'oval' | 'street' | 'mixed';
}

export const TRACKS: TrackData[] = [
  { id: 'Interlagos', nome: 'Interlagos', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Blue_Moon_Bay', nome: 'Blue Moon Bay Speedway', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'oval' },
  { id: 'Colorado_Springs', nome: 'Colorado Springs', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Daytona', nome: 'Daytona International Speedway', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'oval' },
  { id: 'Fishermans_Ranch', nome: "Fisherman's Ranch", regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'mixed' },
  { id: 'Northern_Isle', nome: 'Northern Isle Speedway', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'oval' },
  { id: 'Trial_Mountain', nome: 'Trial Mountain Circuit', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Special_Stage_Route_X', nome: 'Special Stage Route X', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'oval' },
  { id: 'Laguna_Seca', nome: 'Laguna Seca', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Willow_Springs', nome: 'Willow Springs', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Road_Atlanta', nome: 'Road Atlanta', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Gilles_Villeneuve', nome: 'Circuit Gilles-Villeneuve', regiao: 'Americas', zebrasAgressivas: true, exigeDownforce: false, tipoCircuito: 'street' },
  { id: 'Grand_Valley', nome: 'Grand Valley', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Lake_Louise', nome: 'Lake Louise', regiao: 'Americas', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Alsace', nome: 'Alsace', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Lago_Maggiore', nome: 'Lago Maggiore', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Monza', nome: 'Monza', regiao: 'Europa', zebrasAgressivas: true, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Brands_Hatch', nome: 'Brands Hatch', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Barcelona_Catalunya', nome: 'Barcelona-Catalunya', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Le_Mans', nome: 'Le Mans', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Sainte_Croix', nome: 'Sainte-Croix', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Spa_Francorchamps', nome: 'Spa-Francorchamps', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Dragon_Trail', nome: 'Dragon Trail', regiao: 'Europa', zebrasAgressivas: true, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Goodwood', nome: 'Goodwood', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Nurburgring', nome: 'Nürburgring', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Red_Bull_Ring', nome: 'Red Bull Ring', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Sardegna_Road_Track', nome: 'Sardegna Road Track', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Sardegna_Windmills', nome: 'Sardegna Windmills', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Eiger_Nordwand', nome: 'Eiger Nordwand', regiao: 'Europa', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Autopolis', nome: 'Autopolis', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Mount_Panorama', nome: 'Mount Panorama', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Fuji', nome: 'Fuji Speedway', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Kyoto_Driving_Park', nome: 'Kyoto Driving Park', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Suzuka', nome: 'Suzuka Circuit', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: true, tipoCircuito: 'road' },
  { id: 'Tokyo_Expressway', nome: 'Tokyo Expressway', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'street' },
  { id: 'Tsukuba', nome: 'Tsukuba Circuit', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'Broad_Bean', nome: 'Broad Bean Raceway', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
  { id: 'BB_Raceway', nome: 'BB Raceway', regiao: 'Asia_Oceania', zebrasAgressivas: false, exigeDownforce: false, tipoCircuito: 'road' },
];

export const REGIONS = [
  { id: 'Americas', label: 'Américas', emoji: '🌎' },
  { id: 'Europa', label: 'Europa', emoji: '🌍' },
  { id: 'Asia_Oceania', label: 'Ásia & Oceania', emoji: '🌏' },
] as const;
