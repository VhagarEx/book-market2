import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";


function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get(`/books/${id}`)
      .then((res) => setBook(res.data));
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post(
        "/cart",
        { bookId: book.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Книга добавлена в корзину");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Ошибка при добавлении в корзину");
    }
  };

  if (!book) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="text-gray-500 text-xl">Загрузка...</div></div>;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 md:px-12 lg:px-24 py-12">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 bg-white rounded-xl shadow p-8">
        {/* Левая часть: только изображение товара */}
        <div className="w-full max-w-xs flex-shrink-0 flex items-center justify-center">
          <img
            src={book.image || "/imgs/home/main1.png"}
            alt={book.title}
            className="w-64 h-64 object-cover rounded shadow-lg"
          />
        </div>

        {/* Правая часть: инфо */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <div className="text-gray-500 text-sm mb-1">Рекомендуемая книга недели</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
          <div className="text-gray-600 text-sm mb-2">Автор: {book.author}</div>
          {/* Рейтинг (заглушка) */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 text-xl">★★★★☆</span>
            <span className="text-gray-400 text-xs">4.0</span>
          </div>
          <div className="text-gray-600 mb-4">
            Начните читать, просматривая популярные категории книг. 1000+ книг публикуется разными авторами каждый день. Покупайте ваши любимые книги на OpenTome сегодня.
          </div>
          <div className="text-2xl font-bold mb-4">{book.price ? `${book.price} ₽` : "$ 45.00"}</div>
          <button
            onClick={addToCart}
            className="w-fit px-8 py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all"
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Book;
