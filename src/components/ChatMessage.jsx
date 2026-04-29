import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const GeminiIcon = () => (
  <div className="w-8 h-8 rounded bg-[#002A5C] flex items-center justify-center flex-shrink-0 mt-1">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 21L3 8l9 4 9-4-9 13z" fill="#f97316"/>
    </svg>
  </div>
);

const UserIcon = () => (
  <div className="w-8 h-8 rounded bg-[#64748B] flex items-center justify-center flex-shrink-0 mt-1 text-white">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  </div>
);

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`msg-animate flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
      <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {isUser ? <UserIcon /> : <GeminiIcon />}
        <div
          className="max-w-[85%] px-6 py-4 text-[15px] leading-relaxed shadow-sm"
          style={
            isUser
              ? {
                  background: "#002A5C",
                color: "#ffffff",
                borderRadius: "16px",
                borderBottomRightRadius: "4px",
              }
            : {
                background: "#ffffff",
                border: "1px solid #E2E8F0",
                color: "#1E293B",
                  borderRadius: "16px",
                  borderBottomLeftRadius: "4px",
                }
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div className="prose-chat">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <div className={`flex ${isUser ? "pr-[44px]" : "pl-[44px]"} mt-1`}>
        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
          {isUser ? "YOU" : "ASSISTANT"} • {new Date(message.timestamp || message.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}