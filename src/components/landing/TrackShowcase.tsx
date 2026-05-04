'use client';

import { useState } from 'react';
import { TRACKS, REGIONS } from '@/data/tracks';

export function TrackShowcase() {
  const [activeRegion, setActiveRegion] = useState('Europa');

  const regionTracks = TRACKS.filter((t) => t.regiao === activeRegion).slice(0, 6);

  return (
    <section className="px-4 py-16 md:py-20 border-t border-gt-border/50 gt-grid-bg-fine">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="gt-section-header">
          <h3 className="gt-display text-2xl md:text-3xl">
            Global <span className="text-gt-orange">Circuits</span>
          </h3>
        </div>
        <p className="text-gt-text-secondary text-sm mb-6 max-w-lg">
          Base de dados com 40+ circuitos oficiais. Dados técnicos de comprimento, elevação e tipo de superfície.
        </p>

        {/* Region Tabs */}
        <div className="flex gap-2 mb-8" role="tablist">
          {REGIONS.map((region) => (
            <button
              key={region.id}
              role="tab"
              aria-selected={activeRegion === region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeRegion === region.id
                  ? 'bg-gt-orange/10 text-gt-orange border border-gt-orange/30'
                  : 'bg-gt-card text-gt-text-muted border border-gt-border hover:border-gt-border-glow hover:text-gt-text'
              }`}
            >
              <span className="mr-1.5">{region.emoji}</span>
              {region.label}
            </button>
          ))}
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionTracks.map((track, i) => (
            <div
              key={track.id}
              className="gt-card p-4 gt-animate-fade-in group"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-semibold text-gt-text leading-tight group-hover:text-gt-orange transition-colors">
                  {track.nome}
                </h4>
                <span className="gt-mono text-[9px] text-gt-text-muted uppercase shrink-0 ml-2">
                  {track.tipoCircuito}
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {track.zebrasAgressivas && (
                  <span className="gt-indicator-orange text-[8px]">ZEBRAS</span>
                )}
                {track.exigeDownforce && (
                  <span className="gt-indicator text-[8px]">DOWNFORCE</span>
                )}
                {!track.zebrasAgressivas && !track.exigeDownforce && (
                  <span className="gt-mono text-[9px] text-gt-text-muted px-2 py-0.5 bg-gt-surface rounded border border-gt-border">
                    STANDARD
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-8 text-center">
          <button className="gt-btn-secondary text-xs py-2 px-6">
            Ver Todos os {TRACKS.filter(t => t.regiao === activeRegion).length} Circuitos →
          </button>
        </div>
      </div>
    </section>
  );
}
