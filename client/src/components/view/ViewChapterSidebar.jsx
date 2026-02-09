import { BookOpen } from "lucide-react";

function ViewChapterSidebar({ 
  book, 
  chapterIdx, 
  onSelectChapter, 
  isOpen, 
  onClose 
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-80 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:h-full lg:z-auto
        ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
      `}>
        {/* Header */}
        <div className="shrink-0 p-4 border-b border-slate-200 flex items-center gap-3">
          <div className="p-2 bg-violet-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-violet-600" />
          </div>
          <h2 className="font-semibold text-slate-800 text-lg">Chapters</h2>
        </div>

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {book.chapters.map((chapter, idx) => (
            <button
              key={chapter._id || idx}
              onClick={() => {
                onSelectChapter(idx);
                if (window.innerWidth < 1024 && onClose) onClose();
              }}
              className={`w-full text-left px-3 py-3 rounded-lg border transition-all duration-200 group ${
                chapterIdx === idx
                  ? "bg-violet-50 border-violet-100 shadow-sm"
                  : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100"
              }`}
            >
              <div className={`text-sm font-semibold truncate mb-1 ${
                chapterIdx === idx ? "text-violet-900" : "text-slate-700 group-hover:text-slate-900"
              }`}>
                {chapter.title || `Chapter ${idx + 1}`}
              </div>
              <div className={`text-xs font-medium ${
                chapterIdx === idx ? "text-violet-500" : "text-slate-400 group-hover:text-slate-500"
              }`}>
                Chapter {idx + 1}
              </div>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

export default ViewChapterSidebar