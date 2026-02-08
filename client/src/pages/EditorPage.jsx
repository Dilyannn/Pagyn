import { useEffect, useState, useRef } from "react";
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

  const handleChapterChange = (e) => {};

  const handleAddChapter = () => {};

  const handleDeleteChapter = (index) => {};

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
          <div className="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
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
      </div>
    </>
  );
}

export default EditorPage;
