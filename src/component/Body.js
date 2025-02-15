import RestraCard, {PramotedRestraCard} from "./RestraCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus"

const Body = () => {
  const [originalList, setOriginalList] = useState([]);
  const [restrauntList, setRestrauntList] = useState([]);
  const [filterUserInput, setFilterUserInput] = useState("");

const onlineStatus = useOnlineStatus();
const PromotedRestra = PramotedRestraCard(RestraCard);
//console.log("useOnlineStatus",onlineStatus);

  useEffect(() => {

    fetchData();
  },[]);

// Carousel Component (Moved Outside)
const Carousel = () => {
  const images = [
    "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full max-w-4xl mx-auto overflow-hidden group">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-80 object-cover rounded-lg shadow-xl"
            />
          </div>
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 rounded-full hover:bg-white/50"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 rounded-full hover:bg-white/50"
      >
        →
      </button>
       {/* Navigation Dots */}
<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
  {images.map((_, index) => (
    <button
      key={index}
      onClick={() => goToSlide(index)}
      className={`w-4 h-4 rounded-full border-2 bg-purple-600 ${
        currentIndex === index ? "bg-black" : "bg-gray-500"
      }`}
    ></button>
  ))}
</div>
    </div>
  );
};
{/**corsol end */}
  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.057437&lng=78.9381729&str=biryani&trackingId=6c453a9d-a5c2-234a-704c-603faeeb3f1d&submitAction=ENTER&queryUniqueId=c21431bf-6b78-8a2d-e416-64f7611c2c19"
    );
    const finalData = await response.json();
    // const DataArray =
    //   finalData?.data.cards[1].groupedCard.cardGroupMap.DISH.cards.filter(
    //     (carddata) => {
    //       return carddata.card.card.restaurant;
    //     }
    //   );
    const filterDataArray =
      finalData?.data.cards[1].groupedCard.cardGroupMap.DISH.cards.filter(
        (carddata, index, self) =>
          carddata?.card?.card?.restaurant &&
          index ===
            self.findIndex(
              (uniquedata) =>
                uniquedata.card?.card?.restaurant?.info?.id ===
                carddata?.card?.card?.restaurant?.info?.id
            )
      );
    setOriginalList(filterDataArray);
    setRestrauntList(filterDataArray);
  };
    //if user is offline handle this 
    if(onlineStatus===false){
      return(
        <div className="restra-card">
    <h1>User is offline.</h1>
        </div>
        
      )
    };
  return (
    <div className="w-full max-w-4xl mx-auto p-6">

{/* Render Carousel */}
<Carousel />

{/* Restaurant List */}
<div className="restra-container mt-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Left Column - Visible Cards */}
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex animate-infinite-scroll gap-8 w-max">
        {[1, 2, 3].map((item) => (
          <div 
            key={item}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transform transition-transform duration-300 ease-out hover:scale-105 h-[20rem] w-64 flex-shrink-0 flex flex-col will-change-transform"
          >
            <img
              className="w-full h-40 object-cover rounded-lg"
              src="your-image-url.jpg"
              alt="Restaurant Logo"
            />
            <div className="mt-3 text-center flex-grow min-h-[8rem] flex flex-col justify-center">
              <p>This is the description</p>
            </div>
          </div>
        ))}
        
        {/* Duplicated Cards */}
        {[1, 2, 3].map((item) => (
          <div 
            key={`copy-${item}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transform transition-transform duration-300 ease-out hover:scale-105 h-[20rem] w-64 flex-shrink-0 flex flex-col will-change-transform"
          >
            <img
              className="w-full h-40 object-cover rounded-lg"
              src="your-image-url.jpg"
              alt="Restaurant Logo"
            />
            <div className="mt-3 text-center flex-grow min-h-[8rem] flex flex-col justify-center">
              <p>This is the description</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Column - Hidden with Text Overlay */}
    <div className="hidden lg:block relative bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Special Offers!</h2>
          <p className="text-lg opacity-90">
            Discover exclusive deals and hidden menu items available only to our 
            premium members. Sign up today to unlock special discounts!
          </p>
          <button className="mt-6 px-6 py-2 bg-white text-black rounded-full 
                          hover:bg-gray-200 transition-colors shadow-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


{/* Customer Reviews Section */}
<div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 mt-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
      What Our Customers Say About Us
      <span className="block mt-2 w-16 h-1 bg-blue-500 mx-auto"></span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
      {/* Review Card 1 */}
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-blue-500">
        <div className="flex items-center mb-4">
          <img 
            src="user-avatar1.jpg" 
            alt="Customer" 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
            <p className="text-sm text-gray-500">Food Blogger</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4 italic relative">
          <span className="absolute -left-2 -top-4 text-4xl text-blue-100">"</span>
          The best dining experience I've had this year! Every dish was a perfect blend of flavors.
        </p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Review Card 2 */}
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-purple-500">
        <div className="flex items-center mb-4">
          <img 
            src="user-avatar2.jpg" 
            alt="Customer" 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-800">Michael Chen</h4>
            <p className="text-sm text-gray-500">Local Guide</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4 italic relative">
          <span className="absolute -left-2 -top-4 text-4xl text-purple-100">"</span>
          Consistent quality and exceptional service. Their attention to dietary needs is remarkable.
        </p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Review Card 3 */}
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-pink-500">
        <div className="flex items-center mb-4">
          <img 
            src="user-avatar3.jpg" 
            alt="Customer" 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-800">Emma Wilson</h4>
            <p className="text-sm text-gray-500">Frequent Diner</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4 italic relative">
          <span className="absolute -left-2 -top-4 text-4xl text-pink-100">"</span>
          The seasonal menu changes keep me coming back. Always something new and exciting!
        </p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>


    {/* Filter & Search Section */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
      <button
        className=" text-black px-6 py-2 rounded-full hover:bg-purple-600 transition duration-200 shadow-md"
        onClick={() => {
          const filteredList = originalList.filter(
            (restaurant) => restaurant.card.card.restaurant.info.avgRating > 4
          );
          setRestrauntList(filteredList);
        }}
      >
        ⭐ See Top Restaurants
      </button>

      <input
        type="text"
        placeholder="Search restaurants..."
        className=" text-gray-800 px-4 py-2 rounded-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-300"
        value={filterUserInput}
        onChange={(e) => setFilterUserInput(e.target.value)}
      />

      <button
        className=" text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-200 shadow-md"
        onClick={() => {
          const filteredData = originalList.filter((restaurant) =>
            restaurant.card.card.restaurant.info.name
              .toLowerCase()
              .includes(filterUserInput.toLowerCase())
          );
          setRestrauntList(filteredData);
        }}
      >
        🔍
      </button>

      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-200 shadow-md"
        onClick={() => {
          setFilterUserInput("");
          setRestrauntList(originalList);
        }}
      >
        🔄
      </button>
    </div>


    {/* Restaurant List */}
    <div className="restra-container mt-6">
      {restrauntList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restrauntList.map((restaurant) => (
            <Link
              key={restaurant.card.card.restaurant.info.id}
              to={`/restaurantsMenu/${restaurant.card.card.restaurant.info.id}`}
              className="block transform transition duration-300 hover:scale-105"
            >
            

           
            {            
            //if restraunt is Pramoted then show the label as pramoted over restra card
            restaurant?.card?.card?.restaurant?.info?.promoted ? 
    <PromotedRestra restraData={restaurant} />
   : 
    <RestraCard restraData={restaurant} />
  
}


             
            </Link>
          ))}
        </div>
      ) : (
        // Shimmer loading effect
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-40 h-40 bg-gray-300 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default Body;
