import { BACKEND_URL } from "../../utils/api.js";
import InputFields from "../ui/InputField.jsx";
import Button from "../ui/Button.jsx";
import { Upload, UploadCloud, BookOpen } from "lucide-react";


function BookDetailsTab({
  book,
  onBookChange,
  onCoverArtUpload,
  fileInputRef,
  isUploading,
}) {
  const coverArtUrl = (book && book.coverArt && book.coverArt !== "default-cover.png") 
    ? (book.coverArt.startsWith("http") 
        ? book.coverArt 
        : `${BACKEND_URL}${book.coverArt.startsWith("/") ? "" : "/uploads/"}${book.coverArt}`.replace(/\\/g, "/"))
    : null;

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Book Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputFields
            label="Title"
            name="title"
            value={book.title}
            onChange={onBookChange}
          />
          <InputFields
            label="Author"
            name="author"
            value={book.author}
            onChange={onBookChange}
          />
          <div className="md:col-span-2">
            <InputFields 
              label="Subtitle"
              name="subtitle"
              value={book.subtitle || ""}
              onChange={onBookChange}
            />
          </div>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center sm:text-left">Cover Image</h3>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {coverArtUrl ? (
            <img src={coverArtUrl} alt="Cover" className="w-32 h-48 object-cover rounded-lg bg-slate-100 shadow-sm border border-slate-200" />
          ) : (
            <div className="w-32 h-48 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <BookOpen className="w-8 h-8 mb-2" />
              <span className="text-[10px] font-medium px-2 uppercase tracking-wider">No Cover</span>
            </div>
          )}
          <div>
            <p className="text-sm text-slate-600 mb-4 font-medium">Upload a custom cover image (optional)</p>
            <input 
              type="file"
              ref={fileInputRef}
              onChange={onCoverArtUpload}
              className="hidden"
              accept="image/*"
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current.click()}
              isLoading={isUploading}
              icon={UploadCloud}
              className="cursor-pointer"
            >
              Upload Cover
            </Button>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsTab