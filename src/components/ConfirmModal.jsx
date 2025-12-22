export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "¿Estás seguro?", 
  message = "Esta acción no se puede deshacer.", 
  confirmText = "Confirmar", 
  cancelText = "Cancelar",
  type = "danger" // "danger", "info", "success"
}) {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      gradient: "from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
      icon: "⚠️"
    },
    info: {
      gradient: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
      icon: "ℹ️"
    },
    success: {
      gradient: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
      icon: "✓"
    }
  };

  const style = typeStyles[type] || typeStyles.danger;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl text-center relative animate-scale-in border-2 border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="text-7xl mb-6">{style.icon}</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-gray-800 text-xl mb-8 leading-relaxed whitespace-pre-line">{message}</p>
        <div className="flex gap-6 justify-center">
          {cancelText && (
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-900 px-8 py-4 rounded-xl text-xl font-bold focus:outline-none"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-bold focus:outline-none"
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
