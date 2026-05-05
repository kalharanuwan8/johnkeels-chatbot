export default function Sectors() {
  const sectors = [
    { name: "Leisure", desc: "Cinnamon Hotels & Resorts, Destination Management", icon: "🌴" },
    { name: "Transportation", desc: "Ports & Shipping, Logistics, Airlines", icon: "✈️" },
    { name: "Retail", desc: "Keells Supermarkets, Nexus Mobile", icon: "🛒" },
    { name: "Consumer Foods", desc: "Elephant House, Keells Food Products", icon: "🍦" },
    { name: "Property", desc: "Cinnamon Life, TRI-ZEN", icon: "🏢" },
    { name: "Financial Services", desc: "Union Assurance, Nations Trust Bank", icon: "💼" },
    { name: "IT", desc: "John Keells IT, InfoMate", icon: "💻" }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 pb-24 md:pb-8">
      <div className="max-w-[768px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#002A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
            <path d="M9 22v-4h6v4"/>
            <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
            <path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/>
            <path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
          </svg>
          <h2 className="text-2xl font-bold text-[#002A5C]">Group Sectors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectors.map(sector => (
            <div key={sector.name} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl bg-[#F8FAFC] w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                {sector.icon}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-[#1E293B] text-[16px]">{sector.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{sector.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
