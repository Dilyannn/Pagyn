import { useState, useRef, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_ENDPOINTS } from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext.js";

import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import SelectField from "../ui/SelectField";

import {
  Plus,
  Sparkles,
  Trash2,
  ArrowLeft,
  BookOpen,
  Hash,
  LightBulb,
  Palette,
} from "lucide-react";
import toast from "react-hot-toast";

function CreateBookModal({ isOpen, onClose, onBookCreated }) {
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [numChapters, setNumChapters] = useState(3);

  const [topic, setTopic] = useState(""); // for the AI outline generation
  const [style, setStyle] = useState(""); // for the AI outline generation
  const [chapters, setChapters] = useState([]); // AI-generated chapters
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false); 
  const [isFinalizing, setIsFinalizing] = useState(false);
  
  const chaptersRef = useRef([]); //& chapter container ref for auto-scrolling

  const resetModal = () => {
    setStep(1);
    setTitle("");
    setNumChapters(3);
    setTopic("");
    setStyle("");
    setChapters([]);
    setIsGeneratingOutline(false);
    setIsFinalizing(false);
  };

  const handleGenerateOutline = async () => {};

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleChapter = () => {
    setChapters([
      ...chapters,
      { title: `Chapter ${chapters.length + 1}`, description: "" },
    ]);
  };

  const handleFinalizeBook = async () => {};

  useEffect(() => {
    if (step === 2 && chaptersRef.current) {
      const scrollableDiv = chaptersRef.current;
      scrollableDiv.scrollTo({
        top: scrollableDiv.scrollHeight,
        behavior: "smooth",
      });
    }
  }), [chapters.length, step];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetModal();
      }}
      title="Create New eBook"
    >
      Content Here
    </Modal>
  )
}

export default CreateBookModal