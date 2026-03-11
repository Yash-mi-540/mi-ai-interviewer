export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        body { font-family: 'Inter', sans-serif; background: #ffffff; }
        .font-handwriting { font-family: 'Caveat', cursive; }

        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blink-cursor { animation: blink-cursor 0.75s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.55s ease forwards; }

        @keyframes float-orb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }
        .animate-float { animation: float-orb 4s ease-in-out infinite; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }

        .gradient-text {
          background: linear-gradient(135deg, #3538cd, #4f46e5, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-glass {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .card-glass:hover {
          border-color: #c7d2fe;
          box-shadow: 0 4px 20px rgba(53,56,205,0.08);
        }

        .selected-card {
          background: #eef2ff !important;
          border-color: #818cf8 !important;
          box-shadow: 0 4px 20px rgba(53,56,205,0.15) !important;
        }

        .btn-primary {
          background: #3538cd;
          box-shadow: 0 4px 16px rgba(53,56,205,0.30);
          transition: all 0.25s ease;
        }
        .btn-primary:hover {
          background: #2d30b0;
          box-shadow: 0 6px 24px rgba(53,56,205,0.40);
          transform: translateY(-1px);
        }
        .btn-primary:active { transform: translateY(0); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: rgba(53,56,205,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(53,56,205,0.5); }
      `}</style>

      {/* Subtle ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50/80 rounded-full blur-[80px]" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
