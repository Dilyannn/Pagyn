import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import ViewChapterSidebar from "./ViewChapterSidebar.jsx";

function ViewBook({ book }) {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const currentChapter = book.chapters[chapterIdx];

  const formatContent = (content) => {
    return content
      .split("\n\n")
      .filter(paragraph => paragraph.trim())
      .map(paragraph => paragraph.trim())
      .filter(paragraph => !paragraph.includes("--- #####"))
      .map(paragraph => {
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        paragraph = paragraph.replace(/(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g, "<em>$1</em>");
        return `<p>${paragraph}</p>`;
      })
      .join("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white text-gray-900">
      <ViewChapterSidebar
        book={book}
        chapterIdx={chapterIdx}
        onSelectChapter={setChapterIdx}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-base md:text-lg truncate">{book.title}</h1>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm font-bold"
              >
                A-
              </button>
              <span className="text-sm text-gray-500">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(36, fontSize + 2))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-lg font-bold"
              >
                A+
              </button>
            </div>

          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto px-6 py-12 md:px-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {currentChapter?.title || "Untitled Chapter"}
            </h2>

            <div 
              className="reading-content text-gray-800 leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: formatContent(currentChapter?.content || "") }}
            />

            <hr className="my-12 border-gray-100" />

            <div className="flex items-center justify-between">
              <button
                onClick={() => setChapterIdx(prev => Math.max(0, prev - 1))}
                disabled={chapterIdx === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <span className="text-sm text-gray-500 font-medium hidden sm:block">
                {chapterIdx + 1} of {book.chapters.length}
              </span>

              <button
                onClick={() => setChapterIdx(prev => Math.min(book.chapters.length - 1, prev + 1))}
                disabled={chapterIdx === book.chapters.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 text-center sm:hidden text-sm text-gray-500 font-medium">
              {chapterIdx + 1} of {book.chapters.length}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .reading-content p {
          margin-bottom: 1.5em;
          text-align: justify;
          hyphens: auto;
        }
        .reading-content p:first-child {
          margin-top: 0;
        }
        .reading-content p:last-child {
          margin-bottom: 0;
        }
        .reading-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        .reading-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  )
}

export default ViewBook