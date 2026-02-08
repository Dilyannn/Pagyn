import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Trash2, Plus, GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "../ui/Button.jsx";

const SortableItem = ({ chapter, idx, selectedChapterIdx, onSelectChapter, onDeleteChapter, onGenerateChapterContent, isGenerating }) => {
  return <div></div>
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
