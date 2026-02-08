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
    if (!content) return "";
    
    // Skip if already wrapped in HTML or empty
    if (/^\s*<[a-z][\s\S]*>\s*$/i.test(content)) {
      return content;
    }

    let html = content
      // Blockquotes
      .replace(/^\s*>\s+(.*)$/gim, '<blockquote class="border-l-4 border-slate-300 pl-4 py-1 my-4 italic text-slate-600 bg-slate-50/50">$1</blockquote>')
      // Headers
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold my-4 text-slate-900">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold my-3 text-slate-800">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold my-2 text-slate-800">$1</h3>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-violet-600 hover:underline" target="_blank">$1</a>')
      // Unordered lists
      .replace(/^\s*[\*\-]\s+(.*$)/gim, '<ul class="list-disc"><li class="ml-6 text-slate-700">$1</li></ul>')
      // Ordered lists
      .replace(/^\s*\d+\.\s+(.*$)/gim, '<ol class="list-decimal"><li class="ml-6 text-slate-700">$1</li></ol>')
      // Clean up adjacent list tags
      .replace(/<\/ul>\s*<ul class="list-disc">/g, "")
      .replace(/<\/ol>\s*<ol class="list-decimal">/g, "");

    // Paragraph and Line Break handling
    const sections = html.split(/\n\n+/);
    return sections
      .map((section) => {
        const trimmed = section.trim();
        if (!trimmed) return "";
        // If the section already starts with a block-level HTML tag, don't wrap in <p>
        if (/^<(h1|h2|h3|blockquote|ul|ol|li|p|div|section|article)/i.test(trimmed)) {
          return trimmed.replace(/\n/g, "<br />");
        }
        return `<p class="my-3 leading-relaxed text-slate-700">${trimmed.replace(/\n/g, "<br />")}</p>`;
      })
      .join("");
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