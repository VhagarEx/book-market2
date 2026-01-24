import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: ""
  });

  const token = localStorage.getItem("token");

  // ===== FETCH =====
  const fetchBooks = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/books",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ===== ADD =====
  const addBook = async () => {
    await axios.post(
      "http://localhost:5000/api/admin/books",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setForm({ title: "", author: "", price: "", image: "" });
    fetchBooks();
  };

  // ===== DELETE =====
  const deleteBook = async (id) => {
    if (!window.confirm("Удалить книгу?")) return;

    await axios.delete(
      `http://localhost:5000/api/admin/books/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchBooks();
  };

  // ===== EDIT =====
  const startEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image || ""
    });
  };

  const saveEdit = async (id) => {
    await axios.put(
      `http://localhost:5000/api/admin/books/${id}`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditId(null);
    setForm({ title: "", author: "", price: "", image: "" });
    fetchBooks();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">📚 Admin Panel</h1>

      {/* ADD BOOK */}
      <div className="mb-10 grid grid-cols-4 gap-3">
        <input
          placeholder="Title"
          className="border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Author"
          className="border p-2"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
        />

        <input
          placeholder="Image URL"
          className="border p-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button
          onClick={addBook}
          className="col-span-4 bg-black text-white p-2 rounded"
        >
          ➕ Add book
        </button>
      </div>

      {/* BOOK LIST */}
      {books.map((book) => (
        <div
          key={book.id}
          className="border p-4 mb-3 flex justify-between items-center"
        >
          {editId === book.id ? (
            <div className="w-full">
              <input
                className="border p-1 w-full mb-2"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                className="border p-1 w-full mb-2"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
              />

              <input
                type="number"
                className="border p-1 w-full mb-2"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
              />

              <input
                className="border p-1 w-full mb-2"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(book.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  💾 Save
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <p className="font-bold">{book.title}</p>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p>{book.price} ₽</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(book)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  🗑 Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
