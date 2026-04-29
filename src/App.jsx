import { useRef, useEffect, useState } from "react";
import { useGemini } from "./hooks/useGemini";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import History from "./components/History";
import Sectors from "./components/Sectors";
import Help from "./components/Help";
import Profile from "./components/Profile";

const TypingIndicator = () => (
  <div className="msg-animate flex gap-3 items-end">
    <div className="w-8 h-8 rounded bg-[#111c2d] flex items-center justify-center flex-shrink-0 mt-1">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 21L3 8l9 4 9-4-9 13z" fill="#f97316"/>
      </svg>
    </div>
    <div className="px-5 py-3.5 rounded-[8px] rounded-tl-[2px] flex gap-1.5 items-center shadow-sm"
      style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
      <span className="dot w-2 h-2 rounded-full bg-[#a0aec0]" />
      <span className="dot w-2 h-2 rounded-full bg-[#a0aec0]" />
      <span className="dot w-2 h-2 rounded-full bg-[#a0aec0]" />
    </div>
  </div>
);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center pt-10 pb-4 gap-4 px-4 text-center">
    <div className="w-16 h-16 bg-[#EEF2FF] rounded-2xl flex items-center justify-center mb-2">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#002A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="2" ry="2"/>
        <path d="M9 14h.01"/>
        <path d="M15 14h.01"/>
        <path d="M12 8v-2"/>
        <circle cx="12" cy="4" r="2"/>
        <path d="M2 14h2"/>
        <path d="M20 14h2"/>
        <path d="M10 18h4"/>
      </svg>
    </div>
    <h2 className="text-[18px] font-medium text-[#1E293B]">{getGreeting()}</h2>
    <p className="text-[#64748B] text-[15px] max-w-[600px] leading-relaxed">
      How can I assist you with John Keells Group services today?
    </p>
  </div>
);

export default function App() {
  const { messages, loading, error, sendMessage, clearChat, loadSession } = useGemini();
  const bottomRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-[#1E293B]">
      <div className="hidden md:flex">
        {sidebarOpen && <Sidebar onNewChat={clearChat} messageCount={messages.length} activeTab={activeTab} setActiveTab={setActiveTab} />}
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 bg-[#F8FAFC] md:bg-white relative">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 flex-shrink-0 bg-white"
          style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center text-[#505f76] hover:bg-[#f1f5f9] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            <div className="w-8 h-8 rounded bg-[#111c2d] flex items-center justify-center flex-shrink-0 md:hidden">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 21L3 8l9 4 9-4-9 13z" fill="#f97316"/>
              </svg>
            </div>
            <h1 className="text-[17px] font-bold text-[#002A5C] tracking-tight">John Keells Group</h1>
          </div>
          <div className="flex items-center gap-4 text-[#8892a3]">
            <button className="hover:text-[#001636] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <button className="hover:text-[#001636] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        {activeTab === 'chat' && (
          <div className="flex-1 overflow-y-auto px-4 py-8 pb-24 md:pb-8">
            <div className="max-w-[768px] mx-auto flex flex-col gap-8">
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
              )}
              {loading && <TypingIndicator />}
              {error && (
                <div className="text-center text-xs px-4 py-2 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                  ⚠️ {error}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {activeTab === 'history' && <History onLoadSession={(id, hist) => { loadSession(id, hist); setActiveTab('chat'); }} />}
        {activeTab === 'sectors' && <Sectors />}
        {activeTab === 'help' && <Help />}
        {activeTab === 'profile' && <Profile />}

        {/* Input */}
        {activeTab === 'chat' && (
          <div className="px-4 pb-[84px] md:pb-8 pt-4 flex-shrink-0 bg-transparent absolute md:relative bottom-0 left-0 w-full z-10 pointer-events-none">
            <div className="max-w-[768px] mx-auto pointer-events-auto">
              {messages.length === 0 && (
                <div className="flex overflow-x-auto gap-3 mb-4 pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {[
                    { icon: "building", label: "Company Profile" },
                    { icon: "pie-chart", label: "Sector Information" },
                    { icon: "trending-up", label: "Investor Relations" },
                    { icon: "file-text", label: "Annual Report" }
                  ].map((item) => (
                    <button key={item.label} onClick={() => sendMessage(`Tell me about ${item.label}`)} 
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DCE6F5] text-[13px] font-semibold text-[#4B6382] hover:bg-[#cddbf0] transition-all whitespace-nowrap flex-shrink-0">
                      {item.icon === "building" && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>}
                      {item.icon === "pie-chart" && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>}
                      {item.icon === "trending-up" && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
                      {item.icon === "file-text" && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
              <ChatInput onSend={sendMessage} loading={loading} />
              <p className="text-center text-[11px] mt-4 font-medium tracking-wide text-[#8892a3]">
                Official John Keells Group Corporate Assistant. Information provided based on public disclosures.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center pt-3 pb-4 px-2 z-20">
        <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-[#002A5C]' : 'text-slate-400'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-[#002A5C]' : 'text-slate-400'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#002A5C]' : 'text-slate-400'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </button>
      </div>
    </div>
  );
}