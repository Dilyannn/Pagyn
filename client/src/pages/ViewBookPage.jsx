import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Book } from "lucide-react";

import DashboardMainLayout from "../components/layout/DashboardMainLayout.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { API_ENDPOINTS } from "../utils/api.js";
import ViewBook from "../components/view/ViewBook.jsx"

const ViewBookSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
    <div className="flex gap-8">
      <div className="w-1/4">
        <div className="h-96 bg-slate-200 rounded-lg"></div>
      </div>
      <div className="w-3/4">
        <div className="h-full bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

function ViewBookPage() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.BOOKS.GET_BOOK_BY_ID(bookId));
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error("Failed to load book. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  return (
    <div>ViewBookPage</div>
  )
}

export default ViewBookPage