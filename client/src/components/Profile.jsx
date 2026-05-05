export default function Profile() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 pb-24 md:pb-8">
      <div className="max-w-[768px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#002A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h2 className="text-2xl font-bold text-[#002A5C]">Your Profile</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#002A5C] h-24 w-full"></div>
          <div className="px-8 pb-8 flex flex-col items-center -mt-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-1 shadow-md mb-4">
              <div className="w-full h-full bg-[#f1f5f9] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-[#002A5C]">JD</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#1E293B]">John Doe</h3>
            <p className="text-[#64748B] text-sm">Employee ID: JKH-4829</p>
            <p className="text-[#64748B] text-sm mb-6">Corporate Communications</p>

            <button className="w-full md:w-auto px-8 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-[#1E293B] mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <div>
                <p className="font-medium text-[15px] text-[#1E293B]">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive summaries of your chat sessions</p>
              </div>
              <div className="w-11 h-6 bg-[#002A5C] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <div>
                <p className="font-medium text-[15px] text-[#1E293B]">Data Privacy</p>
                <p className="text-xs text-slate-500">Manage how your interactions are used</p>
              </div>
              <button className="text-sm font-medium text-[#002A5C] hover:underline">Manage</button>
            </div>
            <div className="pt-2 text-center">
              <button className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
