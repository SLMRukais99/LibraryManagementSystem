import React from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Book, "id">) => void;
  defaultValues: Omit<Book, "id">; 
}

const ModalForm = ({ open, onClose, onSubmit, defaultValues }: ModalFormProps) => {
  const [formData, setFormData] = React.useState(defaultValues);

  React.useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-80 p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">{defaultValues.title ? "Edit Book" : "Add Book"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Title</label>
            <input
              className="block w-full border px-3 py-2 rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Author</label>
            <input
              className="block w-full border px-3 py-2 rounded"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Description</label>
            <textarea
              className="block w-full border px-3 py-2 rounded"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;