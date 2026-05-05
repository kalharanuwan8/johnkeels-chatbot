import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export default function History({ onLoadSession }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const q = query(collection(db, "chats"), orderBy("updatedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedSessions = [];
        querySnapshot.forEach((doc) => {
          fetchedSessions.push({ id: doc.id, ...doc.data() });
        });
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-8 pb-24 md:pb-8 flex items-center justify-center">
        <div className="text-slate-400 font-medium">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 pb-24 md:pb-8">
      <div className="max-w-[768px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#002A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <h2 className="text-2xl font-bold text-[#002A5C]">Conversation History</h2>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12 px-6 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">You don't have any past conversations yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sessions.map(session => (
              <button
                key={session.id}
                onClick={() => onLoadSession(session.id, session.messages)}
                className="flex flex-col text-left px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start w-full mb-2">
                  <h3 className="font-semibold text-[#1E293B] text-[15px] group-hover:text-[#002A5C] transition-colors line-clamp-1 pr-4">
                    {session.title || "New Conversation"}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap flex-shrink-0">
                    {session.updatedAt?.toDate().toLocaleDateString() || "Recently"}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {session.messages && session.messages.length > 0 
                    ? session.messages[session.messages.length - 1].text 
                    : "No messages"}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {session.messages?.length || 0} messages
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
