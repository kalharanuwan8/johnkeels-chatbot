import React, { useState } from 'react';

const STAGES = [
  "Prevention", "Detection", "Validation", "Classification", 
  "Activation", "Response", "Stabilisation & Recovery", "Learning Review"
];

const LEVELS = [
  { id: 'level1', label: 'Level 1: Issue', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { id: 'level2', label: 'Level 2: Emerging Risk', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { id: 'level3', label: 'Level 3: Active Crisis', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { id: 'level4', label: 'Level 4: Severe Crisis', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  { id: 'level5', label: 'Level 5: Enterprise Crisis', color: '#7f1d1d', bg: 'rgba(127,29,29,0.1)' }
];

const CrisisCommandCenter = () => {
  const [activeCrises, setActiveCrises] = useState([
    { id: 1, title: "Social Media Sentiment Drop - Retail", level: 'level2', stage: 1, timestamp: '10 mins ago' },
    { id: 2, title: "Supply Chain Delay - Consumer Foods", level: 'level1', stage: 5, timestamp: '1 hour ago' },
    { id: 3, title: "Safety Allegation - Leisure Sector", level: 'level3', stage: 3, timestamp: 'Just now' }
  ]);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-10">
          <h2 className="text-2xl font-bold text-[#002A5C] mb-2">Crisis Command Center</h2>
          <p className="text-[#64748B]">John Keells Group Standard Crisis Management Framework</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {LEVELS.map(level => (
            <div key={level.id} className="p-4 rounded-2xl bg-white shadow-sm border border-[#e2e8f0]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: level.color }}></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{level.label.split(': ')[1]}</span>
              </div>
              <div className="text-2xl font-bold text-[#1E293B]">
                {activeCrises.filter(c => c.level === level.id).length}
              </div>
            </div>
          ))}
        </div>

        {/* Lifecycle Visualization */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#e2e8f0] mb-10">
          <h3 className="text-lg font-bold text-[#1E293B] mb-8">Crisis Lifecycle Tracker</h3>
          <div className="relative flex justify-between overflow-x-auto pb-4 gap-4">
            {/* Background Line */}
            <div className="absolute top-[15px] left-0 w-full h-[2px] bg-[#f1f5f9] z-0"></div>
            
            {STAGES.map((stage, index) => (
              <div key={stage} className="relative z-10 flex flex-col items-center gap-4 min-w-[100px] text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                  ${index === 3 ? 'bg-[#002A5C] border-[#002A5C] text-white shadow-lg' : 'bg-white border-[#e2e8f0] text-[#cbd5e1]'}`}>
                  <span className="text-[12px] font-bold">{index + 1}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-tighter leading-tight
                  ${index === 3 ? 'text-[#002A5C]' : 'text-[#94a3b8]'}`}>
                  {stage}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Active Incidents */}
        <section>
          <h3 className="text-lg font-bold text-[#1E293B] mb-6">Active Incidents</h3>
          <div className="flex flex-col gap-4">
            {activeCrises.map(crisis => (
              <div key={crisis.id} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-[#e2e8f0] hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
                    style={{ background: LEVELS.find(l => l.id === crisis.level).bg, color: LEVELS.find(l => l.id === crisis.level).color }}>
                    {LEVELS.find(l => l.id === crisis.level).label.split(': ')[1]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B]">{crisis.title}</h4>
                    <p className="text-xs text-[#94a3b8]">{crisis.timestamp} • Lifecycle Stage: {STAGES[crisis.stage]}</p>
                  </div>
                </div>
                <button className="text-[#002A5C] text-sm font-bold hover:underline">
                  Open War Room →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Playbooks */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#002A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h3 className="text-lg font-bold text-[#1E293B]">Strategic Playbooks</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BYD Playbook */}
            <div className="bg-[#EEF2FF] p-6 rounded-2xl border border-[#dce6f5]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-[#002A5C]">BYD Safety Playbook</h4>
                <span className="text-[9px] font-bold bg-white px-2 py-1 rounded-md text-[#002A5C] border border-[#dce6f5] uppercase">Customer Advocacy</span>
              </div>
              <p className="text-sm text-[#64748B] mb-4">Evidence-led reputation support using authentic customer experience content.</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#002A5C] mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-[#1E293B]"><strong>Sentiment Bridging</strong>: Use verified testimonials to address safety concerns.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#002A5C] mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-[#1E293B]"><strong>Evidence-Led</strong>: Share vehicle service history and technical explainers.</p>
                </div>
              </div>
            </div>

            {/* Customs Playbook */}
            <div className="bg-[#FFF7ED] p-6 rounded-2xl border border-[#ffedd5]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-[#9a3412]">Customs Block Playbook</h4>
                <span className="text-[9px] font-bold bg-white px-2 py-1 rounded-md text-[#9a3412] border border-[#ffedd5] uppercase">Educational Transparency</span>
              </div>
              <p className="text-sm text-[#7c2d12] mb-4">Addressing regulatory delays through transparency and direct customer education.</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9a3412] mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-[#431407]"><strong>Direct Interviews</strong>: Use long-form content to explain regulatory technicalities.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9a3412] mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-[#431407]"><strong>Customer FAQs</strong>: Separate company responsibility from customs process.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


export default CrisisCommandCenter;
