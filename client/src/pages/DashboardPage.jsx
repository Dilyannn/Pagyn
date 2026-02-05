import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Book, BookOpen } from "lucide-react";

import DashboardMainLayout from "../components/layout/DashboardMainLayout";
import Button from "../components/ui/Button";
import BookCard from "../components/cards/BookCard.jsx";
import CreateBookModal from "../components/modals/CreateBookModal";
import DeleteBookModal from "../components/modals/DeleteBookModal";
// import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../utils/api";

function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(API_ENDPOINTS.BOOKS.GET_BOOKS);
        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        // Only show toast if it's a genuine server/connection error, not a "not found" or similar status
        if (err.response && err.response.status !== 404) {
          toast.error("Failed to fetch books. Please try again.");
        } else if (!err.response) {
          toast.error("Network error. Please check your connection.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleDeleteRequest = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`${API_ENDPOINTS.BOOKS.DELETE_BOOK}/${bookToDelete}`);
      setBooks(books.filter(b => b._id !== bookToDelete));
      toast.success("eBook deleted successfully");
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete eBook");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateBookClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateBook = (bookId) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${bookId}/edit`);
  }

  return (
    <DashboardMainLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div> 
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">All eBooks</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Create, edit, and manage all your AI-generated eBooks.
          </p>
        </div>
        <Button 
          onClick={handleCreateBookClick} 
          className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl shadow-xl shadow-violet-500/20 hover:shadow-violet-600/30 transition-all duration-300 transform cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New eBook
        </Button>
      </div>

      <div className="relative min-h-100">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard 
                key={book._id} 
                book={book} 
                onDelete={handleDeleteRequest} 
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-gray-50/30 p-12 lg:p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <BookOpen className="w-10 h-10 text-violet-400 opacity-60" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No eBooks Found</h3>
            <p className="text-gray-500 max-w-sm mb-10 text-lg leading-relaxed">
              You haven't created any eBooks yet. Get started by creating your first one.
            </p>
            <Button 
              onClick={handleCreateBookClick}
              variant="primary"
              className="px-8 py-4 rounded-2xl text-lg flex items-center cursor-pointer"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First eBook
            </Button>
            
            <button
                onClick={() => setBooks([
                  {
                    _id: "preview_1",
                    title: "30 DAY PRODUCTIVITY",
                    author: "Alex Clark",
                    subtitle: "Alex Thomas", 
                    createdAt: new Date().toISOString(),
                    coverArt: "", 
                  },
                  {
                    _id: "preview_2", 
                    title: "The Future of AI Art",
                    author: "Sarah Connor",
                    subtitle: "Tech Weekly",
                    createdAt: new Date().toISOString(),
                    coverArt: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
                  }
                ])}
                className="mt-6 text-violet-600 hover:text-violet-700 font-medium text-sm hover:underline cursor-pointer"
            >
              Preview Sample Cards
            </button>
          </div>
        )}
      </div>

      <CreateBookModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleCreateBook}
      />

      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        bookTitle={bookToDelete?.title}
        isLoading={isDeleting}
      />
    </DashboardMainLayout>
  )
}

export default DashboardPage