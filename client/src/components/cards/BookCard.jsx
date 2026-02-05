import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../utils/api"
import { Edit2, Trash2 } from "lucide-react"

function BookCard({ book, onDelete }) {
  const navigate = useNavigate();
  let coverArtUrl = null;

  if (book.coverArt && book.coverArt !== "default-cover.png") {
    if (book.coverArt.startsWith("http")) {
      coverArtUrl = book.coverArt;
    } else {
      coverArtUrl = `${BASE_URL}/uploads/${book.coverArt}`;
    }
  }

  const fallbackGradient = "bg-linear-to-b from-amber-300 via-orange-400 to-orange-500";

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/editor/${book._id}/edit`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if(onDelete) onDelete(book._id);
  };

  const handleCardClick = () => {
    navigate(`/view-book/${book._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative group aspect-2/3 w-full rounded-4xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2 ${!coverArtUrl ? fallbackGradient : 'bg-gray-100'}`}
    >
      {/* Background Image / Illustration */}
      {coverArtUrl && (
        <img 
          src={coverArtUrl} 
          alt={book.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}

      {/* Gradient Overlay: Darker at bottom for text readability, subtle at top */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
      
      {/* Extra top gradient for the author text visibility */}
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Action Buttons - Top Right (Visible on Hover) */}
      <div className="absolute top-4 right-4 flex space-x-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
        <button 
          onClick={handleEdit}
          className="p-3 bg-white hover:bg-gray-50 text-gray-700 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Edit Book"
        >
          <Edit2 className="w-5 h-5 text-gray-700" />
        </button>
        <button 
          onClick={handleDelete}
          className="p-3 bg-white hover:bg-red-50 text-red-500 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Delete Book"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
        
        {/* Top: Subtitle or Author */}
        <div className="w-full text-center pt-2">
          <span className="text-white/90 text-sm font-medium tracking-widest uppercase drop-shadow-md font-sans">
            {book.subtitle || book.author || "Author"}
          </span>
        </div>
        
        {/* Middle: Title (Centered in available space) */}
        <div className="flex-1 flex flex-col items-center justify-start mt-8">
          <h3 className="text-3xl sm:text-4xl font-black text-white text-center leading-[1.1] drop-shadow-lg line-clamp-4 font-sans tracking-tight">
            {book.title}
          </h3>
        </div>

        {/* Bottom: Footer Info */}
        <div className="pt-4 border-t border-white/10 mt-auto">
          <p className="text-white/90 text-xs font-bold uppercase tracking-wider mb-1">
            {book.author}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white font-medium text-sm truncate opacity-80">
              {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;