import { useState, useRef, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_ENDPOINTS } from "../../utils/api.js";

import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import SelectField from "../ui/SelectField";

import {
  Sparkles,
  BookOpen,
  Hash,
  Lightbulb,
  Check,
  Plus,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";

function CreateBookModal({ isOpen, onClose, onBookCreated }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [numChapters, setNumChapters] = useState(3);

  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState([]);
  const [chapters, setChapters] = useState([]); // AI-generated chapters
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);

  const chaptersRef = useRef([]); //& chapter container ref for auto-scrolling

  const resetModal = () => {
    setStep(1);
    setTitle("");
    setNumChapters(3);
    setTopic("");
    setGenre([]);
    setChapters([]);
    setIsGeneratingOutline(false);
  };

  const handleGenerateOutline = async () => {
    if (!title || !numChapters) {
      toast.error("Please provide both a title and number of chapters");
      return;
    }

    if (genre.length === 0) {
      toast.error("Please select at least one genre");
      return;
    }

    setIsGeneratingOutline(true);

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AI.GENERATE_OUTLINE, {
        topic: title,
        description: topic || "",
        style: genre.join(", "),
        numChapters: numChapters,
      });
      setChapters(response.data.chapters);
      setStep(2);
      toast.success("Outline generated successfully! You can now review and edit the chapters.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate outline. Please try again.");
    } finally {
      setIsGeneratingOutline(false);
    }
  };

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

  const handleDeleteChapter = (index) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  const handleFinalizeBook = async () => {
    onBookCreated({ title, numChapters, topic, genre, chapters });
    onClose();
    resetModal();
  };

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
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 ${step === 1 ? "bg-violet-100 text-violet-700 ring-4 ring-violet-50" : "bg-violet-500 text-white ring-4 ring-violet-50"}`}
            >
              {step > 1 ? <Check className="w-6 h-6" /> : "1"}
            </div>
            <div
              className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${step >= 2 ? "bg-violet-200" : "bg-gray-100"}`}
            ></div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 ${step >= 2 ? "bg-violet-100 text-violet-700 ring-4 ring-violet-50" : "bg-gray-100 text-gray-400"}`}
            >
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
              label="Topic (Optional)"
              placeholder="e.g. Personal Finance, Mindfulness, etc."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50/50"
            />

            <SelectField
              icon={BookOpen}
              label="Genre"
              placeholder="Select genres"
              value={genre}
              onChange={(newGenres) => setGenre(newGenres)}
              multiple={true}
              options={[
                "Adventure",
                "Informative",
                "Conversational",
                "Storytelling",
                "Fantasy",
                "Sci-Fi",
                "Mystery",
                "Supernatural",
                "Romance",
                "Casual",
                "Professional",
                "Humorous",
                "Motivational",
                "Inspirational",
                "Educational",
                "Technical",
                "Financial",
                "Health & Wellness",
                "Self-Help",
                "Business",
                "Marketing",
                "Productivity",
                "Creative Writing",
                "Children's",
                "Young Adult",
                "Historical Fiction",
                "Thriller",
                "Horror",
                "Comedy",
                "Satire",
                "Parody",
              ]}
              className="bg-gray-50/50"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleGenerateOutline}
              isLoading={isGeneratingOutline}
              icon={Sparkles}
              className="cursor-pointer w-full"
            >
              Generate with AI
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-2 h-full flex flex-col">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6 relative px-10 shrink-0">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 bg-violet-500 text-white ring-4 ring-violet-50`}
            >
              <Check className="w-6 h-6" />
            </div>
            <div
              className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 bg-violet-200`}
            ></div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 bg-violet-100 text-violet-700 ring-4 ring-violet-50`}
            >
              2
            </div>
          </div>

          {/* Header Info */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Review Chapters</h3>
            <span className="text-sm text-gray-500">
              {chapters.length} chapters
            </span>
          </div>

          {/* Chapters List */}
          <div
            ref={chaptersRef}
            className="space-y-3 max-h-96 overflow-y-auto pr-1"
          >
            {chapters.length === 0 ? (
              <div className="text-center py-12 px-4 bg-gray-50 rounded-xl">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  No chapters yet. Add one to get started
                </p>
              </div>
            ) : (
              chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="group p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) =>
                          handleChapterChange(index, "title", e.target.value)
                        }
                        className="flex-1 text-base font-medium text-gray-900 bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0"
                        placeholder="Chapter Title"
                      />
                      <button
                        onClick={() => handleDeleteChapter(index)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                        title="Delete Chapter"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    <textarea
                      value={chapter.description}
                      onChange={(e) =>
                        handleChapterChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      className="w-full pl-9 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-gray-600 placeholder-gray-400 p-0 text-sm resize-none min-h-[60px]"
                      placeholder="Add a brief description or key points for this chapter..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-2 w-full sm:w-auto">
              <Button
                onClick={() => setStep(1)}
                className="w-full justify-center cursor-pointer"
                icon={ArrowLeft}
              >
                Back
              </Button>
              <Button
                onClick={handleChapter}
                className="w-full justify-center cursor-pointer"
                icon={Plus}
              >
                Add
              </Button>
            </div>
            <Button
              onClick={handleFinalizeBook}
              className="w-full sm:w-auto justify-center cursor-pointer"
              icon={Sparkles}
            >
              Create eBook
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default CreateBookModal;
