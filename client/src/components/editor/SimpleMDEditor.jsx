import MDEditor from "@uiw/react-md-editor";
import { Type } from "lucide-react";

function SimpleMDEditor({
  value,
  onChange,
}) {
  return (
    <div data-color-mode="light" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Type className="w-4 h-4" />
          <span>Markdown Editor</span>
        </div>
      </div>

      <div className="p-0">
        <MDEditor
          value={value}
          onChange={onChange}
          height={400}
          preview="live"
          hideToolbar={true}
        />
      </div>
    </div>
  );
}

export default SimpleMDEditor