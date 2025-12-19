import { useEffect, useState } from "react";
import ModalForm from "../components/ModalForm";
import { api } from "../services/api";

// TypeScript interface for a Book record
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const BookList = () => {
  // State to store book records
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // State for confirmation and notifications
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    bookId: number | null;
  }>({ isOpen: false, bookId: null });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.getBooks();
        setBooks(data as Book[]);
      } catch (err) {
        console.error("Failed to fetch books:", err);
        showNotification("Failed to fetch books.", "error");
      }
    };

    fetchBooks();
  }, []);

  // Display success/error notification for 3 seconds
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: null });
    }, 3000);
  };

  const handleAddClick = () => {
    setEditingBook(null);
    setModalOpen(true);
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setModalOpen(true);
  };

  // Open the delete confirmation modal
  const confirmDelete = (bookId: number) => {
    setDeleteConfirmation({ isOpen: true, bookId });
  };

  // Handle the actual delete action
  const handleDelete = async () => {
    try {
      if (deleteConfirmation.bookId !== null) {
        await api.deleteBook(deleteConfirmation.bookId);
        const { data } = await api.getBooks();
        setBooks(data as Book[]);
        showNotification("Book deleted successfully!", "success");
      }
    } catch (err) {
      console.error("Error deleting the book:", err);
      showNotification("Failed to delete the book.", "error");
    } finally {
      setDeleteConfirmation({ isOpen: false, bookId: null });
    }
  };

  // Handles form submission for both adding and editing
  const handleFormSubmit = async (data: Omit<Book, "id">) => {
    try {
      if (editingBook) {
        await api.updateBook(editingBook.id, data);
        showNotification("Book updated successfully!", "success");
      } else {
        await api.createBook(data);
        showNotification("Book added successfully!", "success");
      }
      const { data: booksData } = await api.getBooks();
      setBooks(booksData as Book[]);
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving book:", err);
      showNotification("Failed to save the book.", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Library Management</h1>

      {/* Notification */}
      {notification.type && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50 ${
            notification.type === "success"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <button
        onClick={handleAddClick}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Book
      </button>

      <table className="w-full border border-gray-300 table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 w-1/6">Title</th>
            <th className="border px-4 py-2 w-1/6">Author</th>
            <th className="border px-4 py-2 w-1/2">Description</th>
            <th className="border px-4 py-2 w-32 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 break-words">{book.title}</td>
              <td className="border px-4 py-2 break-words">{book.author}</td>
              <td className="border px-4 py-2 break-words">{book.description}</td>
              <td className="border px-4 py-2 w-32">
                <div className="flex justify-center items-center gap-2 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(book.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={
          editingBook || {
            title: "",
            author: "",
            description: "",
          }
        }
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this book?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() =>
                  setDeleteConfirmation({ isOpen: false, bookId: null })
                }
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;