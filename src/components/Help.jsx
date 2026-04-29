export default function Help() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 pb-24 md:pb-8">
      <div className="max-w-[768px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#002A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <h2 className="text-2xl font-bold text-[#002A5C]">Help & Support</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-3">How to use the Assistant</h3>
          <ul className="list-disc pl-5 text-slate-600 space-y-3 mb-8">
            <li>Type your questions in the chat input below to interact with the John Keells Group AI.</li>
            <li>Use the suggestion chips (like "Company Profile" or "Annual Report") for quick overviews.</li>
            <li>All conversations are automatically saved. You can resume them at any time from the <strong>History</strong> tab.</li>
          </ul>

          <h3 className="text-lg font-semibold text-[#1E293B] mb-3">Capabilities</h3>
          <p className="text-slate-600 mb-4 leading-relaxed">
            The assistant is powered by Google Gemini and has access to public disclosures and sector information regarding the John Keells Group operations, investor relations, and subsidiaries.
          </p>

          <div className="mt-8 p-4 bg-[#EEF2FF] rounded-xl text-center border border-[#dce6f5]">
            <p className="text-[#002A5C] font-medium">Need human assistance?</p>
            <p className="text-sm text-slate-500 mt-1">Contact IT Support at support@keells.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
