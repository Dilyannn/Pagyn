import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Trash2, Plus, GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "../ui/Button.jsx";

const SortableItem = ({ chapter, idx, selectedChapterIdx, onSelectChapter, onDeleteChapter, onGenerateChapterContent, isGenerating }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chapter._id || `new-${idx}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center rounded-lg border transition-all duration-200 relative ${
        selectedChapterIdx === idx
          ? "bg-violet-50/50 border-violet-200 shadow-sm"
          : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
      }`}
    >
      <div
        className="shrink-0 p-2 cursor-grab text-slate-400 hover:text-slate-600"
        {...listeners}
        {...attributes}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <button
        className={`flex-1 min-w-0 py-2.5 pr-3 text-sm text-left transition-colors ${
          selectedChapterIdx === idx
            ? "text-violet-800 font-semibold"
            : "text-slate-600"
        }`}
        onClick={() => onSelectChapter(idx)}
      >
        <span className="block truncate">{chapter.title || "Untitled Chapter"}</span>
      </button>

      <div className="shrink-0 flex items-center gap-0.5 pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="p-1.5 rounded-md hover:bg-violet-100 transition-colors cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onGenerateChapterContent(idx); }}
          title="Generate Content with AI"
          disabled={isGenerating === idx}
        >
          <Sparkles className="w-4 h-4 text-violet-600" />
        </button>

        <button
          className="p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onDeleteChapter(idx); }}
          title="Delete Chapter"
          disabled={isGenerating === idx}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

function ChapterSidebar({
  book,
  chapterIdx,
  onSelectedChapterChange,
  onAddChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  onChapterReorder,
  isGenerating,
}) {

  const navigate = useNavigate();

  const chapterIds = book.chapters.map(
    (chapter, index) => chapter._id || `new-${index}`
  );

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const oldIdx = chapterIds.indexOf(active.id);
      const newIdx = chapterIds.indexOf(over.id);
      onChapterReorder(oldIdx, newIdx);
    }
  };

  return (
    <aside className="w-80 h-full bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h2
          className="text-base font-semibold text-slate-800 mt-4 truncate"
          title={book.title}
        >
          {book.title}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={chapterIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="p-4 space-y-2">
              {book.chapters.map((chapter, index) => (
                <SortableItem
                  key={chapter._id || `new-${index}`}
                  chapter={chapter}
                  idx={index}
                  selectedChapterIdx={chapterIdx}
                  onSelectChapter={onSelectedChapterChange}
                  onDeleteChapter={onDeleteChapter}
                  onGenerateChapterContent={onGenerateChapterContent}
                  isGenerating={isGenerating}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="p-4 border-t text-slate-700 border-slate-200">
        <Button
          variant="secondary"
          onClick={onAddChapter}
          className="w-full cursor-pointer"
          icon={Plus}
        >
          New Chapter
        </Button>
      </div>
    </aside>
  );
}

export default ChapterSidebar;
