import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="border p-4">
      <h3 className="font-bold">{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.price} ₽</p>
      <Link to={`/book/${book.id}`} className="text-blue-500">
        Подробнее
      </Link>
    </div>
  );
};

export default BookCard;
