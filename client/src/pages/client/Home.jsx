import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Герой-секция */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Текстовая часть */}
            <div className="lg:w-1/2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Uncover<br />
                <span className="text-gray-800">Stories</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                Welcome to OpenTome, the ultimate destination for book lovers around the globe. 
                Whether you're an avid reader searching for your next great read or a seller looking 
                to reach a wider audience, OpenTome is here to make your experience seamless and enjoyable.
              </p>
              
              <Link
                to="/catalog"
                className="inline-block px-10 py-4 bg-black text-white text-lg font-semibold rounded-lg 
                         hover:bg-gray-800 transition-colors shadow-md"
              >
                Start Journey
              </Link>
            </div>
            
            {/* Изображение (заглушка) */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-full max-w-lg h-80 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 
                            rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <p className="text-gray-500">Book Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="px-6 md:px-12 lg:px-24 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-gray-600">Book Served</div>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-bold mb-2">200K+</div>
              <div className="text-gray-600">Reviews & Ratings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Разделитель */}
      <div className="h-px bg-gray-200 mx-6 md:mx-12 lg:mx-24"></div>

      {/* Сервисы */}
      <section id="services" className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Сервис 1 */}
            <div className="p-8 text-center md:text-left">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Comprehensive Book Collection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find thousands of books across genres and languages, from bestsellers to classics.
              </p>
            </div>

            {/* Сервис 2 */}
            <div className="p-8 text-center md:text-left">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Seamless Shopping Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Easy search, secure checkout, multiple payment options, and real-time order tracking.
              </p>
            </div>

            {/* Сервис 3 */}
            <div className="p-8 text-center md:text-left">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Personalized Recommendations
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get book suggestions based on your interests and read reviews from fellow readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-gray-200 text-center text-gray-500">
        <p>© 2024 OpenTome. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;