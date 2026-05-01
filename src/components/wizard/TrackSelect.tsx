'use client';

import { TRACKS, REGIONS, type TrackData } from '@/data/tracks';
import { useState, useMemo } from 'react';

interface TrackSelectProps {
  selectedTrack: TrackData | null;
  onSelect: (track: TrackData) => void;
}

export function TrackSelect({ selectedTrack, onSelect }: TrackSelectProps) {
  const [activeRegion, setActiveRegion] = useState<string>('Americas');
  const [search, setSearch] = useState('');

  const filteredTracks = useMemo(() => {
    return TRACKS.filter((t) => {
      const matchRegion = t.regiao === activeRegion;
      const matchSearch = search === '' || t.nome.toLowerCase().includes(search.toLowerCase());
      return matchRegion && matchSearch;
    });
  }, [activeRegion, search]);

  return (
    <div className="gt-animate-fade-in">
      <h2 className="text-2xl font-bold text-gt-text mb-1">
        Selecione o Circuito
      </h2>
      <p className="text-gt-text-secondary text-sm mb-6">
        Escolha a pista para calibrar a recomendação de setup.
      </p>

      {/* Region Tabs */}
      <div className="flex gap-2 mb-4" role="tablist" id="region-tabs">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            role="tab"
            id={`tab-${region.id}`}
            aria-selected={activeRegion === region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${activeRegion === region.id
                ? 'bg-gt-cyan/15 text-gt-cyan border border-gt-cyan/40'
                : 'bg-gt-card text-gt-text-muted border border-gt-border hover:border-gt-border-glow hover:text-gt-text'
              }
            `}
          >
            <span className="mr-1.5">{region.emoji}</span>
            {region.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gt-text-muted"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          id="track-search"
          type="text"
          placeholder="Buscar pista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full pl-10 pr-4 py-2.5 rounded-lg text-sm
            bg-gt-card border border-gt-border text-gt-text
            placeholder:text-gt-text-muted
            focus:outline-none focus:border-gt-cyan/50 focus:ring-1 focus:ring-gt-cyan/20
            transition-all duration-200
          "
        />
      </div>

      {/* Track Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredTracks.map((track, idx) => {
          const isSelected = selectedTrack?.id === track.id;
          return (
            <button
              key={track.id}
              id={`track-card-${track.id}`}
              onClick={() => onSelect(track)}
              className={`
                gt-card p-4 text-left cursor-pointer
                ${isSelected ? 'gt-card-selected' : ''}
              `}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gt-text leading-tight">
                  {track.nome}
                </h3>
                {isSelected && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gt-cyan/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-gt-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="gt-label px-2 py-0.5 rounded bg-gt-surface text-[10px]">
                  {track.tipoCircuito}
                </span>
                {track.zebrasAgressivas && (
                  <span className="gt-label px-2 py-0.5 rounded bg-gt-orange/10 text-gt-orange text-[10px]">
                    ZEBRAS
                  </span>
                )}
                {track.exigeDownforce && (
                  <span className="gt-label px-2 py-0.5 rounded bg-gt-blue/10 text-gt-blue text-[10px]">
                    DOWNFORCE
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
