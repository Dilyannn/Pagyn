import { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
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

      </main>
    </div>
  )
}

export default ViewBook