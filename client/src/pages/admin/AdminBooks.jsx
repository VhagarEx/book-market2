import { useEffect, useState } from "react";
import api from "../../api/api";

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
    try {
      const res = await api.get(
        "/books",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [token]);

  // ===== ADD =====
  const addBook = async () => {
    try {
      await api.post(
        "/books",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setForm({ title: "", author: "", price: "", image: "" });
      fetchBooks();
      alert("Книга добавлена успешно!");
    } catch (err) {
      console.error("Failed to add book:", err);
      alert(err.response?.data?.error || "Ошибка добавления книги");
    }
  };

  // ===== DELETE =====
  const deleteBook = async (id) => {
    if (!window.confirm("Удалить эту книгу?")) return;

    try {
      await api.delete(
        `/books/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ); 

      fetchBooks();
      alert("Книга удалена успешно!");
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert(err.response?.data?.error || "Ошибка удаления книги");
    }
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
    try {
      await api.put(
        `/books/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditId(null);
      setForm({ title: "", author: "", price: "", image: "" });
      fetchBooks();
      alert("Книга обновлена успешно!");
    } catch (err) {
      console.error("Failed to update book:", err);
      alert(err.response?.data?.error || "Ошибка обновления книги");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 fade-in">📚 Управление книгами</h1>
          <p className="text-gray-600">Добавляйте, редактируйте и удаляйте книги из каталога</p>
        </div>

        {/* ADD BOOK FORM */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 sm:p-8 mb-10 fade-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">➕ Добавить новую книгу</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Название</label>
              <input
                placeholder="Название книги"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Автор</label>
              <input
                placeholder="ФИО автора"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-sm"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Цена (₽)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-sm"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL изображения</label>
              <input
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-sm"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={addBook}
            className="w-full sm:w-auto px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
          >
            Добавить книгу
          </button>
        </div>

        {/* BOOKS LIST */}
        <div>
          <h2 className="text-2xl font-bold mb-6">📖 Книги в каталоге ({books.length})</h2>
          
          {books.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">Нет книг в каталоге</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {books.map((book, idx) => (
                <div
                  key={book.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all fade-in hover-scale"
                  style={{animationDelay: `${idx * 0.05}s`}}
                >
                  {editId === book.id ? (
                    // EDIT MODE
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Название</label>
                          <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Автор</label>
                          <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Цена</label>
                          <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">URL изображения</label>
                          <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => saveEdit(book.id)}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          💾 Сохранить
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                        >
                          ✕ Отменить
                        </button>
                      </div>
                    </div>
                  ) : (
                    // VIEW MODE
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
                        <p className="text-sm text-gray-600">Автор: {book.author}</p>
                        <p className="text-lg font-semibold text-black mt-2">{book.price} ₽</p>
                      </div>
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        <button
                          onClick={() => startEdit(book)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                          ✏️ Редактировать
                        </button>
                        <button
                          onClick={() => deleteBook(book.id)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                        >
                          🗑️ Удалить
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
