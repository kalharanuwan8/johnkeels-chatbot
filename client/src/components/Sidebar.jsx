export default function Sidebar({ onNewChat, messageCount, activeTab, setActiveTab }) {
  const handleNavClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const navItemClass = (tab) => 
    `flex items-center gap-4 px-8 py-4 text-[15px] font-semibold transition-colors border-r-[4px] cursor-pointer ` +
    (activeTab === tab
      ? `text-[#002A5C] bg-white border-[#002A5C] shadow-sm`
      : `text-slate-600 hover:bg-slate-100 border-transparent`);

  return (
    <aside className="w-72 h-full flex flex-col bg-[#F8FAFC] border-r border-slate-200 flex-shrink-0 font-sans">
      {/* Logo */}
      <div className="flex items-center gap-4 px-8 pt-8 pb-6">
        <div className="w-10 h-10 rounded-md bg-[#111c2d] flex items-center justify-center flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 21L3 8l9 4 9-4-9 13z" fill="#f97316"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[#002A5C] text-2xl leading-tight tracking-tight">Assistant</span>
          <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">Corporate Support</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 mb-6">
        <button
          onClick={() => { setActiveTab('chat'); onNewChat(); }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-semibold text-white shadow-md transition-all duration-200 hover:opacity-90"
          style={{ background: "#001636" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <line x1="12" y1="9" x2="12" y2="15" />
            <line x1="9" y1="12" x2="15" y2="12" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col">
        <a onClick={(e) => handleNavClick(e, 'chat')} className={navItemClass('chat')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          New Chat
        </a>
        
        <a onClick={(e) => handleNavClick(e, 'history')} className={navItemClass('history')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          History
        </a>

        <a onClick={(e) => handleNavClick(e, 'sectors')} className={navItemClass('sectors')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
            <path d="M9 22v-4h6v4"/>
            <path d="M8 6h.01"/>
            <path d="M16 6h.01"/>
            <path d="M12 6h.01"/>
            <path d="M12 10h.01"/>
            <path d="M12 14h.01"/>
            <path d="M16 10h.01"/>
            <path d="M16 14h.01"/>
            <path d="M8 10h.01"/>
            <path d="M8 14h.01"/>
          </svg>
          Sectors
        </a>

        <a onClick={(e) => handleNavClick(e, 'help')} className={navItemClass('help')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Help
        </a>
      </nav>

      <div className="flex-1" />
    </aside>
  );
}