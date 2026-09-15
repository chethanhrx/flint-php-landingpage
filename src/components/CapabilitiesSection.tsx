import React, { useState } from 'react';
import { CAPABILITY_GROUPS, CapabilityGroup } from '../data/frameworkCapabilities';
import {
  Globe,
  Layers,
  Database,
  Shield,
  Server,
  Wrench,
  ArrowRight,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface CapabilitiesSectionProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onNavigate }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('http');

  const groupIcons: Record<string, React.ElementType> = {
    http: Globe,
    application: Layers,
    data: Database,
    security: Shield,
    infrastructure: Server,
    tooling: Wrench,
  };

  const activeGroupData = CAPABILITY_GROUPS.find((g) => g.id === selectedGroup) || CAPABILITY_GROUPS[0];

  return (
    <section id="features" className="py-16 sm:py-24 border-b border-stone-200 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-3 shadow-xs">
            <span>WHAT FLINTPHP PROVIDES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            Organized subsystems. Built for production.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Presented in meaningful architectural layers rather than an unstructured list. Only real, verified capabilities shipped in the official repository.
          </p>
        </div>

        {/* Group Selector Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-stone-200 no-scrollbar">
          {CAPABILITY_GROUPS.map((group) => {
            const Icon = groupIcons[group.id] || Layers;
            const isSelected = selectedGroup === group.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroup(group.id)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-sm font-semibold'
                    : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{group.title}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    isSelected
                      ? 'bg-black/20 text-white border-transparent'
                      : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}
                >
                  {group.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Subsystem Presentation */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-6">
            <div>
              <span className="text-xs font-mono text-orange-600 uppercase tracking-wider block mb-1 font-semibold">
                Subsystem: {activeGroupData.badge}
              </span>
              <h3 className="text-2xl font-bold text-stone-900">{activeGroupData.title}</h3>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">{activeGroupData.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('docs')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs sm:text-sm font-semibold text-stone-800 border border-stone-200 transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              <span>Explore All in Docs</span>
              <ArrowRight className="w-4 h-4 text-orange-600" />
            </button>
          </div>

          {/* Capabilities Grid for Selected Subsystem (Box-in-Box Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeGroupData.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50/70 border border-stone-200 hover:border-orange-600/40 hover:bg-white transition-all flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h4>
                    {item.status && (
    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
      item.status === 'Stable' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
      item.status === 'Foundation' ? 'bg-amber-50 text-amber-600 border-amber-200' :
      'bg-stone-50 text-stone-500 border-stone-200'
    }`}>
      {item.status.toUpperCase()}
    </span>
  )}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('docs', item.docPath.split('/').pop())}
                  className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 hover:text-orange-700 font-semibold pt-2 border-t border-stone-200/80 cursor-pointer"
                >
                  <span>{item.name} docs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
