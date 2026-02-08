import React, { useEffect } from "react";
import Button from "../ui/Button";

function DeleteChapterModal({ isOpen, onClose, onConfirm, chapterTitle, isLoading }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-4xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all p-8 text-center animate-in fade-in zoom-in duration-300">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Delete Chapter
        </h3>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed px-2">
          Are you sure you want to delete <span className="font-bold text-violet-400">"{chapterTitle}"</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-100/80 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer flex-1"
          >
            Cancel
          </button>
          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            variant="danger"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteChapterModal;
