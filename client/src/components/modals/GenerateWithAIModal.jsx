import React from "react";
import { Sparkles, MessageSquareText, Wand2 } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import SelectField from "../ui/SelectField.jsx";
import TextAriaField from "../ui/TextAriaField.jsx";
import Button from "../ui/Button.jsx";

const AI_STYLES = [
  { label: "Informative & Storytelling", value: "Informative, Storytelling" },
  { label: "Creative & Descriptive", value: "Creative, Descriptive" },
  { label: "Professional & Formal", value: "Professional, Formal" },
  { label: "Academic & Analytical", value: "Academic, Analytical" },
  { label: "Humorous & Engaging", value: "Humorous, Engaging" },
  { label: "Simple & Direct", value: "Simple, Direct" },
];

function GenerateWithAIModal({
  isOpen,
  onClose,
  onGenerate,
  aiStyle,
  setAiStyle,
  chapterTitle,
  isGenerating,
}) {
  const [chapterDescription, setChapterDescription] = React.useState("");

  const handleGenerate = () => {
    onGenerate(chapterDescription);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Chapter Content"
      icon={Sparkles}
    >
      <div className="space-y-6">
        <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
          <p className="text-sm text-violet-800">
            Generating content for: <span className="font-bold">{chapterTitle}</span>
          </p>
        </div>

        <div className="space-y-4">
          <SelectField
            label="Writing Style"
            icon={Wand2}
            options={AI_STYLES}
            value={aiStyle}
            onChange={(val) => setAiStyle(val)}
            placeholder="Select a writing style"
          />

          <TextAriaField
            label="Additional Context / Topics (Optional)"
            icon={MessageSquareText}
            placeholder="What should this chapter be about? (e.g., 'Describe the protagonist's arrival at the mysterious cave...')"
            value={chapterDescription}
            onChange={(e) => setChapterDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            isLoading={isGenerating}
            icon={Sparkles}
            className="cursor-pointer"
          >
            Generate Content
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default GenerateWithAIModal;
