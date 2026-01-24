import { useState } from "react";
import axios from "axios";
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

    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // 🔥 РЕДИРЕКТ ПО РОЛИ
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32">
        <div className="max-w-md mx-auto w-full">
          {/* Заголовок */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Log in</h1>
            <p className="text-gray-600">Welcome back to OpenTome</p>
          </div>

          {/* Форма */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* Email поле */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address or user name
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password поле */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-12"
                  placeholder="Enter your password"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                Forgot password?
              </Link>
            </div>

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            {/* Ссылка на регистрацию */}
            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-gray-900 font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Правая колонка - изображение */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-amber-50 to-amber-100">
        {/* Декоративная надпись */}
        <div className="absolute top-8 right-8 z-10">
          <div className="text-amber-800/80 font-serif italic text-lg tracking-widest transform rotate-3">
            book culture @ columbus
          </div>
        </div>
        
        {/* Стилизованные книжные полки */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full h-3/4 bg-gradient-to-b from-amber-200/30 to-amber-300/20 rounded-2xl overflow-hidden border border-amber-200/40">
            {/* Имитация книжных полок */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              {/* Верхняя полка */}
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className={`h-32 w-12 rounded bg-gradient-to-r ${
                      i % 3 === 0 ? 'from-amber-700 to-amber-800' :
                      i % 2 === 0 ? 'from-red-800 to-red-900' :
                      'from-blue-900 to-blue-950'
                    } transform rotate-1 shadow-lg`}
                    style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
                  />
                ))}
              </div>
              
              {/* Средняя полка */}
              <div className="flex space-x-4 justify-center">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div 
                    key={i} 
                    className={`h-40 w-10 rounded ${
                      i % 4 === 0 ? 'bg-gradient-to-b from-emerald-800 to-emerald-900' :
                      i % 3 === 0 ? 'bg-gradient-to-b from-purple-800 to-purple-900' :
                      i % 2 === 0 ? 'bg-gradient-to-b from-amber-800 to-amber-900' :
                      'bg-gradient-to-b from-gray-800 to-gray-900'
                    } transform -rotate-1 shadow-lg`}
                    style={{ 
                      height: `${140 + Math.random() * 40}px`,
                      transform: `rotate(${Math.random() * 1.5 - 0.75}deg)`
                    }}
                  />
                ))}
              </div>
              
              {/* Нижняя полка */}
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className={`h-36 w-14 rounded ${
                      i % 3 === 0 ? 'bg-gradient-to-r from-rose-900 to-rose-950' :
                      i % 2 === 0 ? 'bg-gradient-to-r from-indigo-900 to-indigo-950' :
                      'bg-gradient-to-r from-amber-900 to-amber-950'
                    } transform rotate-2 shadow-lg`}
                    style={{ 
                      height: `${120 + Math.random() * 30}px`,
                      transform: `rotate(${Math.random() * 1 - 0.5}deg)`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Эффект стекла/витрины */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-50/10 to-transparent" />
            
            {/* Декоративные элементы света */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-200/5 to-transparent rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-300/5 to-transparent rounded-full" />
          </div>
        </div>
        
        {/* Накладной текст для атмосферы */}
        <div className="absolute bottom-12 left-12 max-w-sm">
          <p className="text-amber-800/60 font-light text-lg italic">
            "A room without books is like a body without a soul."
            <span className="block text-amber-800/40 text-sm mt-2">— Marcus Tullius Cicero</span>
          </p>
        </div>
        
        {/* Эффект освещения */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-50/20 via-transparent to-amber-100/10" />
      </div>
    </div>
  );
}

export default Login;