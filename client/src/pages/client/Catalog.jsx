import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Catalog() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Функция для добавления в корзину
  const handleBuyNow = (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }
    
    axios.post(
      "http://localhost:5000/api/cart",
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
      alert("Error adding to cart");
    });
  };

  // Функция для получения заглушки обложки книги на основе названия
  const getBookCover = (title) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-700",
      "bg-gradient-to-br from-red-500 to-red-700",
      "bg-gradient-to-br from-green-500 to-green-700",
      "bg-gradient-to-br from-purple-500 to-purple-700",
      "bg-gradient-to-br from-yellow-500 to-yellow-700",
      "bg-gradient-to-br from-pink-500 to-pink-700",
      "bg-gradient-to-br from-indigo-500 to-indigo-700",
      "bg-gradient-to-br from-teal-500 to-teal-700",
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Берем первые буквы названия для текста на обложке
    const initials = title
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 3)
      .toUpperCase();
    
    return { color: randomColor, initials };
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-12 lg:px-24 py-12">
        {/* Заголовок секции */}
        <h1 className="text-4xl font-bold text-black mb-12">
          Adventure
        </h1>
        
        {/* Сетка карточек - 3 в ряд на десктопе */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => {
            const cover = getBookCover(book.title);
            const imageUrl = book.image || null;
            
            return (
              <div 
                key={book.id} 
                className="w-128 flex flex-col items-center space-y-6 p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {/* Обложка книги */}
                <div className="w-full max-w-xs h-80 rounded-lg overflow-hidden shadow-md">
                  <Link to={`/book/${book.id}`}>
                    <div>
                      <div className="text-white text-center p-4">
                        <img src={imageUrl} alt={book.title} />
                        <div className="text-6xl font-bold mb-2">{cover.initials}</div>
                        <div className="text-lg opacity-80">{book.author}</div>
                        <div className="text-sm opacity-60 mt-2">{book.price} ₽</div>
                      </div>
                    </div>
                  </Link>
                </div>
                
                {/* Название книги */}
                <div className="text-center">
                  <Link to={`/book/${book.id}`}>
                    <h3 className="text-xl font-medium text-black mb-2 hover:text-gray-700 transition-colors">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-1">{book.author}</p>
                  <p className="text-black font-semibold">{book.price} ₽</p>
                </div>
                
                {/* Кнопка Buy Now */}
                <button
                  onClick={() => handleBuyNow(book.id)}
                  className="px-8 py-3 border-2 border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>
        
        {/* Если книг нет */}
        {books.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-xl text-gray-600">No books available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;