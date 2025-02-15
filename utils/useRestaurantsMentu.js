import { useState, useEffect } from "react";
import { Restaurant_Menu } from "./constants";

const useRestaurantsMenu = (resID) => {
  const [resdata, setResdata] = useState();

  useEffect(() => {
    fetchData();
  }, []); // Adding resID to the dependency array ensures fetching when resID changes


  const fetchData = async () => {
    const url = Restaurant_Menu + resID;
    console.log("Fetching URL:", url); // Log the full URL

    const response = await fetch(Restaurant_Menu + resID);
    const apiData = await response.json();
    console.log("API Data:", apiData); // Check the actual structure
    const finaldata = apiData?.data?.cards;
    setResdata(finaldata);
  };


console.log("data",resdata);

  return resdata; // Optional: Return the fetched data if needed
};

export default useRestaurantsMenu;
