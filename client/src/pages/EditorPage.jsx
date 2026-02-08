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
import { arrayMove } from "@dnd-kit/sortable" //& For reordering sections

import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../utils/api";

import Dropdown, { DropdownItem } from "../components/ui/Dropdown.jsx";
import Button from "../components/ui/Button.jsx";
import InputField from "../components/ui/InputField.jsx";
import Modal from "../components/ui/Modal.jsx";
import SelectField from "../components/ui/SelectField.jsx";

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
        const response = await axiosInstance.get(API_ENDPOINTS.BOOKS.GET_BOOK_BY_ID(bookId));
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

  

  return (
    <div>EditorPage</div>
  )
}

export default EditorPage