import { useMemo, useState } from "react";
import { Sparkles, Type, Eye, Maximize2 } from "lucide-react";
import Button from "../ui/Button.jsx";
import InputField from "../ui/InputField.jsx";
import SimpleMDEditor from "./SimpleMDEditor.jsx"  

function ChapterEditorTab({
  book={
    title: "Untitled Book",
    chapters: [
      {
        title: "Chapter 1",
        content: "-"
      }
    ],
  },
  selectedChapterIdx=0,
  onChapterChange= () => {},
  onGenerateChapterContent= () => {},
  isGenerating,
}) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  //? Simple markdown parser
  const formatMarkdown = (content) => {
  };

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ]
    };
  }, []);
  
  if (selectedChapterIdx === null || !book.chapters[selectedChapterIdx]) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Type size={48} className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">Select a chapter to start editing</p>
          <p className="text-gray-500 text-sm mt-1">Choose from the sidebar to begin writing</p>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters[selectedChapterIdx];

  return (
    <div className={`flex-1 flex flex-col min-w-0 bg-white ${isFullScreen ? 'fixed inset-0 z-50' : 'relative'}`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex-1 max-w-2xl">
          <input
            type="text"
            value={currentChapter.title}
            onChange={(e) => onChapterChange(selectedChapterIdx, { ...currentChapter, title: e.target.value })}
            className="w-full text-xl font-bold text-slate-800 placeholder-slate-400 border-none focus:ring-0 bg-transparent p-0"
            placeholder="Chapter Title..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onGenerateChapterContent(selectedChapterIdx)}
            disabled={isGenerating}
            className="flex items-center gap-2 text-violet-600 hover:bg-violet-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? "Generating..." : "AI Assist"}</span>
          </Button>
          
          <div className="h-6 w-px bg-slate-200 mx-2" />
          
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`p-2 rounded-md transition-colors ${isPreviewMode ? 'bg-violet-50 text-violet-600' : 'text-slate-500 hover:bg-slate-50'}`}
            title={isPreviewMode ? "Edit Mode" : "Preview Mode"}
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-md text-slate-500 hover:bg-slate-50 transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-1 overflow-auto bg-slate-50/30">
        <div className={`max-w-4xl mx-auto min-h-full bg-white shadow-sm border-x border-slate-100 ${isFullScreen ? 'p-12' : 'p-8'}`}>
          {isPreviewMode ? (
            <div 
              className="prose prose-slate max-w-none text-slate-800"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(currentChapter.content) }}
            />
          ) : (
            <textarea
              value={currentChapter.content}
              onChange={(e) => onChapterChange(selectedChapterIdx, { ...currentChapter, content: e.target.value })}
              className="w-full h-[calc(100vh-250px)] text-lg text-slate-700 leading-relaxed border-none focus:ring-0 resize-none placeholder-slate-300"
              placeholder="Start writing your story here..."
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterEditorTab;