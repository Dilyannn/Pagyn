import { useNavigate } from "react-router-dom"
import { Edit, Trash2 } from "lucide-react"

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

function BookCard({ book, onDelete }) {
  const navigate = useNavigate();

  const coverArtUrl = book.coverArt && book.coverArt !== "default-cover.png"
    ? (book.coverArt.startsWith('http') ? book.coverArt : `${SERVER_URL}/uploads/${book.coverArt}`)
    : "";

  return (
    <div 
        onClick={() => navigate(`/view-book/${book._id}`)} 
        className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 cursor-pointer hover:-translate-y-1 block h-full w-full"
    >
      <div className="relative overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 w-full aspect-16/25">
        <img 
          src={coverArtUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.style.display = "none" }}
        />

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${book._id}/edit`);
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"    
          >
            <Edit className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if(onDelete) onDelete(book);
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors group/delete cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-500 group-hover/delete:text-red-600" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 pointer-events-none">
        {/* Fixed: removed backdrop-blur-xs and fixed gradient color syntax here for clarity and to remove blur */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
        <div className="relative">
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2 mb-1 drop-shadow-md">{book.title}</h3>
          <p className="text-sm text-gray-200 font-medium drop-shadow-md">{book.author}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
    </div>
  )
}

export default BookCard;