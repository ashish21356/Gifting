import { Restra_Img } from "../../utils/constants";

const RestraCard = ({ restraData }) => {
  const { name, cuisines, avgRating, costForTwo, sla } =
    restraData?.card?.card?.restaurant?.info || {};
  const { deliveryTime } = sla || {};

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transform transition-transform duration-300 ease-out hover:scale-105 h-[22rem] flex flex-col will-change-transform"
    >
      {/* Image */}
      <img
        className="w-full h-40 object-cover rounded-lg"
        src={Restra_Img + restraData.card.card.restaurant.info.cloudinaryImageId}
        alt="Restaurant Logo"
      />

      {/* Content */}
      <div className="mt-3 text-center flex-grow min-h-[8rem] flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 truncate">{cuisines?.join(", ")}</p>
        <p className="text-sm font-medium text-gray-700">⭐rating: {avgRating} </p>
        <p className="text-sm font-medium text-gray-700">Price: {costForTwo/100.}</p>
        <p className="text-sm text-gray-500">Delivery Time: {deliveryTime} minutes</p>
      </div>
    </div>
  );
};

export const PramotedRestraCard =(RestraCard)=>{
  return function WrappedPramotedRestraCard(props){
    return (
      <div className="relative">
     <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
  Promoted
</span>
        <RestraCard {...props}/>
      </div>
    );
  };
 
};

export default RestraCard;
