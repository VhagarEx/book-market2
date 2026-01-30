import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

const GENRES = [
  "Все жанры", "Приключения", "Детектив", "Ужасы", "Триллер", "Романтика", "Исторический", "Фэнтези"
];
const RECOMMENDATIONS = [
  "Автор месяца", "Книга года", "Лучший жанр", "В тренде"
];

function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("Все жанры");
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Функция для добавления в корзину
  const handleBuyNow = (bookId) => {
    if (!token) {
      alert("Please login first");
      return;
    }
    api.post(
      "/cart",
      { bookId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(() => {
      alert("Added to cart!");
    })
    .catch((err) => {
      console.error(err);
      alert(err.response?.data?.error || "Error adding to cart");
    });
  };

  // Заглушка для фильтрации
  const filteredBooks = genre === "Все жанры" ? books : books.filter(b => b.genre === genre);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto flex gap-12 px-4 md:px-12 lg:px-24 py-12">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block">
          <div className="mb-8">
            <div className="font-bold text-lg mb-4">Книги по жанрам</div>
            <ul className="space-y-2">
              {GENRES.map(g => (
                <li key={g}>
                  <button
                    className={`block text-left w-full px-2 py-1 rounded font-medium transition-colors ${genre === g ? "text-black font-bold" : "text-gray-600 hover:text-black"}`}
                    onClick={() => setGenre(g)}
                  >
                    {g}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-lg mb-4">Рекомендации</div>
            <ul className="space-y-2">
              {RECOMMENDATIONS.map(r => (
                <li key={r} className="text-gray-600 hover:text-black cursor-pointer font-medium">{r}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {/* Поиск (заглушка) */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Поиск книги"
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              disabled
            />
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book, idx) => (
              <Link
                key={book.id || idx}
                to={`/book/${book.id}`}
                className="flex flex-col items-center gap-4 p-4 rounded-xl shadow hover:shadow-lg transition-all bg-white cursor-pointer group"
              >
                <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-xl mb-2">
                  <img src={book.image || "/imgs/home/main1.png"} alt={book.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="w-full text-left">
                  <div className="font-bold text-lg mb-1">{book.title}</div>
                  <div className="text-gray-600 text-sm mb-1">Автор: {book.author}</div>
                  {/* Заглушка отзывов */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-gray-400 text-xs">1 988 288 оценок</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">Описание книги. Здесь будет краткое описание или аннотация.</div>
                </div>
                <button
                  type="button"
                  onClick={e => { e.preventDefault(); handleBuyNow(book.id); }}
                  className="w-full px-6 py-2 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all"
                >
                  Купить
                </button>
              </Link>
            ))}
          </div>

          {/* Если книг нет */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-xl text-gray-600">Нет доступных книг</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Catalog;