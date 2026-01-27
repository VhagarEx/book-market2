
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        {/* Header и hero */}
        <section className="py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 flex flex-col gap-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">Uncover Stories</h1>
              <p className="text-lg md:text-xl text-gray-700 mb-4">
                Welcome to OpenTome, the ultimate destination for book lovers around the globe. Whether you're an avid reader searching for your next great read or a seller looking to reach a wider audience, OpenTome is here to make your experience seamless and enjoyable.
              </p>
              <Link to="/catalog" className="w-fit px-8 py-3 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition-colors">Start Journey</Link>
              <div className="flex gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-gray-500 text-sm">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500K+</div>
                  <div className="text-gray-500 text-sm">Book Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">200K+</div>
                  <div className="text-gray-500 text-sm">Reviews & Ratings</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/imgs/home/main1.png" alt="Library" className=" w-full max-w-md object-cover" />
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-gray-50 rounded-xl shadow">
              <img src="/imgs/home/ourServiceIcon1.png" alt="Book Collection" className="w-14 h-14 mb-2" />
              <h3 className="text-xl font-bold">Comprehensive Book Collection</h3>
              <p className="text-gray-600 text-sm">Find thousands of books across genres and languages, from bestsellers to classics</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-gray-50 rounded-xl shadow">
              <img src="/imgs/home/ourServiceIcon2.png" alt="Shopping" className="w-14 h-14 mb-2" />
              <h3 className="text-xl font-bold">Seamless Shopping Experience</h3>
              <p className="text-gray-600 text-sm">Easy search, secure checkout, multiple payment options, and real-time order tracking</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 bg-gray-50 rounded-xl shadow">
              <img src="/imgs/home/ourServiceIcon3.png" alt="Recommendations" className="w-14 h-14 mb-2" />
              <h3 className="text-xl font-bold">Personalized Recommendations</h3>
              <p className="text-gray-600 text-sm">Get book suggestions based on your interests and read reviews from fellow readers</p>
            </div>
          </div>
        </section>

        {/* Discover Your Next Favourite Book */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <img src="/imgs/home/main2.png" alt="Book Shelf" className="rounded-2xl w-full max-w-md object-cover shadow-lg" />
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">Discover Your Next Favourite Book</h2>
              <p className="text-gray-700">Elevate your reading experience with our curated selection of books that reflect your unique tastes and interests, crafted with care to bring you an unforgettable journey through literature</p>
              <div className="mt-4 flex flex-col gap-5">
                <div className="font-medium cursor-pointer hover:underline">Fiction Books Collection</div>
                <div className="font-medium cursor-pointer hover:underline">Non-Fiction Books Collection</div>
              </div>
            </div>
          </div>
        </section>

        {/* Finding Your Next Book in Three Simple Steps */}
        <section className="py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Finding Your Next Book in Three Simple Steps</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <img src="/imgs/home/finding1.png" alt="Discover" className="w-10 h-10" />
                  <div>
                    <div className="font-semibold">Discover</div>
                    <div className="text-gray-600 text-sm">Explore our vast collection. Browse through a wide range of genres and categories to find books that pique your interest</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <img src="/imgs/home/finding2.png" alt="Choose" className="w-10 h-10" />
                  <div>
                    <div className="font-semibold">Choose</div>
                    <div className="text-gray-600 text-sm">Read reviews and descriptions. Select your book by reading detailed descriptions and customer reviews</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <img src="/imgs/home/finding3.png" alt="Enjoy" className="w-10 h-10" />
                  <div>
                    <div className="font-semibold">Enjoy</div>
                    <div className="text-gray-600 text-sm">Seamless purchase and delivery. Complete your purchase with our secure checkout and enjoy fast, reliable delivery to your doorstep</div>
                  </div>
                </div>
              </div>
            </div>
            <img src="/imgs/home/main3.png" alt="Book Chair" className="rounded-2xl w-full max-w-md object-cover shadow-lg" />
          </div>
        </section>

        {/* Say About Us */}
        <section className="py-12 md:py-20 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Say About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black text-white rounded-xl p-8 flex flex-col gap-4 shadow">
              <div className="text-3xl font-bold">“</div>
              <div>OpenTome has become my go-to for all things books. The selection is incredible, and the personalized recommendations have introduced me to so many new authors. Highly recommend!</div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <div className="font-semibold">Sophie Carter</div>
                  <div className="text-gray-400 text-xs">New York, USA</div>
                </div>
              </div>
            </div>
            <div className="bg-black text-white rounded-xl p-8 flex flex-col gap-4 shadow">
              <div className="text-3xl font-bold">“</div>
              <div>Whether I'm looking for the latest bestseller or a classic, OpenTome always has what I need. The detailed descriptions and reviews help me make the best choices.</div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <div className="font-semibold">James Bennett</div>
                  <div className="text-gray-400 text-xs">Toronto, Canada</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter for Book Insights</h2>
            <p className="text-gray-600 mb-6">Stay updated with the latest book releases, special offers, and personalized recommendations. Join our community of book lovers today!</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
              <button type="submit" className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-black text-white w-full py-12 mt-8">
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-4 md:px-12 lg:px-24">
          <div className="flex flex-col gap-4">
            <div className="font-bold text-xl mb-2">OpenTome</div>
            <div className="text-gray-400 text-sm">Follow us on <a href="#" className="underline">Facebook</a>, <a href="#" className="underline">Twitter</a>, and <a href="#" className="underline">Instagram</a> for the latest updates, book recommendations, and more!</div>
            <div className="flex gap-3 mt-2">
              <span className="i-mdi:instagram text-2xl"></span>
              <span className="i-mdi:twitter text-2xl"></span>
              <span className="i-mdi:facebook text-2xl"></span>
              <span className="i-mdi:linkedin text-2xl"></span>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Our Services</div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Book Collection</li>
              <li>Seamless Shopping</li>
              <li>Recommendation</li>
              <li>Promo & Discount</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Our Services</div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Reviews</li>
              <li>Insights</li>
              <li>Pricing</li>
              <li>Book inquires</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Our Services</div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>info@opentome.com</li>
              <li>Kandevsthan, Kupondole, CA 90210 Nepal</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;