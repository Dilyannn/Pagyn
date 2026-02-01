export const BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_PROFILE: "/auth/profile",
    UPDATE_PROFILE: "/auth/profile",
  },
  BOOKS: {
    CREATE_BOOK: "/books",
    GET_BOOKS: "/books",
    GET_BOOK_BY_ID: (id) => `/books/${id}`,
    UPDATE_BOOK: (id) => `/books/${id}`,
    DELETE_BOOK: (id) => `/books/${id}`,
    UPDATE_BOOK_COVER: (id) => `/books/${id}/cover`,
  },
  AI: {
    GENERATE_OUTLINE: "/ai/generate-outline",
    GENERATE_CHAPTER_CONTENT: "/ai/generate-chapter-content",
  },
  EXPORT: {
    EXPORT_AS_DOCX: (bookId) => `/export/docx/${bookId}`,
    EXPORT_AS_PDF: (bookId) => `/export/pdf/${bookId}`,
  },
};