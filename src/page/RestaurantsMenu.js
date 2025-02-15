import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantsMenu from "../../utils/useRestaurantsMentu";

const RestaurantsMenu = () => {
  const { resID } = useParams();
  
  // ✅ Hook is called at the top level
  const data = useRestaurantsMenu(resID);

  // ✅ State is declared at the top level, not inside a loop
  const [openCategoryIndex, setOpenCategoryIndex] = useState(1);

  // ✅ Ensure data is valid before rendering
  if (!data) {
    return <div>Loading...</div>;
  }

  // ✅ Extract categories safely
  const categories =
    data[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (item) => item?.card?.card?.title
    ) || [];

  const toggleCategory = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? false : index);
  };

  return (
    <div className="p-6 max-w-2xl mt-2 mx-auto bg-white shadow-lg rounded-xl">
      <div className="text-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {data?.[2]?.card?.card?.info?.name}
        </h2>
        <span className="text-gray-600 text-sm">Restaurant Menu</span>
      </div>

      {/* ✅ Accordion List */}
      {categories.map((category, index) => (
        <div key={index} className="mb-4 border rounded-lg overflow-hidden">
          {/* ✅ Accordion Header */}
          <button
            className="w-full bg-gray-100 px-4 py-3 text-left font-semibold text-gray-800 flex justify-between items-center"
            onClick={() => toggleCategory(index)}
          >
            {category.card.card.title}
            <span>{openCategoryIndex === index ? "▲" : "▼"}</span>
          </button>

          {/* ✅ Accordion Content (Only shows if open) */}
          {openCategoryIndex === index && (
            <div className="p-4 bg-white">
              {category.card?.card?.itemCards?.map((item, itemIndex) => {
                const { name, price, isveg, imageId, inStock, itemAttribute } =
                  item?.card?.info;
                return (
                  <div
                    key={itemIndex}
                    className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm relative mb-2"
                  >
                    {/* Left Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Price: ₹{(price / 100).toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Available: {inStock > 0 ? "Yes" : "No"}
                      </p>
                      <p
                        className={`h-2 w-2 rounded-full ${
                          itemAttribute?.vegClassifier === "VEG"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></p>
                    </div>

                    {/* Right Side - Image with Button */}
                    <div className="relative w-20 h-20">
                      {imageId ? (
                        <img
                          className="w-full h-full object-cover rounded-md"
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                          alt={name}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-gray-600 rounded-md">
                          No Image
                        </div>
                      )}

                      {/* ✅ Button Positioned Over Image */}
                      <button
                        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-lg shadow-md transition ${
                          inStock > 0
                            ? "bg-purple-500 text-white hover:bg-purple-700"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                        disabled={inStock === 0}
                      >
                        {inStock > 0 ? "Add" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestaurantsMenu;
