import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-4xl shadow-2xl max-w-2xl w-full p-8 text-left animate-in fade-in zoom-in duration-300 z-10 overflow-hidden">
        <div className="flex items-center justify-between mb-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-violet-600 p-2 rounded-2xl hover:bg-violet-50 transition-all duration-200 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="relative max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
