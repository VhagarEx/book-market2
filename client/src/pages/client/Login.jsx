import { useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.dispatchEvent(new Event("userUpdated"));

    if (res.data.user.role === "admin") {
      navigate("/admin/books");
    } else {
      navigate("/");
    }

  } catch (err) {
    setError(err.response?.data?.error || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex bg-white">
      {/* Левая колонка - форма */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-24 xl:px-32 py-12 lg:py-0">
        <div className="max-w-md mx-auto w-full">
          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Вход</h1>
            <p className="text-sm sm:text-base text-gray-600">Добро пожаловать в OpenTome</p>
          </div>

          {/* Форма */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs sm:text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* Email поле */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Email или имя пользователя
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                placeholder="Введите ваш email"
                required
              />
            </div>

            {/* Password поле */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-10"
                  placeholder="Введите ваш пароль"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me и Forgot password */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor="remember" className="ml-2 block text-xs sm:text-sm text-gray-700">
                  Запомнить меня
                </label>
              </div>
              
              <Link to="/forgot-password" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">
                Забыли пароль?
              </Link>
            </div>

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-3 px-4 text-sm sm:text-base bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Вход..." : "Вход"}
            </button>

            {/* Ссылка на регистрацию */}
            <div className="text-center pt-4 sm:pt-6 border-t border-gray-100">
              <p className="text-xs sm:text-sm text-gray-600">
                Нет аккаунта?{" "}
                <Link to="/register" className="text-gray-900 font-medium hover:underline">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Правая колонка - изображение (скрыто на мобилке) */}
      <img src="/public/log/logandreg.png" alt="Login" className="hidden lg:block w-256 h-256 object-cover"/>
    </div>
  );
}

export default Login;