//import { useRouteError } from "react-router-dom";

import { useRouteError } from "react-router-dom";

const Error =()=>{
    const Err= useRouteError();
    console.log(Err);
    return (
       
       <div>
         <h1>Error Type: {Err.status}</h1>
         <h1>Error Type: {Err.statusText}</h1>
         <h1>Error Type: {Err.data}</h1>
       </div>


    )
};

export default Error;