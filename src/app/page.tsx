'use client';

import { useState } from 'react';
import { WizardForm } from '@/components/wizard/WizardForm';
import { HeroSection } from '@/components/landing/HeroSection';
import { TelemetryBar } from '@/components/landing/TelemetryBar';
import { FeaturedSetups } from '@/components/landing/FeaturedSetups';
import { TrackShowcase } from '@/components/landing/TrackShowcase';
import { CommunitySection } from '@/components/landing/CommunitySection';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';

export default function SetupAdvisorPage() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen bg-gt-black text-gt-text selection:bg-gt-cyan selection:text-gt-black overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 gt-grid-bg" />
      {/* Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[45%] h-[45%] bg-gt-blue/[0.04] blur-[140px] rounded-full" />
        <div className="absolute top-[25%] -right-[8%] w-[35%] h-[50%] bg-gt-cyan/[0.04] blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[15%] w-[50%] h-[35%] bg-gt-purple/[0.03] blur-[140px] rounded-full" />
      </div>

      <SiteHeader onStartSetup={() => setShowWizard(true)} />
      <TelemetryBar />

      <main className="relative">
        {showWizard ? (
          <section className="px-4 py-12 md:py-20">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setShowWizard(false)}
                className="gt-btn-secondary mb-8 text-sm"
              >
                ← Voltar ao Dashboard
              </button>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-b from-gt-cyan/5 to-transparent rounded-[2rem] blur-2xl -z-10" />
                <WizardForm />
              </div>
            </div>
          </section>
        ) : (
          <>
            <HeroSection onStartSetup={() => setShowWizard(true)} />
            <FeaturedSetups />
            <TrackShowcase />
            <CommunitySection />
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
