
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-12 lg:px-24 py-4">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <img src="/imgs/home/ourServiceIcon1.png" alt="logo" className="w-8 h-8" />
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-black">OpenTome</span>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link to="/" className="text-gray-700 hover:text-black transition-colors">Home</Link>
          <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Categories</Link>
          <Link to="/cart" className="text-gray-700 hover:text-black transition-colors">Cart</Link>
          <Link to="/profile" className="text-gray-700 hover:text-black transition-colors">Profile</Link>
        </nav>

        {/* Кнопки или имя пользователя */}
        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              <span className="text-gray-700 font-medium whitespace-nowrap">{user.email || user.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
