import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend, loading }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || loading) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, upload file to Firebase Storage or send to Gemini directly
      alert(`File selected: ${file.name}\n(Multimodal processing to be implemented)`);
      e.target.value = null; // Reset
    }
  };

  return (
    <div
      className="flex items-center gap-2 rounded-[20px] px-3 py-2"
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: "border-color 0.2s",
      }}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*,.pdf,.doc,.docx"
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="w-8 h-8 flex items-center justify-center text-[#64748B] flex-shrink-0 hover:bg-slate-100 rounded-full transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </button>
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={loading}
        className="flex-1 resize-none bg-transparent text-[15px] outline-none placeholder-[#8892a3] text-[#111c2d] py-1.5"
        style={{ fontFamily: "'Inter', sans-serif", maxHeight: "160px" }}
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || loading}
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{
          background: "#002A5C",
          cursor: value.trim() && !loading ? "pointer" : "default",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="white"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}