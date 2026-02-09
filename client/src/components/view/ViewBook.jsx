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
    <div>ViewBook</div>
  )
}

export default ViewBook