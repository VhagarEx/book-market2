import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => setBook(res.data));
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { bookId: book.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Товар добавлен в корзину");
    } catch (err) {
      console.error(err);
      alert("Ошибка добавления");
    }
  };

  if (!book) return <div>Загрузка...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.price} ₽</p>

      <button
        onClick={addToCart}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Добавить в корзину
      </button>
    </div>
  );
}

export default Book;
