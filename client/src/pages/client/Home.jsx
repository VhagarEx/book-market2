import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        {/* Header и hero */}
        <section className="py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 flex flex-col gap-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2 fade-in">Открой для себя истории</h1>
              <p className="text-lg md:text-xl text-gray-700 mb-4 fade-in" style={{animationDelay: '0.1s'}}>
                Добро пожаловать в OpenTome — идеальное место для любителей книг со всего мира. Будь вы заядлым читателем в поисках следующей великой книги или продавцом, желающим расширить свою аудиторию, OpenTome сделает ваш опыт простым и приятным.
              </p>
              <Link to="/catalog" className="w-fit px-8 py-3 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 fade-in" style={{animationDelay: '0.2s'}}>Каталог</Link>
              <div className="flex gap-8 mt-8">
                <div className="text-center fade-in hover-scale" style={{animationDelay: '0.3s'}}>
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-gray-500 text-sm">Стран обслужено</div>
                </div>
                <div className="text-center fade-in hover-scale" style={{animationDelay: '0.4s'}}>
                  <div className="text-3xl font-bold">500K+</div>
                  <div className="text-gray-500 text-sm">Книг предоставлено</div>
                </div>
                <div className="text-center fade-in hover-scale" style={{animationDelay: '0.5s'}}>
                  <div className="text-3xl font-bold">200K+</div>
                  <div className="text-gray-500 text-sm">Отзывы и оценки</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/imgs/home/main1.png" alt="Библиотека" className=" w-full max-w-md object-cover" />
            </div>
          </div>
        </section>

        {/* Наши услуги */}
        <section className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 fade-in">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-gray-50 rounded-xl shadow fade-in hover-scale hover:glow-animation">
              <img src="/imgs/home/ourServiceIcon1.png" alt="Коллекция книг" className="w-14 h-14 mb-2" />
              <h3 className="text-xl font-bold">Обширная коллекция книг</h3>
              <p className="text-gray-600 text-sm">Найдите тысячи книг по жанрам и языкам — от бестселлеров до классики</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-gray-50 rounded-xl shadow fade-in hover-scale hover:glow-animation" style={{animationDelay: '0.1s'}}>
              <img src="/imgs/home/ourServiceIcon2.png" alt="Покупки" className="w-14 h-14 mb-2" />
              <h3 className="text-xl font-bold">Бесшовный опыт покупок</h3>
              <p className="text-gray-600 text-sm">Удобный поиск, безопасная оплата, множество способов оплаты и отслеживание заказа в реальном времени</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-gray-50 rounded-xl shadow fade-in hover-scale hover:glow-animation" style={{animationDelay: '0.2s'}}>
              <img src="/imgs/home/ourServiceIcon3.png" alt="Рекомендации" className="w-14 h-14 mb-2" />
              <h3 className="text-xl font-bold">Персональные рекомендации</h3>
              <p className="text-gray-600 text-sm">Получайте советы по книгам на основе ваших интересов и читайте отзывы других читателей</p>
            </div>
          </div>
        </section>

        {/* Откройте свою следующую любимую книгу */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <img src="/imgs/home/main2.png" alt="Книжная полка" className="rounded-2xl w-full max-w-md object-cover shadow-lg" />
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">Откройте свою следующую любимую книгу</h2>
              <p className="text-gray-700">Повысьте качество чтения с нашей тщательно подобранной коллекцией книг, отражающей ваши уникальные вкусы и интересы. Мы заботливо подбираем книги, чтобы подарить вам незабываемое литературное путешествие.</p>
              <div className="mt-4 flex flex-col gap-5">
                <div className="font-medium cursor-pointer hover:underline">Коллекция художественной литературы</div>
                <div className="font-medium cursor-pointer hover:underline">Коллекция нехудожественной литературы</div>
              </div>
            </div>
          </div>
        </section>

        {/* Найдите свою следующую книгу в три простых шага */}
        <section className="py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Найдите свою следующую книгу в три простых шага</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <img src="/imgs/home/finding1.png" alt="Откройте" className="w-10 h-10" />
                  <div>
                    <div className="font-semibold">Откройте</div>
                    <div className="text-gray-600 text-sm">Изучайте нашу огромную коллекцию. Просматривайте широкий спектр жанров и категорий, чтобы найти книги, которые вас заинтересуют.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <img src="/imgs/home/finding2.png" alt="Выберите" className="w-10 h-10" />
                  <div>
                    <div className="font-semibold">Выберите</div>
                    <div className="text-gray-600 text-sm">Читайте отзывы и описания. Выбирайте книгу, читая подробные описания и отзывы покупателей.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <img src="/imgs/home/finding3.png" alt="Наслаждайтесь" className="w-10 h-10" />
                  <div>
                    <div className="font-semibold">Наслаждайтесь</div>
                    <div className="text-gray-600 text-sm">Быстрая покупка и доставка. Завершите покупку через наш безопасный сервис и наслаждайтесь быстрой доставкой прямо к вашей двери.</div>
                  </div>
                </div>
              </div>
            </div>
            <img src="/imgs/home/main3.png" alt="Кресло для чтения" className="rounded-2xl w-full max-w-md object-cover shadow-lg" />
          </div>
        </section>

        {/* Отзывы о нас */}
        <section className="py-12 md:py-20 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Отзывы о нас</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black text-white rounded-xl p-8 flex flex-col gap-4 shadow">
              <div className="text-3xl font-bold">“</div>
              <div>OpenTome стал моим любимым сервисом для всего, что связано с книгами. Огромный выбор и персональные рекомендации познакомили меня со многими новыми авторами. Очень рекомендую!</div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <div className="font-semibold">Екатирина</div>
                  <div className="text-gray-400 text-xs">Россия, Москва</div>
                </div>
              </div>
            </div>
            <div className="bg-black text-white rounded-xl p-8 flex flex-col gap-4 shadow">
              <div className="text-3xl font-bold">“</div>
              <div>Ищу ли я последний бестселлер или классику — в OpenTome всегда есть то, что мне нужно. Подробные описания и отзывы помогают сделать лучший выбор.</div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <div className="font-semibold">Александр</div>
                  <div className="text-gray-400 text-xs">Беларусь, Минск</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Подписка на рассылку */}
        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Подпишитесь на нашу рассылку, чтобы получать книжные новости</h2>
            <p className="text-gray-600 mb-6">Будьте в курсе последних книжных новинок, специальных предложений и персональных рекомендаций. Присоединяйтесь к нашему сообществу книголюбов уже сегодня!</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input type="email" placeholder="Введите ваш email" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
              <button type="submit" className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">Подписаться</button>
            </form>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-black text-white w-full py-12 mt-8">
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-4 md:px-12 lg:px-24">
          <div className="flex flex-col gap-4">
            <div className="font-bold text-xl mb-2">OpenTome</div>
            <div className="text-gray-400 text-sm">Следите за нами в <a href="#" className="underline">Telegram</a> чтобы быть в курсе последних новостей, книжных рекомендаций и многого другого!</div>
            <div className="flex gap-3 mt-2">
              <span className="i-mdi:instagram text-2xl"></span>
              <span className="i-mdi:twitter text-2xl"></span>
              <span className="i-mdi:facebook text-2xl"></span>
              <span className="i-mdi:linkedin text-2xl"></span>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Наши услуги</div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Коллекция книг</li>
              <li>Бесшовные покупки</li>
              <li>Рекомендации</li>
              <li>Акции и скидки</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Наши услуги</div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Отзывы</li>
              <li>Инсайты</li>
              <li>Цены</li>
              <li>Вопросы по книгам</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Контакты</div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>info@opentome.com</li>
              <li></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;