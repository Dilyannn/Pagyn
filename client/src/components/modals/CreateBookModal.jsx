import { useState, useRef, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_ENDPOINTS } from "../../utils/api.js";

import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

import {
  Sparkles,
  BookOpen,
  Hash,
  Lightbulb,
} from "lucide-react";

function CreateBookModal({ isOpen, onClose, onBookCreated }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [numChapters, setNumChapters] = useState(3);

  const [topic, setTopic] = useState(""); // for the AI outline generation
  const [chapters, setChapters] = useState([]); // AI-generated chapters
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false); 
  
  const chaptersRef = useRef([]); //& chapter container ref for auto-scrolling

  const resetModal = () => {
    setStep(1);
    setTitle("");
    setNumChapters(3);
    setTopic("");
    setChapters([]);
    setIsGeneratingOutline(false);
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
  }, [chapters.length, step]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetModal();
      }}
      title="Create New eBook"
    >
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-2">
          <div className="flex items-center justify-center mb-10 relative px-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 ${step >= 1 ? 'bg-violet-100 text-violet-700 ring-4 ring-violet-50' : 'bg-gray-100 text-gray-400'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-violet-200' : 'bg-gray-100'}`}></div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 ${step >= 2 ? 'bg-violet-100 text-violet-700 ring-4 ring-violet-50' : 'bg-gray-100 text-gray-400'}`}>
              2
            </div>
          </div>

          <div className="space-y-5">
            <InputField
              icon={BookOpen}
              label="Book Title"
              placeholder="Enter your book title"
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50/50"
            />

            <InputField
              icon={Hash}
              label="Number of Chapters"
              type="number"
              placeholder="3"
              value={numChapters}
              onChange={(e) => setNumChapters(parseInt(e.target.value) || 1)}
              min="1"
              max="20"
              className="bg-gray-50/50"
            />

            <InputField
              icon={Lightbulb}
              label="Book Topic (Optional)"
              placeholder="e.g. Personal Finance, Mindfulness, etc."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50/50"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleGenerateOutline}
              isLoading={isGeneratingOutline}
              icon={Sparkles}
              className="w-full bg-linear-to-r from-violet-400 to-purple-400 hover:from-violet-400 hover:to-purple-300 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-violet-400/20"
            >
              Generate with AI
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default CreateBookModal