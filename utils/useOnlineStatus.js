import { useState, useEffect } from "react";

const OnlineStatus = () => {

    console.log("Calling");
  const [onlineStatus, setonlineStatus] = useState(true);
  useEffect(() => {
    window.addEventListener("online", (event)=>{
        setonlineStatus(true);
    });
    
  window.addEventListener("offline",(event)=>{
    setonlineStatus(false);
  })
   
  }, []);
  
return onlineStatus;
 // console.log("he",onlineStatus);
};

export default OnlineStatus;
