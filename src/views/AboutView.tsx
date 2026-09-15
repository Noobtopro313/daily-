import React from 'react';
import { Shield, Sparkles, Award, Cpu, Globe2, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imageAssets';

interface AboutViewProps {
  onExploreCatalog: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreCatalog }) => {
  const stats = [
    { value: '50,000+', label: 'Delivered Globally', desc: 'To tech enthusiasts in over 42 countries' },
    { value: '99.4%', label: 'Positive Feedback', desc: 'Verified five-star customer reviews' },
    { value: '48-Hour', label: 'Express Dispatch', desc: 'Direct from regional bonded fulfillment centers' },
    { value: '2-Year', label: 'Comprehensive Warranty', desc: 'Complete coverage on internal components' },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: 'Precision Component Sourcing',
      desc: 'We source only tier-one silicon chips, aerospace-grade anodized aluminum chassis, and certified battery cells.',
    },
    {
      icon: Award,
      title: 'Obsessive Acoustic Tuning',
      desc: 'Every driver, diaphragm, and acoustic chamber is calibrated by veteran audio engineers for balanced fidelity.',
    },
    {
      icon: Shield,
      title: 'Strict Quality Stress Testing',
      desc: 'Our labs conduct 5,000+ insertion cycles, drop resistance evaluations, and extreme temperature endurance tests.',
    },
    {
      icon: HeartHandshake,
      title: 'Transparent Customer First Ethos',
      desc: 'No tricky return policies or deceptive marketing specs. We stand firmly behind every product we design and retail.',
    },
  ];

  return (
    <div id="about-us-page" className="py-12 sm:py-16 bg-[#0B0D0F] min-h-screen text-[#A7ADB2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#32B83F]/15 border border-[#32B83F]/30 text-[#32B83F] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission &amp; Heritage
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Technology Selected With Purpose
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            At NEXORA TECH, we believe modern technology should elevate your daily workflow, clarify your audio spaces, and seamlessly integrate into your life — without visual clutter or premature obsolescence.
          </p>
        </div>

        {/* Narrative & Lifestyle Image Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6 text-sm sm:text-base leading-relaxed text-gray-300">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Born from a Discontent with Throwaway Electronics
            </h2>

            <p>
              Founded in 2022, NEXORA TECH was created to solve a persistent frustration in consumer tech: an endless sea of cheap plastic gadgets decorated with exaggerated claims and designed to fail within months.
            </p>

            <p>
              We took a radically different path. Rather than carrying thousands of unvetted SKUs, our engineering curators rigorously hand-pick and test every single item in our catalog. If an earbud distorts at high volume, if a charging station runs abnormally warm, or if a smartwatch strap degrades prematurely, it never makes it onto our shelves.
            </p>

            <div className="p-5 rounded-2xl bg-[#14181D] border border-white/10 space-y-2">
              <div className="text-white font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32B83F]" />
                The Nexora Guarantee
              </div>
              <p className="text-xs text-gray-400">
                Every unit sold is backed by a 30-day zero-risk trial period and a 2-year warranty covering internal electronics and mechanical switches.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={ASSET_IMAGES.aboutCraft}
                alt="Nexora engineering craftsmanship and laboratory testing"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-gray-200">
                <strong className="text-white block font-heading text-sm mb-0.5">Laboratory Validation</strong>
                Drop-tested, cycle-tested, and thermally audited prior to packaging.
              </div>
            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121518] border border-white/10 hover:border-[#32B83F]/40 transition-colors text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#32B83F] font-heading">
                {s.value}
              </div>
              <div className="text-sm font-bold text-white mt-1">{s.label}</div>
              <div className="text-xs text-gray-400 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Our Core Engineering Pillars
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              The four guiding principles behind every technological release.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#121518] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#1A1F26] border border-white/10 flex items-center justify-center text-[#32B83F] mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14181D] to-[#1A2027] border border-white/10 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Ready to Upgrade Your Everyday Setup?
            </h2>
            <p className="mt-3 text-sm text-gray-300">
              Discover our curated ecosystem of smart wearable gear, audiophile-grade drivers, and workspace accessories.
            </p>
            <button
              onClick={onExploreCatalog}
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#32B83F]/25 hover:shadow-[#32B83F]/40 transition-all hover:-translate-y-0.5"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
