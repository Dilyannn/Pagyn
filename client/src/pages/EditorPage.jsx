import { useEffect, useState, useRef, act } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Sparkles,
  FileDown,
  Save,
  Menu,
  X,
  Edit,
  NotebookText,
  ChevronDown,
  FileText,
  Form,
} from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable"; //& For reordering sections

import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../utils/api";

import Dropdown, { DropdownItem } from "../components/ui/Dropdown.jsx";
import Button from "../components/ui/Button.jsx";
import InputField from "../components/ui/InputField.jsx";
import Modal from "../components/ui/Modal.jsx";
import SelectField from "../components/ui/SelectField.jsx";
import ChapterSidebar from "../components/editor/ChapterSidebar.jsx";
import BookDetailsTab from "../components/editor/BookDetailsTab.jsx";
import ChapterEditorTab from "../components/editor/ChapterEditorTab.jsx";
import DeleteChapterModal from "../components/modals/DeleteChapterModal.jsx";

function EditorPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [chapterIdx, setChapterIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("editor"); //& "editor" | "outline" | "settings"
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fileInputRef = useRef(null);

  //? Delete Chapter Modal States
  const [isDeleteChapterModalOpen, setIsDeleteChapterModalOpen] = useState(false);
  const [chapterToDeleteIndex, setChapterToDeleteIndex] = useState(null);

  //? AI Modal States
  const [isOutlineAIModalOpen, setIsOutlineAIModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative, Storytelling");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.BOOKS.GET_BOOK_BY_ID(bookId),
        );
        setBook(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch book data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId, navigate]);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterChange = (index, updatedChapter) => {
    const newChapters = [...book.chapters];
    newChapters[index] = updatedChapter;
    setBook((prev) => ({ ...prev, chapters: newChapters }));
  };

  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${book.chapters.length + 1}`,
      content: "",
    };
    const updatedChapters = [...book.chapters, newChapter];
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    setChapterIdx(updatedChapters.length - 1);
  };

  const handleDeleteChapter = (index) => {
    if (book.chapters.length <= 1) {
      toast.error("A book must have at least one chapter");
      return;
    }
    setChapterToDeleteIndex(index);
    setIsDeleteChapterModalOpen(true);
  };

  const confirmDeleteChapter = () => {
    if (chapterToDeleteIndex === null) return;
    
    const updatedChapters = book.chapters.filter((_, i) => i !== chapterToDeleteIndex);
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    
    // Adjust selected chapter index
    if (chapterIdx >= updatedChapters.length) {
      setChapterIdx(Math.max(0, updatedChapters.length - 1));
    } else if (chapterIdx > chapterToDeleteIndex) {
        setChapterIdx(chapterIdx - 1);
    }
    
    setIsDeleteChapterModalOpen(false);
    setChapterToDeleteIndex(null);
    toast.success("Chapter deleted successfully");
  };

  const handleChaperReorder = (oldIndex, newIndex) => {};

  const handleSave = async (bookToSave = book, showToast = true) => {};

  const handleCoverArtUpload = async (e) => {};

  const handleGenerateOutline = async () => {};

  const handleGenerateChapterContent = async (chapterIndex) => {};

  const handleExportPDF = async () => {};

  const handleExportDOCX = async () => {};

  if (isLoading || !book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Editing...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-slate-50 font-sans relative min-h-screen">
        {/*//*Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 flex md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-black/20 bg-opacity-75"
              aria-hidden="true"
              onClick={() => setIsSidebarOpen(false)}
            />

            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:right-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>

              <ChapterSidebar
                book={book}
                chapterIdx={chapterIdx}
                onSelectedChapterChange={(idx) => {
                  setChapterIdx(idx);
                  setIsSidebarOpen(false);
                }}
                onAddChapter={handleAddChapter}
                onDeleteChapter={handleDeleteChapter}
                onGenerateChapterContent={handleGenerateChapterContent}
                onChapterReorder={handleChaperReorder}
                isGenerating={isGenerating}
              />
            </div>
            <div aria-hidden="true" className="shrink-0 w-14" />
          </div>
        )}

        {/*//* Desktop */}
        <div className="hidden md:flex md:shrink-0 sticky top-0 h-screen">
          <ChapterSidebar
            book={book}
            chapterIdx={chapterIdx}
            onSelectedChapterChange={(idx) => {
              setChapterIdx(idx);
              setIsSidebarOpen(false);
            }}
            onAddChapter={handleAddChapter}
            onDeleteChapter={handleDeleteChapter}
            onGenerateChapterContent={handleGenerateChapterContent}
            onChapterReorder={handleChaperReorder}
            isGenerating={isGenerating}
          />
        </div>

        <main className="flex-1 h-full flex flex-col">
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2 ">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-slate-500 hover:text-slate-800">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex space-x-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`flex items-center justify-center flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                    activeTab === "editor"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center justify-center flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                    activeTab === "details"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <NotebookText className="w-4 h-4 mr-2" />
                  Book Details
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Dropdown
                trigger={
                  <Button variant="outline" icon={FileDown} className="cursor-pointer">
                    Export
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                }
              >
                <DropdownItem onClick={handleExportPDF}>
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  Export as PDF
                </DropdownItem>
                <DropdownItem onClick={handleExportDOCX}>
                  <Form className="w-4 h-4 mr-2 text-slate-500" />
                  Export as DOCX
                </DropdownItem>
              </Dropdown>

              <Button
                onClick={() => handleSave()}
                isLoading={isSaving}
                icon={Save}
                className="cursor-pointer"
              >
                Save
              </Button>
            </div>
          </header>

          <div className="">
            {activeTab === "editor" ? (
              <ChapterEditorTab 
                book={book}
                selectedChapterIdx={chapterIdx}
                onChapterChange={handleChapterChange}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
              />
            ) : (
              <BookDetailsTab
                book={book}
                onBookChange={handleBookChange}
                onCoverArtUpload={handleCoverArtUpload}
                fileInputRef={fileInputRef}
                isUploading={isUploading}
              />
            )}
          </div>
        </main>
      </div>

      <DeleteChapterModal
        isOpen={isDeleteChapterModalOpen}
        onClose={() => setIsDeleteChapterModalOpen(false)}
        onConfirm={confirmDeleteChapter}
        chapterTitle={book.chapters[chapterToDeleteIndex]?.title}
      />
    </>
  );
}

export default EditorPage;
