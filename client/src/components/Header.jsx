
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const updateUserFromStorage = () => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUserFromStorage();

    window.addEventListener("storage", updateUserFromStorage);

    return () => window.removeEventListener("storage", updateUserFromStorage);
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      updateUserFromStorage();
    };
    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-12 lg:px-24 py-4">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 select-none" onClick={closeMenu}>
          <img src="/imgs/home/ourServiceIcon1.png" alt="logo" className="w-8 h-8" />
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-black">OpenTome</span>
        </Link>

        {/* Навигация - десктоп */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link to="/" className="text-gray-700 hover:text-black transition-colors">Главная</Link>
          <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Каталог</Link>
          <Link to="/cart" className="text-gray-700 hover:text-black transition-colors">Корзина</Link>
          <Link to="/profile" className="text-gray-700 hover:text-black transition-colors">Профиль</Link>
        </nav>

        {/* Кнопки или имя пользователя - десктоп */}
        <div className="hidden md:flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              <span className="text-gray-700 font-medium whitespace-nowrap">{user.email || user.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Выход
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Войти
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu - мобильный */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Меню"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white slide-in-left">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              onClick={closeMenu}
              className="text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Каталог
            </Link>
            <Link
              to="/cart"
              onClick={closeMenu}
              className="text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Корзина
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Профиль
            </Link>

            {/* Разделитель */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Мобильные кнопки авторизации */}
            {user ? (
              <>
                <div className="px-4 py-2 text-gray-700 font-medium text-sm">
                  {user.email || user.name || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Выход
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2 border border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Регистрация
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
