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
  //   State to store book records
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.getBooks();
        setBooks(data as Book[]);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, []);

  const handleAddClick = () => {
    setEditingBook(null);
    setModalOpen(true);
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setModalOpen(true);
  };

  const handleDeleteClick = async (bookId: number) => {
    try {
      await api.deleteBook(bookId);
      const { data } = await api.getBooks();
      setBooks(data as Book[]);
    } catch (err) {
      console.error("Error deleting the book:", err);
    }
  };

    // Handles form submission for both adding and editing
  const handleFormSubmit = async (data: Omit<Book, "id">) => {
    try {
      if (editingBook) {
        await api.updateBook(editingBook.id, data);
      } else {
        await api.createBook(data);
      }

      const { data: booksData } = await api.getBooks();
      setBooks(booksData as Book[]);
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Library Management</h1>

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
            <th className="border px-4 py-2 w-32 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 break-words">
                {book.title}
              </td>
              <td className="border px-4 py-2 break-words">
                {book.author}
              </td>
              <td className="border px-4 py-2 break-words">
                {book.description}
              </td>

              {/* ✅ Fixed Actions column */}
              <td className="border px-4 py-2 w-32">
                <div className="flex justify-center items-center gap-2 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(book.id)}
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
    </div>
  );
};

export default BookList;
