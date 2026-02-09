import { useState } from "react";
import { Sparkles, Type, Eye, Maximize2, Minimize2 } from "lucide-react";
import Button from "../ui/Button.jsx";
import InputField from "../ui/InputField.jsx";
import SimpleMDEditor from "./SimpleMDEditor.jsx";

function ChapterEditorTab({
  book = {
    title: "Untitled Book",
    chapters: [
      {
        title: "Chapter 1",
        content: "",
      },
    ],
  },
  selectedChapterIdx = 0,
  onChapterChange = () => {},
  onGenerateChapterContent = () => {},
  isGenerating,
}) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  //? Simple markdown parser
  const formatMarkdown = (content) => {
    if (!content) return "";

    // Skip if already wrapped in HTML
    if (/^\s*<[a-z][\s\S]*>\s*$/i.test(content)) {
      return content;
    }

    let html = content
      // Blockquotes
      .replace(
        /^\s*>\s+(.*)$/gim,
        '<blockquote class="border-l-4 border-slate-300 pl-4 py-1 my-4 italic text-slate-600 bg-slate-50/50">$1</blockquote>',
      )
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold my-2 text-slate-800">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold my-3 text-slate-800">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold my-4 text-slate-900">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Links
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-violet-600 hover:underline" target="_blank">$1</a>',
      )
      // Unordered lists
      .replace(
        /^\s*[*-]\s+(.*$)/gim,
        '<ul class="list-disc"><li class="ml-6 text-slate-700">$1</li></ul>',
      )
      // Ordered lists
      .replace(
        /^\s*\d+\.\s+(.*$)/gim,
        '<ol class="list-decimal"><li class="ml-6 text-slate-700">$1</li></ol>',
      )
      // Clean up adjacent list tags
      .replace(/<\/ul>\s*<ul class="list-disc">/g, "")
      .replace(/<\/ol>\s*<ol class="list-decimal">/g, "");

    // Paragraph and Line Break handling
    const sections = html.split(/\n\n+/);
    return sections
      .map((section) => {
        const trimmed = section.trim();
        if (!trimmed) return "";
        if (/^<(h1|h2|h3|blockquote|ul|ol|li|p|div|section|article)/i.test(trimmed)) {
          return trimmed.replace(/\n/g, "<br />");
        }
        return `<p class="my-3 leading-relaxed text-slate-700">${trimmed.replace(/\n/g, "<br />")}</p>`;
      })
      .join("");
  };

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
  const content = currentChapter.content || "";
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className={`flex flex-col ${isFullScreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Chapter Editor</h1>

            {/* Edit / Preview Toggle */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  !isPreviewMode
                    ? "bg-white text-violet-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  isPreviewMode
                    ? "bg-white text-violet-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Preview
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Generate with AI */}
          <Button
            onClick={() => onGenerateChapterContent(selectedChapterIdx)}
            isLoading={isGenerating}
            icon={Sparkles}
            size="sm"
            className="cursor-pointer whitespace-nowrap"
          >
            <span className="hidden sm:inline">Generate with AI</span>
            <span className="sm:hidden">AI</span>
          </Button>
        </div>

        <p className="text-sm text-slate-500 mt-2">
          Editing: {currentChapter.title || "Untitled Chapter"}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5 overflow-auto">
        {/* Chapter Title */}
        <InputField
          label="Chapter Title"
          name="chapterTitle"
          value={currentChapter.title}
          onChange={(e) =>
            onChapterChange(selectedChapterIdx, {
              ...currentChapter,
              title: e.target.value,
            })
          }
          placeholder="Enter chapter title..."
        />

        {/* Editor / Preview */}
        {isPreviewMode ? (
          <div className="border-2 border-gray-100 rounded-xl overflow-hidden">
            {/* Preview Mode Header */}
            <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600">Preview Mode</span>
            </div>

            {/* Preview Content */}
            <div className="p-4 sm:p-6 min-h-75 sm:min-h-100">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                {currentChapter.title || "Untitled Chapter"}
              </h1>
              {content ? (
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
                />
              ) : (
                <p className="text-slate-400 italic">No content yet. Start writing to see the preview.</p>
              )}
            </div>
          </div>
        ) : (
          <SimpleMDEditor
            value={content}
            onChange={(val) =>
              onChapterChange(selectedChapterIdx, {
                ...currentChapter,
                content: val,
              })
            }
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-500">
        <div className="flex items-center gap-3 sm:gap-4">
          <span>Words: {wordCount}</span>
          <span>Characters: {charCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
          <span>Auto-saved</span>
        </div>
      </div>
    </div>
  );
}

export default ChapterEditorTab;