import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-6 md:px-12 lg:px-24 py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Логотип */}
        <div className="text-2xl font-bold">OpenTome</div>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-black transition-colors">Главная</Link>
          <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Каталог</Link>
          <Link to="/cart" className="text-gray-700 hover:text-black transition-colors">Корзина</Link>
          <Link to="/orders" className="text-gray-700 hover:text-black transition-colors">Заказы</Link>
          {/* <Link to="/contact" className="text-gray-700 hover:text-black transition-colors">Contact</Link> */}
        </nav>

        {/* Кнопки */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2 text-gray-700 hover:text-black transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
